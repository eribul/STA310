/**
 * Writes the study content to JSON, so that the questions can be inspected,
 * diffed and reviewed without reading the TypeScript sources.
 *
 *   node dev/export-content.mjs                     → dev/content.json
 *   node dev/export-content.mjs --out=-             → stdout
 *   node dev/export-content.mjs --only=1,2          → a subset of the chapters
 *
 * The flashcards are left out: they have no Canvas counterpart, and this file
 * exists for the quiz import.
 */
import { writeFile } from "node:fs/promises";
import { loadChapters, validateChapters, quizTitle } from "./content.mjs";

const args = process.argv.slice(2);
const only = args
  .find((a) => a.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",")
  .map(Number);
const out = args.find((a) => a.startsWith("--out="))?.slice("--out=".length) ?? "dev/content.json";

const chapters = await loadChapters(only);
const problems = validateChapters(chapters);
if (problems.length) {
  console.error(`${problems.length} problem(s) in the content:`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

const payload = {
  generatedFrom: "sta310-study/src/content/chapters/",
  quizzes: chapters.map((chapter) => ({
    chapter: chapter.number,
    title: quizTitle(chapter),
    slug: chapter.slug,
    bookSections: chapter.bookSections,
    summary: chapter.summary,
    questions: chapter.questions,
  })),
};

const json = `${JSON.stringify(payload, null, 2)}\n`;
if (out === "-") {
  process.stdout.write(json);
} else {
  await writeFile(out, json, "utf8");
  const questions = chapters.reduce((n, c) => n + c.questions.length, 0);
  console.log(`${out}: ${chapters.length} chapters, ${questions} questions`);
}
