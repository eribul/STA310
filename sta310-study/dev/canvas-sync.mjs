#!/usr/bin/env node
/**
 * Uploads the quiz questions to Canvas.
 *
 * The TypeScript files in `src/content/chapters/` are the single source; Canvas
 * is a derived target, so nothing here is ever edited by hand in Canvas. The
 * tool never deletes anything, and the default is a dry run that only prints
 * what would be sent.
 *
 *   node dev/canvas-sync.mjs --check                 # is the token alive?
 *   node dev/canvas-sync.mjs                         # dry run, all chapters
 *   node dev/canvas-sync.mjs --only=1 --verbose      # one chapter, full payloads
 *   node dev/canvas-sync.mjs --only=1 --apply        # create chapter 1 in Canvas
 *
 * Credentials come from the environment: CANVAS_API_KEY, CANVAS_BASE_URL
 * ("https://canvas.gu.se") and optionally CANVAS_COURSE_ID.
 *
 * Options
 *   --api=classic|new    quiz engine (default classic). Both are verified
 *                        against canvas.gu.se; see the note printed for `new`.
 *   --course=ID          course id (default $CANVAS_COURSE_ID, else 102360)
 *   --only=1,2           chapters to sync (default all 17)
 *   --points=N           points per question (default 1)
 *   --type=TYPE          practice_quiz (ungraded, the default) or assignment.
 *                        Classic sets quiz_type; a New Quiz is an assignment
 *                        that is made not to count towards the final grade.
 *   --attempts=N         attempts per student: a number, or unlimited (default)
 *   --publish            publish the quizzes (default: unpublished drafts)
 *   --shuffle            shuffle the answer options (default: keep the
 *                        authored order)
 *   --map=PATH           mapping file (default dev/canvas-map.json)
 *   --apply              write to Canvas; without it nothing is sent
 *   --verbose            print every request payload, not just the first one
 */
import { readFile, writeFile } from "node:fs/promises";
import { loadChapters, validateChapters, quizTitle } from "./content.mjs";

// Canvas errors are worth reading, so print the message without a stack trace.
process.on("uncaughtException", (error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});

const DEFAULT_COURSE = 102360;

// ---------------------------------------------------------------- arguments

const argv = process.argv.slice(2);
const flag = (name, fallback = undefined) => {
  const hit = argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (hit === undefined) return fallback;
  return hit.includes("=") ? hit.slice(hit.indexOf("=") + 1) : true;
};

const options = {
  api: flag("api", "classic"),
  course: Number(flag("course", process.env.CANVAS_COURSE_ID ?? DEFAULT_COURSE)),
  only: flag("only") ? String(flag("only")).split(",").map(Number) : undefined,
  points: Number(flag("points", 1)),
  type: flag("type", "practice_quiz"),
  attempts: flag("attempts", "unlimited"),
  publish: Boolean(flag("publish", false)),
  shuffle: Boolean(flag("shuffle", false)),
  map: flag("map", "dev/canvas-map.json"),
  apply: Boolean(flag("apply", false)),
  verbose: Boolean(flag("verbose", false)),
  check: Boolean(flag("check", false)),
};

if (!["classic", "new"].includes(options.api)) {
  console.error(`--api must be classic or new, not ${options.api}`);
  process.exit(2);
}
if (!["practice_quiz", "assignment"].includes(options.type)) {
  console.error(`--type must be practice_quiz or assignment, not ${options.type}`);
  process.exit(2);
}
if (options.attempts !== "unlimited") {
  const n = Number(options.attempts);
  if (!Number.isInteger(n) || n < 1) {
    console.error(`--attempts must be unlimited or a positive integer, not ${options.attempts}`);
    process.exit(2);
  }
  options.attempts = n;
}
/** A practice quiz is the ungraded variant in both engines. */
const practiceQuiz = options.type === "practice_quiz";
const unlimited = options.attempts === "unlimited";

const baseUrl = process.env.CANVAS_BASE_URL;
const token = process.env.CANVAS_API_KEY;
if (!baseUrl || !token) {
  console.error(
    "CANVAS_BASE_URL and CANVAS_API_KEY must be set. Nothing was sent to Canvas.",
  );
  process.exit(2);
}
const classicApi = `${baseUrl.replace(/\/+$/, "")}/api/v1`;
const newApi = `${baseUrl.replace(/\/+$/, "")}/api/quiz/v1`;

