import type { MultipleChoiceQuestion } from '../content/types'

/** Random number generator in [0, 1); injectable so tests are deterministic. */
export type Rng = () => number

/** An answer option with a pointer back to its authored position. */
export interface PreparedOption {
  /** Index of this option in `MultipleChoiceQuestion.options`. */
  originalIndex: number
  text: string
}

/**
 * A question prepared for display: options may have been shuffled, so the
 * position of the correct answer must be looked up rather than assumed.
 */
export interface PreparedQuestion {
  question: MultipleChoiceQuestion
  options: PreparedOption[]
  /** Index within `options` (not the original array) of the correct answer. */
  correctOptionIndex: number
}

/** Result of grading a quiz attempt. */
export interface QuizScore {
  total: number
  answered: number
  correct: number
  incorrect: number
  accuracy: number
}

/** Fisher-Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = copy[i]
    copy[i] = copy[j]
    copy[j] = tmp
  }
  return copy
}

/** Options for building a quiz session. */
export interface PrepareQuizOptions {
  /** Shuffle the answer options within each question. */
  shuffleOptions?: boolean
  /** Shuffle the order of the questions. */
  shuffleQuestions?: boolean
  /** Source of randomness; pass a seeded generator in tests. */
  rng?: Rng
}

/**
 * Prepare one question for display, optionally shuffling its options while
 * keeping track of where the correct answer ended up.
 */
export function prepareQuestion(
  question: MultipleChoiceQuestion,
  options: PrepareQuizOptions = {},
): PreparedQuestion {
  const { shuffleOptions = true, rng = Math.random } = options

  const prepared: PreparedOption[] = question.options.map(
    (text, originalIndex) => ({ originalIndex, text }),
  )
  const finalOptions = shuffleOptions ? shuffle(prepared, rng) : prepared
  const correctOptionIndex = finalOptions.findIndex(
    (option) => option.originalIndex === question.correctIndex,
  )

  return { question, options: finalOptions, correctOptionIndex }
}

/**
 * Prepare a whole quiz. Questions with fewer than two options, or whose
 * `correctIndex` is out of range, are dropped rather than crashing the UI.
 */
export function prepareQuiz(
  questions: readonly MultipleChoiceQuestion[],
  options: PrepareQuizOptions = {},
): PreparedQuestion[] {
  const { shuffleQuestions = false, rng = Math.random } = options

  const usable = questions.filter(
    (question) =>
      question.options.length >= 2 &&
      Number.isInteger(question.correctIndex) &&
      question.correctIndex >= 0 &&
      question.correctIndex < question.options.length,
  )

  const ordered = shuffleQuestions ? shuffle(usable, rng) : usable
  return ordered.map((question) => prepareQuestion(question, options))
}

/** Grade a single answer against a prepared question. */
export function isCorrect(
  prepared: PreparedQuestion,
  selectedOptionIndex: number,
): boolean {
  return selectedOptionIndex === prepared.correctOptionIndex
}

/** One graded answer in a completed (or in-progress) quiz. */
export interface QuizAnswer {
  questionId: string
  selectedOptionIndex: number
  correct: boolean
}

/** Summarise a set of graded answers. */
export function scoreQuiz(answers: readonly QuizAnswer[]): QuizScore {
  const correct = answers.reduce((sum, answer) => sum + (answer.correct ? 1 : 0), 0)
  const total = answers.length
  return {
    total,
    answered: total,
    correct,
    incorrect: total - correct,
    accuracy: total === 0 ? 0 : correct / total,
  }
}

/** Identity of the option the user selected (for storage and review). */
export function originalIndexOf(
  prepared: PreparedQuestion,
  selectedOptionIndex: number,
): number {
  const option = prepared.options[selectedOptionIndex]
  return option ? option.originalIndex : -1
}
