import type { Chapter, StudyMode } from '../content/types'

/** Bump when the shape of `ProgressState` changes in a non-additive way. */
export const PROGRESS_VERSION = 1

/** localStorage key. Versioned so a future migration can be explicit. */
export const PROGRESS_STORAGE_KEY = 'sta310-study:progress:v1'

/** How a single multiple-choice question was last attempted. */
export interface QuizRecord {
  attempts: number
  correct: number
  lastResult: 'correct' | 'incorrect'
  lastAnsweredAt: number
}

/** How often a flashcard has been viewed, and the self-assessment flag. */
export interface FlashcardRecord {
  views: number
  confident: boolean
}

/** Where the student was last studying, used to restore the last view. */
export interface LastVisited {
  chapter: number
  mode: StudyMode
}

/** Everything persisted to localStorage. Plain JSON by design. */
export interface ProgressState {
  version: number
  /** Item ids explicitly marked as difficult by the student. */
  difficult: Record<string, boolean>
  quiz: Record<string, QuizRecord>
  flashcards: Record<string, FlashcardRecord>
  lastVisited: LastVisited | null
}

/** A fresh, empty progress state. */
export function createEmptyProgress(): ProgressState {
  return {
    version: PROGRESS_VERSION,
    difficult: {},
    quiz: {},
    flashcards: {},
    lastVisited: null,
  }
}

/** Copy of the state with the given item flagged as difficult / not difficult. */
export function markDifficult(
  state: ProgressState,
  itemId: string,
  difficult = true,
): ProgressState {
  const next = { ...state.difficult }
  if (difficult) {
    next[itemId] = true
  } else {
    delete next[itemId]
  }
  return { ...state, difficult: next }
}

/** Flip the difficult flag for an item. */
export function toggleDifficult(state: ProgressState, itemId: string): ProgressState {
  return markDifficult(state, itemId, !isDifficult(state, itemId))
}

/** Whether an item is currently marked as difficult. */
export function isDifficult(state: ProgressState, itemId: string): boolean {
  return state.difficult[itemId] === true
}

/** Number of items marked as difficult. */
export function countDifficult(state: ProgressState): number {
  return Object.keys(state.difficult).length
}

/** All ids currently marked as difficult. */
export function difficultIds(state: ProgressState): string[] {
  return Object.keys(state.difficult)
}

/** Record the outcome of answering one multiple-choice question. */
export function recordQuizAnswer(
  state: ProgressState,
  questionId: string,
  correct: boolean,
  now: number = Date.now(),
): ProgressState {
  const previous: QuizRecord = state.quiz[questionId] ?? {
    attempts: 0,
    correct: 0,
    lastResult: 'incorrect',
    lastAnsweredAt: 0,
  }
  const next: QuizRecord = {
    attempts: previous.attempts + 1,
    correct: previous.correct + (correct ? 1 : 0),
    lastResult: correct ? 'correct' : 'incorrect',
    lastAnsweredAt: now,
  }
  return { ...state, quiz: { ...state.quiz, [questionId]: next } }
}

/** Record that a flashcard was viewed (front or back). */
export function recordFlashcardView(
  state: ProgressState,
  flashcardId: string,
): ProgressState {
  const previous = state.flashcards[flashcardId] ?? { views: 0, confident: false }
  const next: FlashcardRecord = { ...previous, views: previous.views + 1 }
  return { ...state, flashcards: { ...state.flashcards, [flashcardId]: next } }
}

/** Set the student's self-assessment ("I know this") for a flashcard. */
export function setFlashcardConfidence(
  state: ProgressState,
  flashcardId: string,
  confident: boolean,
): ProgressState {
  const previous = state.flashcards[flashcardId] ?? { views: 0, confident: false }
  const next: FlashcardRecord = { ...previous, confident }
  return { ...state, flashcards: { ...state.flashcards, [flashcardId]: next } }
}

/** Remember the chapter and mode the student is in. */
export function recordVisit(
  state: ProgressState,
  chapter: number,
  mode: StudyMode,
): ProgressState {
  return { ...state, lastVisited: { chapter, mode } }
}

/** Erase all locally stored progress. */
export function resetProgress(): ProgressState {
  return createEmptyProgress()
}

/** Per-chapter view of the progress, used by the chapter cards. */
export interface ChapterStats {
  flashcards: number
  questions: number
  difficult: number
  quizAnswered: number
  quizCorrect: number
  flashcardsViewed: number
  flashcardsConfident: number
}

/** Summarise progress for a single chapter. */
export function chapterStats(chapter: Chapter, state: ProgressState): ChapterStats {
  const quizRecords = chapter.questions
    .map((question) => state.quiz[question.id])
    .filter((record): record is QuizRecord => Boolean(record))

  const flashcardRecords = chapter.flashcards
    .map((card) => state.flashcards[card.id])
    .filter((record): record is FlashcardRecord => Boolean(record))

  const difficultCount =
    chapter.flashcards.filter((card) => isDifficult(state, card.id)).length +
    chapter.questions.filter((question) => isDifficult(state, question.id)).length

  return {
    flashcards: chapter.flashcards.length,
    questions: chapter.questions.length,
    difficult: difficultCount,
    quizAnswered: quizRecords.reduce((sum, record) => sum + record.attempts, 0),
    quizCorrect: quizRecords.reduce((sum, record) => sum + record.correct, 0),
    flashcardsViewed: flashcardRecords.filter((record) => record.views > 0).length,
    flashcardsConfident: flashcardRecords.filter((record) => record.confident).length,
  }
}

