/**
 * The study content as plain data, for the tools in this directory.
 *
 * The TypeScript files in `src/content/chapters/` are the single source; this
 * module imports them directly (Node strips the types, so there is no build step
 * and no second copy of the content to keep in sync).
 */

const CHAPTER_NUMBERS = Array.from({ length: 17 }, (_, i) => i + 1);

/** Chapters in book order, each with its flashcards and questions. */
export async function loadChapters(numbers = CHAPTER_NUMBERS) {
  const chapters = [];
  for (const n of numbers) {
    const id = String(n).padStart(2, "0");
    const module = await import(`../src/content/chapters/chapter-${id}.ts`);
    const chapter = module[`chapter${id}`];
    if (!chapter) {
      throw new Error(`chapter-${id}.ts does not export chapter${id}`);
    }
    chapters.push(chapter);
  }
  return chapters.sort((a, b) => a.number - b.number);
}

/**
 * Everything the Canvas import needs to be true of a question. Canvas will
 * happily accept a malformed payload and create a broken question, so the
 * checks happen here instead.
 */
export function validateQuestion(question, chapterNumber) {
  const problems = [];
  const where = `chapter ${chapterNumber}, ${question.id || "question without id"}`;
  const options = Array.isArray(question.options) ? question.options : [];

  if (!question.id) problems.push(`${where}: missing id`);
  if (!question.prompt?.trim()) problems.push(`${where}: empty prompt`);
  if (options.length < 2) problems.push(`${where}: fewer than two options`);
  if (options.some((o) => !o?.trim())) problems.push(`${where}: empty option`);
  if (new Set(options).size !== options.length) {
    problems.push(`${where}: duplicate options`);
  }
  if (
    !Number.isInteger(question.correctIndex) ||
    question.correctIndex < 0 ||
    question.correctIndex >= options.length
  ) {
    problems.push(`${where}: correctIndex ${question.correctIndex} is out of range`);
  }
  if (!question.explanation?.trim()) problems.push(`${where}: empty explanation`);
  if (!question.source?.trim()) problems.push(`${where}: empty source`);

  return problems;
}

/** Validates every question and every id in the whole set. */
export function validateChapters(chapters) {
  const problems = [];
  const seen = new Map();

  for (const chapter of chapters) {
    for (const question of chapter.questions) {
      problems.push(...validateQuestion(question, chapter.number));
      if (seen.has(question.id)) {
        problems.push(
          `${question.id}: id used in both chapter ${seen.get(question.id)} and chapter ${chapter.number}`,
        );
      }
      seen.set(question.id, chapter.number);
    }
  }

  return problems;
}

/** "Chapter 3: Cox proportional hazards regression" → the quiz title. */
export function quizTitle(chapter) {
  return `Chapter ${chapter.number}: ${chapter.title}`;
}
