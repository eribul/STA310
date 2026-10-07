import type { Chapter, Flashcard, MultipleChoiceQuestion } from './types'
import { chapter01 } from './chapters/chapter-01'
import { chapter02 } from './chapters/chapter-02'
import { chapter03 } from './chapters/chapter-03'
import { chapter04 } from './chapters/chapter-04'
import { chapter05 } from './chapters/chapter-05'
import { chapter06 } from './chapters/chapter-06'
import { chapter07 } from './chapters/chapter-07'

/**
 * The single source of truth for the study content. Add a new chapter by
 * creating `chapters/chapter-NN.ts` and appending it to this array - no UI
 * change is required.
 */
export const chapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
]

/** Look up a chapter by its book number. */
export function getChapter(number: number): Chapter | undefined {
  return chapters.find((chapter) => chapter.number === number)
}

/** Look up a chapter by its slug. */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug)
}

/** First chapter in the registry, used as the default landing chapter. */
export function getDefaultChapter(): Chapter {
  const [first] = chapters
  if (!first) {
    throw new Error('No chapters are registered in src/content/index.ts')
  }
  return first
}

/** Total number of study items (flashcards + questions) in one chapter. */
export function countChapterItems(chapter: Chapter): number {
  return chapter.flashcards.length + chapter.questions.length
}

/** Every flashcard across all chapters, in chapter order. */
export function allFlashcards(): Flashcard[] {
  return chapters.flatMap((chapter) => chapter.flashcards)
}

/** Every multiple-choice question across all chapters, in chapter order. */
export function allQuestions(): MultipleChoiceQuestion[] {
  return chapters.flatMap((chapter) => chapter.questions)
}

/** Find any study item by its stable id. */
export function findItemById(
  id: string,
): Flashcard | MultipleChoiceQuestion | undefined {
  for (const chapter of chapters) {
    const flashcard = chapter.flashcards.find((item) => item.id === id)
    if (flashcard) return flashcard
    const question = chapter.questions.find((item) => item.id === id)
    if (question) return question
  }
  return undefined
}

/** Every study item id in the registry. */
export function allItemIds(): string[] {
  return chapters.flatMap((chapter) => [
    ...chapter.flashcards.map((item) => item.id),
    ...chapter.questions.map((item) => item.id),
  ])
}

export type { Chapter, Flashcard, MultipleChoiceQuestion, StudyMode } from './types'