// ------------------------------------------------------------------ payloads

const escapeHtml = (text) =>
  String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replace(/"/g, "&quot;");

/** The question name is teacher-facing in both engines: use the local id. */
const questionName = (question) => `${question.id} — ${question.source}`;
const questionBody = (question) => `<p>${escapeHtml(question.prompt)}</p>`;
const questionFeedback = (question) => `<p>${escapeHtml(question.explanation)}</p>`;

/**
 * The answer options are shown literally by New Quizzes (entities are not
 * decoded), so they are sent as plain text. A bare ">" is valid in HTML as
 * well, and no option contains "<" or "&". The stem and the feedback are rich
 * content and are escaped instead.
 */
const answerBody = (option) => String(option);

/** Fields for POST/PUT /courses/:id/quizzes/:quiz_id/questions */
export function classicQuestionForm(question, points = options.points) {
  const form = new URLSearchParams();
  form.set("question[question_name]", questionName(question));
  form.set("question[question_text]", questionBody(question));
  form.set("question[question_type]", "multiple_choice_question");
  form.set("question[points_possible]", String(points));
  question.options.forEach((option, i) => {
    form.set(`question[answers][${i}][answer_text]`, answerBody(option));
    form.set(`question[answers][${i}][answer_weight]`, i === question.correctIndex ? "100" : "0");
  });
  form.set("question[neutral_comments]", questionFeedback(question));
  return form;
}

/** Fields for POST /courses/:id/quizzes */
export function classicQuizForm(chapter) {
  const form = new URLSearchParams();
  form.set("quiz[title]", quizTitle(chapter));
  form.set("quiz[quiz_type]", options.type);
  form.set("quiz[description]", chapterDescription(chapter));
  form.set("quiz[shuffle_answers]", options.shuffle ? "true" : "false");
  form.set("quiz[published]", options.publish ? "true" : "false");
  // -1 is Canvas for unlimited.
  form.set("quiz[allowed_attempts]", unlimited ? "-1" : String(options.attempts));
  return form;
}

/** Fields for POST/PATCH /api/quiz/v1/courses/:id/quizzes */
export function newQuizForm(chapter) {
  const form = new URLSearchParams();
  form.set("quiz[title]", quizTitle(chapter));
  form.set("quiz[instructions]", chapterDescription(chapter));
  // Without this the new quiz reports no total; the items do not fill it in.
  form.set("quiz[points_possible]", String(chapter.questions.length * options.points));
  form.set("quiz[quiz_settings][shuffle_answers]", options.shuffle ? "true" : "false");
  form.set("quiz[quiz_settings][multiple_attempts][multiple_attempts_enabled]", "true");
  form.set("quiz[quiz_settings][multiple_attempts][attempt_limit]", unlimited ? "false" : "true");
  if (!unlimited) {
    form.set("quiz[quiz_settings][multiple_attempts][max_attempts]", String(options.attempts));
  }
  form.set("quiz[quiz_settings][multiple_attempts][score_to_keep]", "highest");
  return form;
}

/**
 * Fields for POST/PATCH
 * /api/quiz/v1/courses/:id/quizzes/:assignment_id/items.
 *
 * The answers of a `choice` item are a map whose keys the client chooses, so
 * the correct answer is simply the key of the right option and everything can
 * be sent in one call. The API does not check that the key exists, so the
 * caller reads the item back and compares.
 */
export function newItemForms(question, position, points = options.points) {
  const create = new URLSearchParams();
  create.set("item[entry_type]", "Item");
  create.set("item[position]", String(position));
  create.set("item[points_possible]", String(points));
  create.set("item[entry][title]", questionName(question));
  create.set("item[entry][item_body]", questionBody(question));
  create.set("item[entry][interaction_type_slug]", "choice");
  create.set("item[entry][calculator_type]", "none");
  create.set("item[entry][feedback][neutral]", questionFeedback(question));
  // A `choice` item scores with `Equivalence` and takes the answer as a string;
  // other algorithms expect a list and are rejected here.
  create.set("item[entry][scoring_algorithm]", "Equivalence");
  create.set("item[entry][scoring_data][value]", String(question.correctIndex));
  question.options.forEach((option, i) => {
    create.set(`item[entry][interaction_data][choices][${i}][item_body]`, answerBody(option));
    create.set(`item[entry][interaction_data][choices][${i}][position]`, String(i + 1));
  });
  return { create, correctIndex: question.correctIndex };
}

function chapterDescription(chapter) {
  return [
    `<p>${escapeHtml(chapter.summary)}</p>`,
    `<p>Reading: Collett (2023), ${escapeHtml(chapter.bookSections)}.</p>`,
  ].join("");
}

/**
 * New Quizzes has no practice_quiz type: the equivalent is an assignment that
 * does not count towards the final grade. The quiz id of a New Quiz is the id
 * of the assignment behind it.
 */
async function setAssignmentGrading(assignmentId) {
  const form = new URLSearchParams();
  form.set("assignment[omit_from_final_grade]", practiceQuiz ? "true" : "false");
  await canvas("PUT", `${classicApi}/courses/${options.course}/assignments/${assignmentId}`, form);
}

/**
 * The quizzes the course already has, by title. The mapping file is local
 * state: if it is lost, the sync adopts its own quizzes again instead of
 * creating a second set of them.
 */
async function indexQuizzes() {
  const url =
    options.api === "new"
      ? `${newApi}/courses/${options.course}/quizzes?per_page=100`
      : `${classicApi}/courses/${options.course}/quizzes?per_page=100`;
  const quizzes = await canvasAll(url);
  return new Map(quizzes.map((quiz) => [quiz.title, String(quiz.id)]));
}

/** The questions already in a quiz, keyed by the local question id. */
async function indexQuestions(quizId) {
  const url =
    options.api === "new"
      ? `${newApi}/courses/${options.course}/quizzes/${quizId}/items?per_page=100`
      : `${classicApi}/courses/${options.course}/quizzes/${quizId}/questions?per_page=100`;
  const questions = await canvasAll(url);
  const index = new Map();
  for (const question of questions) {
    // The question name is "<local id> — <book section>".
    const name = options.api === "new" ? question.entry?.title : question.question_name;
    const localId = String(name ?? "").split(" — ")[0].trim();
    if (localId) index.set(localId, String(question.id));
  }
  return index;
}

// ------------------------------------------------------------------ requests

/** Canvas pages list endpoints and points at the next page in the Link header. */
function nextLink(header) {
  if (!header) return null;
  for (const part of header.split(",")) {
    const hit = part.match(/<([^>]+)>\s*;\s*rel="next"/);
    if (hit) return hit[1];
  }
  return null;
}

async function canvasAll(url) {
  const all = [];
  let next = url;
  while (next) {
    const response = await fetch(next, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;
    if (!response.ok || body?.errors) {
      throw new Error(`GET ${next} failed (HTTP ${response.status}): ${errorText(body, text)}`);
    }
    all.push(...(Array.isArray(body) ? body : []));
    next = nextLink(response.headers.get("link"));
  }
  return all;
}

/** Canvas reports errors as a list, a nested object or a plain string. */
function errorText(body, text) {
  const errors = body?.errors;
  if (Array.isArray(errors)) {
    return errors.map((e) => e?.message ?? JSON.stringify(e)).join("; ");
  }
  if (errors) return typeof errors === "string" ? errors : JSON.stringify(errors);
  if (body) return JSON.stringify(body).slice(0, 400);
  return text.slice(0, 400);
}

async function canvas(method, url, form) {
  const response = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { errors: text.slice(0, 400) };
  }
  if (response.status === 401) {
    throw new Error(
      `Canvas said "${errorText(body, text)}" (HTTP 401). An expired token is the usual ` +
        `reason: create a new one under Account → Settings → Approved Integrations.`,
    );
  }
  if (!response.ok || body?.errors) {
    throw new Error(`${method} ${url} failed (HTTP ${response.status}): ${errorText(body, text)}`);
  }
  return body;
}

/** Confirms that the token works and that the course is visible. */
async function preflight() {
  const me = await canvas("GET", `${classicApi}/users/self`);
  const course = await canvas("GET", `${classicApi}/courses/${options.course}`);
  console.log(`Authenticated as ${me.name} (#${me.id})`);
  console.log(`Course ${course.id}: ${course.name} (${course.course_code ?? "no code"})`);
  return course;
}

// -------------------------------------------------------------- the mapping

const emptyMap = () => ({ courseId: options.course, apis: {} });

/** The part of the map that belongs to the quiz engine in use. */
const apiScope = (map) => (map.apis[options.api] ??= { quizzes: {} });

async function readMap() {
  try {
    const file = JSON.parse(await readFile(options.map, "utf8"));
    if (file.courseId !== options.course) {
      console.log(
        `Note: ${options.map} was written for course ${file.courseId}; ` +
          `starting a fresh mapping for course ${options.course}.`,
      );
      return emptyMap();
    }
    if (file.apis) return file;
    // Earlier versions kept a single engine in a flat shape.
    console.log(`Note: keeping the ${file.api} mapping found in ${options.map}.`);
    return { courseId: file.courseId, apis: { [file.api]: { quizzes: file.quizzes } } };
  } catch {
    return emptyMap();
  }
}

const saveMap = async (map) => writeFile(options.map, `${JSON.stringify(map, null, 2)}\n`, "utf8");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ------------------------------------------------------------------- the run

const chapters = await loadChapters(options.only);
const problems = validateChapters(chapters);
if (problems.length) {
  console.error(`${problems.length} problem(s) in the content, nothing was sent to Canvas:`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
const questions = chapters.flatMap((chapter) => chapter.questions);

if (options.check) {
  await preflight();
  process.exit(0);
}

const plan = {
  api: options.api,
  course: options.course,
  quizzes: chapters.length,
  questions: questions.length,
  points: options.points,
  type: practiceQuiz ? "practice quiz (ungraded)" : "graded quiz",
  attempts: unlimited ? "unlimited" : options.attempts,
  state: options.publish ? "published" : "unpublished draft",
  map: options.map,
};

console.log(options.apply ? "APPLYING to Canvas" : "DRY RUN (nothing is sent to Canvas)");
console.table(plan);

// Show the exact payload for the first question, so it can be reviewed before
// anything is written.
const first = { chapter: chapters[0], question: chapters[0].questions[0] };
if (first.question) {
  const payload =
    options.api === "classic"
      ? Object.fromEntries(classicQuestionForm(first.question))
      : Object.fromEntries(newItemForms(first.question, 1).create);
  console.log(
    `\nPayload for ${first.question.id} (chapter ${first.chapter.number}), ` +
      `as it would be sent to ${options.api === "classic" ? classicApi : newApi}:`,
  );
  console.log(payload);
  if (options.verbose) {
    for (const chapter of chapters) {
      for (const [i, question] of chapter.questions.entries()) {
        const form =
          options.api === "classic"
            ? classicQuestionForm(question)
            : newItemForms(question, i + 1).create;
        console.log(`\n${question.id}`, Object.fromEntries(form));
      }
    }
  }
}

if (options.api === "new") {
  console.log(
    "\nNote: treat this path as experimental. It does create quizzes and items, and it\n" +
      "sets the answer key (a `choice` item scores with Equivalence and takes the key of\n" +
      "the right answer as a string), but the API never generates ids for the answer\n" +
      "options, so items built here do not have the shape the New Quizzes build page\n" +
      "produces: in STA310 H26 that page fails to load for them, and whether the grading\n" +
      "interprets the key as a key or as a position cannot be verified. The Classic\n" +
      "engine is what the course uses; the answer key there is the unambiguous\n" +
      "answer_weight.",
  );
}

if (!options.apply) {
  console.log("\nNothing was sent. Add --apply to write to Canvas.");
  process.exit(0);
}

await preflight();
const map = await readMap();
const scope = apiScope(map);
let created = 0;
let updated = 0;
const quizIndex = await indexQuizzes();

for (const chapter of chapters) {
  const entry = (scope.quizzes[chapter.number] ??= { quizId: null, questions: {} });

  if (!entry.quizId && quizIndex.has(quizTitle(chapter))) {
    entry.quizId = quizIndex.get(quizTitle(chapter));
    entry.title = quizTitle(chapter);
    await saveMap(map);
    console.log(`adopted existing quiz ${entry.quizId}: ${entry.title}`);
  }

  if (!entry.quizId) {
    const form = options.api === "classic" ? classicQuizForm(chapter) : newQuizForm(chapter);
    const url = options.api === "classic" ? `${classicApi}/courses/${options.course}/quizzes` : `${newApi}/courses/${options.course}/quizzes`;
    const quiz = await canvas("POST", url, form);
    // Classic returns the quiz id; New Quizzes returns the assignment id, and
    // items live under that assignment.
    entry.quizId = quiz.id;
    entry.title = quizTitle(chapter);
    await saveMap(map);
    console.log(`created quiz ${entry.quizId}: ${entry.title}`);
    if (options.api === "new") await setAssignmentGrading(entry.quizId);
    await sleep(100);
  } else {
    // Keep the title and the description in step with the source. The publish
    // state is only touched when --publish is given, so a decision taken in
    // Canvas is not undone by a later sync.
    console.log(`quiz ${entry.quizId} already mapped: ${entry.title}`);
    if (options.api === "new") {
      // PATCH (PUT is not routed) and no publish parameter: that one is set in
      // Canvas.
      await canvas(
        "PATCH",
        `${newApi}/courses/${options.course}/quizzes/${entry.quizId}`,
        newQuizForm(chapter),
      );
      await setAssignmentGrading(entry.quizId);
    }
  }

  // Only read the quiz's questions back if some of them are not mapped yet:
  // that is the case where an existing quiz has just been adopted, or where
  // the mapping file was lost.
  const missing = chapter.questions.filter((question) => !entry.questions[question.id]);
  const knownQuestions = missing.length ? await indexQuestions(entry.quizId) : new Map();

  for (const [i, question] of chapter.questions.entries()) {
    if (!entry.questions[question.id] && knownQuestions.has(question.id)) {
      entry.questions[question.id] = knownQuestions.get(question.id);
      await saveMap(map);
      console.log(`  adopted item ${entry.questions[question.id]} for ${question.id}`);
    }
    const known = entry.questions[question.id];
    if (options.api === "classic") {
      const url = known
        ? `${classicApi}/courses/${options.course}/quizzes/${entry.quizId}/questions/${known}`
        : `${classicApi}/courses/${options.course}/quizzes/${entry.quizId}/questions`;
      const result = await canvas(known ? "PUT" : "POST", url, classicQuestionForm(question));
      entry.questions[question.id] = result.id;
      if (known) updated++;
      else created++;
    } else {
      const { create, correctIndex } = newItemForms(question, i + 1);
      const url = known
        ? `${newApi}/courses/${options.course}/quizzes/${entry.quizId}/items/${known}`
        : `${newApi}/courses/${options.course}/quizzes/${entry.quizId}/items`;
      const item = await canvas(known ? "PATCH" : "POST", url, create);
      // The API accepts any scoring key, so confirm that Canvas kept the one we
      // set (an unverified key would give a question nobody can get right).
      const stored = item.entry?.scoring_data?.value;
      if (String(stored) !== String(correctIndex)) {
        console.log(
          `  warning: ${question.id} came back with scoring_data ${JSON.stringify(stored)}, expected ${correctIndex}`,
        );
      }
      entry.questions[question.id] = item.id;
      if (known) updated++;
      else created++;
    }
    await saveMap(map);
    await sleep(60);
  }

  // Canvas recomputes the quiz summary (points_possible, question_count)
  // lazily, and never as part of adding questions through the API. Both writes
  // below are no-ops that force it: the metadata write refreshes the points,
  // the reorder (to the order the questions already have) the count. They run
  // after the questions, or the summary stays at zero.
  if (options.api === "classic" && chapter.questions.length) {
    const meta = new URLSearchParams();
    meta.set("quiz[title]", quizTitle(chapter));
    meta.set("quiz[description]", chapterDescription(chapter));
    meta.set("quiz[allowed_attempts]", unlimited ? "-1" : String(options.attempts));
    if (options.publish) meta.set("quiz[published]", "true");
    await canvas("PUT", `${classicApi}/courses/${options.course}/quizzes/${entry.quizId}`, meta);

    const order = new URLSearchParams();
    for (const question of chapter.questions) {
      order.append("order[][id]", entry.questions[question.id]);
    }
    await canvas(
      "POST",
      `${classicApi}/courses/${options.course}/quizzes/${entry.quizId}/reorder`,
      order,
    );
  }
}

const total = Object.values(scope.quizzes).reduce((n, q) => n + Object.keys(q.questions).length, 0);
console.log(
  `\nDone: ${created} created, ${updated} updated. ` +
    `${Object.keys(scope.quizzes).length} quizzes and ${total} questions are mapped in ${options.map} ` +
    `for the ${options.api} API.`,
);
if (!options.publish) {
  console.log("The quizzes are unpublished drafts: review them in Canvas before publishing.");
}