/* ------------------------------------------------------------------ */
/* Serialisation and storage                                           */
/* ------------------------------------------------------------------ */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function sanitizeQuiz(value: unknown): QuizRecord | null {
  if (!isPlainObject(value)) return null
  const attempts = value.attempts
  const correct = value.correct
  if (typeof attempts !== 'number' || typeof correct !== 'number') return null
  if (!Number.isFinite(attempts) || !Number.isFinite(correct)) return null
  return {
    attempts: Math.max(0, Math.trunc(attempts)),
    correct: Math.max(0, Math.trunc(correct)),
    lastResult: value.lastResult === 'correct' ? 'correct' : 'incorrect',
    lastAnsweredAt:
      typeof value.lastAnsweredAt === 'number' && Number.isFinite(value.lastAnsweredAt)
        ? value.lastAnsweredAt
        : 0,
  }
}

function sanitizeFlashcard(value: unknown): FlashcardRecord | null {
  if (!isPlainObject(value)) return null
  const views = typeof value.views === 'number' && Number.isFinite(value.views)
    ? Math.max(0, Math.trunc(value.views))
    : 0
  return { views, confident: value.confident === true }
}

function sanitizeVisit(value: unknown): LastVisited | null {
  if (!isPlainObject(value)) return null
  const chapter = value.chapter
  const mode = value.mode
  if (typeof chapter !== 'number' || !Number.isInteger(chapter)) return null
  if (mode !== 'flashcards' && mode !== 'quiz') return null
  return { chapter, mode }
}

/**
 * Parse and validate a JSON string from localStorage. Corrupt, partial or
 * hand-edited data never throws - it is repaired around valid entries, so a
 * bad value can only ever cost the student the data it touched.
 */
export function parseProgress(raw: string | null | undefined): ProgressState {
  const empty = createEmptyProgress()
  if (!raw) return empty

  let decoded: unknown
  try {
    decoded = JSON.parse(raw)
  } catch {
    return empty
  }
  if (!isPlainObject(decoded)) return empty

  const difficult: Record<string, boolean> = {}
  if (isPlainObject(decoded.difficult)) {
    for (const [id, flagged] of Object.entries(decoded.difficult)) {
      if (flagged === true) difficult[id] = true
    }
  }

  const quiz: Record<string, QuizRecord> = {}
  if (isPlainObject(decoded.quiz)) {
    for (const [id, record] of Object.entries(decoded.quiz)) {
      const cleaned = sanitizeQuiz(record)
      if (cleaned) quiz[id] = cleaned
    }
  }

  const flashcards: Record<string, FlashcardRecord> = {}
  if (isPlainObject(decoded.flashcards)) {
    for (const [id, record] of Object.entries(decoded.flashcards)) {
      const cleaned = sanitizeFlashcard(record)
      if (cleaned) flashcards[id] = cleaned
    }
  }

  return {
    version: PROGRESS_VERSION,
    difficult,
    quiz,
    flashcards,
    lastVisited: sanitizeVisit(decoded.lastVisited),
  }
}

/** Serialise progress for localStorage. */
export function serializeProgress(state: ProgressState): string {
  return JSON.stringify(state)
}

/** Drop entries whose items no longer exist in the content registry. */
export function pruneProgress(
  state: ProgressState,
  validIds: Iterable<string>,
): ProgressState {
  const valid = new Set(validIds)
  const keep = <T>(record: Record<string, T>): Record<string, T> => {
    const next: Record<string, T> = {}
    for (const [id, value] of Object.entries(record)) {
      if (valid.has(id)) next[id] = value
    }
    return next
  }
  return {
    ...state,
    difficult: keep(state.difficult),
    quiz: keep(state.quiz),
    flashcards: keep(state.flashcards),
  }
}

/** The subset of the Web Storage API this app needs; easy to fake in tests. */
export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

/** Read progress from storage, falling back to an empty state. */
export function loadProgress(
  storage: StorageLike,
  key: string = PROGRESS_STORAGE_KEY,
): ProgressState {
  try {
    return parseProgress(storage.getItem(key))
  } catch {
    return createEmptyProgress()
  }
}

/** Persist progress, ignoring storage errors (e.g. private-mode quota). */
export function saveProgress(
  state: ProgressState,
  storage: StorageLike,
  key: string = PROGRESS_STORAGE_KEY,
): void {
  try {
    storage.setItem(key, serializeProgress(state))
  } catch {
    /* Storage may be unavailable or full; progress is best-effort. */
  }
}

/** Remove the stored progress. */
export function clearStoredProgress(
  storage: StorageLike,
  key: string = PROGRESS_STORAGE_KEY,
): void {
  try {
    storage.removeItem(key)
  } catch {
    /* ignore */
  }
}
