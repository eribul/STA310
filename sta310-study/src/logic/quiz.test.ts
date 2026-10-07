import { describe, expect, it } from 'vitest'
import type { MultipleChoiceQuestion } from '../content/types'
import {
  isCorrect,
  originalIndexOf,
  prepareQuestion,
  prepareQuiz,
  scoreQuiz,
  shuffle,
  type QuizAnswer,
} from './quiz'

function makeQuestion(overrides: Partial<MultipleChoiceQuestion> = {}): MultipleChoiceQuestion {
  return {
    id: 'q1',
    prompt: 'What is the hazard?',
    options: ['A rate', 'A probability', 'A median', 'A variance'],
    correctIndex: 0,
    explanation: 'The hazard is a rate.',
    source: '§1.4.2',
    ...overrides,
  }
}

/** Deterministic RNG that always returns 0, producing a known permutation. */
const zeroRng = () => 0

describe('shuffle', () => {
  it('keeps every element and does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5]
    const output = shuffle(input, zeroRng)

    expect(input).toEqual([1, 2, 3, 4, 5])
    expect([...output].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5])
  })

  it('can actually change the order', () => {
    const input = [1, 2, 3, 4, 5]
    const output = shuffle(input, zeroRng)
    expect(output).not.toEqual(input)
  })
})

describe('prepareQuestion', () => {
  it('keeps the authored order when shuffling is disabled', () => {
    const prepared = prepareQuestion(makeQuestion(), { shuffleOptions: false })

    expect(prepared.options.map((option) => option.text)).toEqual([
      'A rate',
      'A probability',
      'A median',
      'A variance',
    ])
    expect(prepared.correctOptionIndex).toBe(0)
    expect(prepared.options[prepared.correctOptionIndex].text).toBe('A rate')
  })

  it('tracks where the correct answer lands after shuffling', () => {
    const prepared = prepareQuestion(makeQuestion(), { shuffleOptions: true, rng: zeroRng })

    // Assert the invariant, not a particular permutation: the option flagged as
    // correct must be the one authored as correct.
    expect(prepared.options[prepared.correctOptionIndex].originalIndex).toBe(0)
    expect(prepared.options[prepared.correctOptionIndex].text).toBe('A rate')
    expect(prepared.options).toHaveLength(4)
  })

  it('finds the correct answer for every authored position', () => {
    const options = ['w', 'x', 'y', 'z']
    options.forEach((_, correctIndex) => {
      const prepared = prepareQuestion(
        makeQuestion({ options, correctIndex }),
        { shuffleOptions: true, rng: (() => {
          let seed = 42
          return () => {
            seed = (seed * 1103515245 + 12345) % 2147483648
            return seed / 2147483648
          }
        })() },
      )
      expect(prepared.options[prepared.correctOptionIndex].text).toBe(options[correctIndex])
    })
  })
})

describe('isCorrect', () => {
  it('grades against the shuffled position of the correct answer', () => {
    const prepared = prepareQuestion(makeQuestion(), { shuffleOptions: true, rng: zeroRng })

    expect(isCorrect(prepared, prepared.correctOptionIndex)).toBe(true)
    const wrongIndex = prepared.options.findIndex(
      (option) => option.originalIndex !== 0,
    )
    expect(isCorrect(prepared, wrongIndex)).toBe(false)
  })
})

describe('originalIndexOf', () => {
  it('maps a shuffled position back to the authored index', () => {
    const prepared = prepareQuestion(makeQuestion(), { shuffleOptions: true, rng: zeroRng })
    const preparedIndexOfCorrect = prepared.correctOptionIndex
    expect(originalIndexOf(prepared, preparedIndexOfCorrect)).toBe(0)
  })

  it('returns -1 for an out-of-range position', () => {
    const prepared = prepareQuestion(makeQuestion(), { shuffleOptions: false })
    expect(originalIndexOf(prepared, 99)).toBe(-1)
  })
})

describe('prepareQuiz', () => {
  it('keeps the authored question order by default', () => {
    const questions = [
      makeQuestion({ id: 'a' }),
      makeQuestion({ id: 'b' }),
      makeQuestion({ id: 'c' }),
    ]
    const quiz = prepareQuiz(questions, { shuffleOptions: false })
    expect(quiz.map((entry) => entry.question.id)).toEqual(['a', 'b', 'c'])
  })

  it('shuffles the question order when asked', () => {
    const questions = [
      makeQuestion({ id: 'a' }),
      makeQuestion({ id: 'b' }),
      makeQuestion({ id: 'c' }),
    ]
    const quiz = prepareQuiz(questions, {
      shuffleOptions: false,
      shuffleQuestions: true,
      rng: zeroRng,
    })
    expect(quiz.map((entry) => entry.question.id).sort()).toEqual(['a', 'b', 'c'])
    expect(quiz.map((entry) => entry.question.id)).not.toEqual(['a', 'b', 'c'])
  })

  it('drops questions that cannot be graded', () => {
    const questions = [
      makeQuestion({ id: 'ok' }),
      makeQuestion({ id: 'one-option', options: ['only'] }),
      makeQuestion({ id: 'bad-index', correctIndex: 7 }),
      makeQuestion({ id: 'negative-index', correctIndex: -1 }),
    ]
    const quiz = prepareQuiz(questions, { shuffleOptions: false })
    expect(quiz.map((entry) => entry.question.id)).toEqual(['ok'])
  })

  it('does not mutate the source questions', () => {
    const questions = [makeQuestion()]
    const snapshot = JSON.stringify(questions)
    prepareQuiz(questions, { shuffleOptions: true, rng: zeroRng })
    expect(JSON.stringify(questions)).toBe(snapshot)
  })
})

describe('scoreQuiz', () => {
  it('counts correct and incorrect answers and computes accuracy', () => {
    const answers: QuizAnswer[] = [
      { questionId: 'a', selectedOptionIndex: 0, correct: true },
      { questionId: 'b', selectedOptionIndex: 1, correct: false },
      { questionId: 'c', selectedOptionIndex: 2, correct: true },
      { questionId: 'd', selectedOptionIndex: 3, correct: true },
    ]
    const score = scoreQuiz(answers)

    expect(score).toEqual({
      total: 4,
      answered: 4,
      correct: 3,
      incorrect: 1,
      accuracy: 0.75,
    })
  })

  it('returns zero accuracy for an empty attempt', () => {
    expect(scoreQuiz([])).toEqual({
      total: 0,
      answered: 0,
      correct: 0,
      incorrect: 0,
      accuracy: 0,
    })
  })
})
