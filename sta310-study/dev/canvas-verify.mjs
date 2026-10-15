#!/usr/bin/env node
/**
 * Compares what is in Canvas with the content in src/content/chapters/.
 *
 * The counterpart of dev/canvas-sync.mjs: the sync writes, this reads and
 * reports. It is meant to be run after editing the content in Canvas (by
 * mistake) or before publishing, to see whether anything has drifted.
 *
 *   node dev/canvas-verify.mjs                 # all chapters, new engine
 *   node dev/canvas-verify.mjs --api=classic
 *   node dev/canvas-verify.mjs --only=1,2
 *
 * Nothing is written to Canvas.
 */
import { readFile } from "node:fs/promises";
import { loadChapters } from "./content.mjs";

const argv = process.argv.slice(2);
const flag = (name, fallback = undefined) => {
  const hit = argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (hit === undefined) return fallback;
  return hit.includes("=") ? hit.slice(hit.indexOf("=") + 1) : true;
};

const api = flag("api", "new");
const course = Number(flag("course", process.env.CANVAS_COURSE_ID ?? 102360));
const only = flag("only") ? String(flag("only")).split(",").map(Number) : undefined;
const mapPath = flag("map", "dev/canvas-map.json");

const base = (process.env.CANVAS_BASE_URL ?? "").replace(/\/+$/, "");
const token = process.env.CANVAS_API_KEY;
if (!base || !token) {
  console.error("CANVAS_BASE_URL and CANVAS_API_KEY must be set.");
  process.exit(2);
}
const classicApi = `${base}/api/v1`;
const newApi = `${base}/api/quiz/v1`;

async function get(url) {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok || body?.errors) {
    throw new Error(`GET ${url} failed (HTTP ${response.status}): ${text.slice(0, 200)}`);
  }
  return body;
}

/** Canvas HTML-encodes what it stores, so decode before comparing. */
const decode = (text) =>
  String(text ?? "")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&");

const stripTags = (html) => decode(String(html ?? "").replace(/<[^>]*>/g, "")).trim();

const mapping = JSON.parse(await readFile(mapPath, "utf8")).apis?.[api];
if (!mapping) {
  console.error(`No ${api} mapping in ${mapPath}. Run dev/canvas-sync.mjs first.`);
  process.exit(1);
}

const chapters = await loadChapters(only);
let checked = 0;
const problems = [];
const notes = [];

for (const chapter of chapters) {
  const entry = mapping.quizzes[chapter.number];
  if (!entry) {
    notes.push(`chapter ${chapter.number}: not in the mapping, skipped`);
    continue;
  }

  const quizUrl =
    api === "new"
      ? `${newApi}/courses/${course}/quizzes/${entry.quizId}`
      : `${classicApi}/courses/${course}/quizzes/${entry.quizId}`;
  const itemsUrl =
    api === "new"
      ? `${quizUrl}/items?per_page=100`
      : `${quizUrl}/questions?per_page=100`;

  const quiz = await get(quizUrl);
  const items = await get(itemsUrl);
  if (items.length !== chapter.questions.length) {
    problems.push(
      `chapter ${chapter.number}: Canvas has ${items.length} questions, the source has ${chapter.questions.length}`,
    );
  }
  const expectedPoints = chapter.questions.length;
  if (Number(quiz.points_possible) !== expectedPoints) {
    problems.push(
      `chapter ${chapter.number}: points_possible is ${quiz.points_possible} in Canvas, expected ${expectedPoints}`,
    );
  }
  if (api === "new") {
    const attempts = quiz.quiz_settings?.multiple_attempts ?? {};
    if (!attempts.multiple_attempts_enabled || attempts.attempt_limit) {
      problems.push(`chapter ${chapter.number}: attempts are not unlimited`);
    }
    const assignment = await get(`${classicApi}/courses/${course}/assignments/${entry.quizId}`);
    if (!assignment.omit_from_final_grade) {
      problems.push(`chapter ${chapter.number}: the assignment counts towards the final grade`);
    }
  } else if (quiz.quiz_type !== "practice_quiz" || Number(quiz.allowed_attempts) !== -1) {
    problems.push(
      `chapter ${chapter.number}: quiz_type ${quiz.quiz_type}, allowed_attempts ${quiz.allowed_attempts}`,
    );
  }
  if (quiz.published) notes.push(`chapter ${chapter.number}: published in Canvas`);

  for (const question of chapter.questions) {
    checked++;
    const found =
      api === "new"
        ? items.find((item) => item.entry?.title?.startsWith(question.id))
        : items.find((item) => item.question_name?.startsWith(question.id));
    if (!found) {
      problems.push(`${question.id}: not found in Canvas`);
      continue;
    }

    if (api === "new") {
      const body = stripTags(found.entry.item_body);
      if (body !== question.prompt) {
        problems.push(`${question.id}: question text differs from the source`);
      }
      if (String(found.entry.scoring_data?.value) !== String(question.correctIndex)) {
        problems.push(
          `${question.id}: the answer key is ${found.entry.scoring_data?.value}, expected ${question.correctIndex}`,
        );
      }
      const choices = Object.keys(found.entry.interaction_data?.choices ?? {});
      if (choices.length !== question.options.length) {
        problems.push(
          `${question.id}: ${choices.length} options in Canvas, ${question.options.length} in the source`,
        );
      }
      for (const [i, option] of question.options.entries()) {
        const stored = found.entry.interaction_data?.choices?.[String(i)]?.item_body;
        if (stored !== undefined && stored !== option) {
          problems.push(`${question.id}: option ${i} differs from the source`);
        }
      }
      if (!found.entry.feedback?.neutral) {
        problems.push(`${question.id}: no feedback in Canvas`);
      }
    } else {
      if (stripTags(found.question_text) !== question.prompt) {
        problems.push(`${question.id}: question text differs from the source`);
      }
      const answers = found.answers ?? [];
      if (answers.length !== question.options.length) {
        problems.push(
          `${question.id}: ${answers.length} options in Canvas, ${question.options.length} in the source`,
        );
      }
      for (const [i, option] of question.options.entries()) {
        const stored = answers.find((a) => a.text === option);
        if (!stored) problems.push(`${question.id}: option ${i} is missing in Canvas`);
        else if ((stored.weight === 100) !== (i === question.correctIndex)) {
          problems.push(`${question.id}: option ${i} has the wrong weight`);
        }
      }
      if (!found.neutral_comments) problems.push(`${question.id}: no feedback in Canvas`);
    }
  }
}

console.log(`${checked} questions checked against the source via the ${api} API.`);
for (const note of notes) console.log(`  note: ${note}`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.log(`  ${problem}`);
  process.exit(1);
}
console.log("Canvas matches the source.");
