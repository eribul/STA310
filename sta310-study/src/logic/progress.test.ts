import { describe, expect, it } from 'vitest'
import { getChapter } from '../content'
import {
  PROGRESS_VERSION,
  chapterStats,
  clearStoredProgress,
  countDifficult,
  createEmptyProgress,
  difficultIds,
  isDifficult,
  loadProgress,
  markDifficult,
  parseProgress,
  pruneProgress,
  recordFlashcardView,
  recordQuizAnswer,
  recordVisit,
  resetProgress,
  saveProgress,
  serializeProgress,
  setFlashcardConfidence,
  toggleDifficult,
  type StorageLike,
} from './progress'

/** In-memory Storage implementation for tests. */
function makeStorage(initial: Record<string, string> = {}): StorageLike & {
  data: Record<string, string>
} {
  const data: Record<string, string> = { ...initial }
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = value
    },
    removeItem: (key) => {
      delete data[key]
    },
  }
}

describe('createEmptyProgress', () => {
  it('starts empty and versioned', () => {
    expect(createEmptyProgress()).toEqual({
      version: PROGRESS_VERSION,
      difficult: {},
      quiz: {},
      flashcards: {},
      lastVisited: null,
    })
  })
})

describe('difficult flags', () => {
  it('marks and unmarks items without mutating the original state', () => {
    const state = createEmptyProgress()
    const marked = markDifficult(state, 'ch01-f01')

    expect(isDifficult(marked, 'ch01-f01')).toBe(true)
    expect(isDifficult(state, 'ch01-f01')).toBe(false)

    const unmarked = markDifficult(marked, 'ch01-f01', false)
    expect(isDifficult(unmarked, 'ch01-f01')).toBe(false)
  })

  it('toggles and counts', () => {
    let state = createEmptyProgress()
    state = toggleDifficult(state, 'a')
    state = toggleDifficult(state, 'b')
    expect(countDifficult(state)).toBe(2)
    expect(difficultIds(state).sort()).toEqual(['a', 'b'])

    state = toggleDifficult(state, 'a')
    expect(countDifficult(state)).toBe(1)
    expect(isDifficult(state, 'a')).toBe(false)
  })
})

describe('recordQuizAnswer', () => {
  it('accumulates attempts and correct answers', () => {
    let state = createEmptyProgress()
    state = recordQuizAnswer(state, 'ch01-q01', false, 1000)
    state = recordQuizAnswer(state, 'ch01-q01', true, 2000)

    expect(state.quiz['ch01-q01']).toEqual({
      attempts: 2,
      correct: 1,
      lastResult: 'correct',
      lastAnsweredAt: 2000,
    })
  })

  it('tracks separate questions independently', () => {
    let state = createEmptyProgress()
    state = recordQuizAnswer(state, 'a', true)
    state = recordQuizAnswer(state, 'b', true)
    expect(state.quiz.a.correct).toBe(1)
    expect(state.quiz.b.correct).toBe(1)
  })
})

describe('flashcard records', () => {
  it('counts views and stores self-assessment', () => {
    let state = createEmptyProgress()
    state = recordFlashcardView(state, 'ch01-f01')
    state = recordFlashcardView(state, 'ch01-f01')
    state = setFlashcardConfidence(state, 'ch01-f01', true)

    expect(state.flashcards['ch01-f01']).toEqual({ views: 2, confident: true })

    state = setFlashcardConfidence(state, 'ch01-f01', false)
    expect(state.flashcards['ch01-f01'].confident).toBe(false)
    expect(state.flashcards['ch01-f01'].views).toBe(2)
  })
})

describe('recordVisit', () => {
  it('stores the last chapter and mode', () => {
    const state = recordVisit(createEmptyProgress(), 3, 'quiz')
    expect(state.lastVisited).toEqual({ chapter: 3, mode: 'quiz' })
  })
})

describe('resetProgress', () => {
  it('returns a fresh state', () => {
    let state = createEmptyProgress()
    state = markDifficult(state, 'a')
    state = recordQuizAnswer(state, 'q', true)
    expect(resetProgress()).toEqual(createEmptyProgress())
  })
})

describe('chapterStats', () => {
  it('summarises one chapter', () => {
    const chapter = getChapter(1)
    if (!chapter) throw new Error('Chapter 1 is missing')

    const firstCard = chapter.flashcards[0]
    const secondCard = chapter.flashcards[1]
    const firstQuestion = chapter.questions[0]

    let state = createEmptyProgress()
    state = recordFlashcardView(state, firstCard.id)
    state = setFlashcardConfidence(state, firstCard.id, true)
    state = recordFlashcardView(state, secondCard.id)
    state = recordQuizAnswer(state, firstQuestion.id, true)
    state = recordQuizAnswer(state, firstQuestion.id, false)
    state = markDifficult(state, firstCard.id)
    state = markDifficult(state, firstQuestion.id)

    const stats = chapterStats(chapter, state)
    expect(stats.flashcards).toBe(chapter.flashcards.length)
    expect(stats.questions).toBe(chapter.questions.length)
    expect(stats.flashcardsViewed).toBe(2)
    expect(stats.flashcardsConfident).toBe(1)
    expect(stats.quizAnswered).toBe(2)
    expect(stats.quizCorrect).toBe(1)
    expect(stats.difficult).toBe(2)
  })

  it('reports zeros for untouched content', () => {
    const chapter = getChapter(2)
    if (!chapter) throw new Error('Chapter 2 is missing')
    const stats = chapterStats(chapter, createEmptyProgress())
    expect(stats).toMatchObject({
      difficult: 0,
      quizAnswered: 0,
      quizCorrect: 0,
      flashcardsViewed: 0,
      flashcardsConfident: 0,
    })
  })
})

describe('parseProgress', () => {
  it('returns an empty state for missing, corrupt or non-object input', () => {
    expect(parseProgress(null)).toEqual(createEmptyProgress())
    expect(parseProgress('')).toEqual(createEmptyProgress())
    expect(parseProgress('{not json')).toEqual(createEmptyProgress())
    expect(parseProgress('42')).toEqual(createEmptyProgress())
    expect(parseProgress('"a string"')).toEqual(createEmptyProgress())
    expect(parseProgress('[]')).toEqual(createEmptyProgress())
  })

  it('repairs partial data and keeps the valid parts', () => {
    const raw = JSON.stringify({
      difficult: { a: true, b: false, c: 'yes' },
      quiz: {
        a: { attempts: 2, correct: 1, lastResult: 'correct', lastAnsweredAt: 5 },
        bad: 'nonsense',
        worse: { attempts: 'lots' },
      },
      flashcards: { f: { views: 3, confident: true }, broken: 9 },
      lastVisited: { chapter: 4, mode: 'quiz' },
    })

    const state = parseProgress(raw)
    expect(state.difficult).toEqual({ a: true })
    expect(state.quiz.a).toEqual({
      attempts: 2,
      correct: 1,
      lastResult: 'correct',
      lastAnsweredAt: 5,
    })
    expect(state.quiz.bad).toBeUndefined()
    expect(state.quiz.worse).toBeUndefined()
    expect(state.flashcards.f).toEqual({ views: 3, confident: true })
    expect(state.flashcards.broken).toBeUndefined()
    expect(state.lastVisited).toEqual({ chapter: 4, mode: 'quiz' })
  })

  it('rejects an invalid lastVisited mode', () => {
    const state = parseProgress(JSON.stringify({ lastVisited: { chapter: 2, mode: 'mystery' } }))
    expect(state.lastVisited).toBeNull()
  })

  it('clamps negative and fractional counters', () => {
    const state = parseProgress(
      JSON.stringify({
        quiz: { a: { attempts: -3, correct: 1.9, lastResult: 'correct', lastAnsweredAt: 0 } },
        flashcards: { f: { views: -2, confident: false } },
      }),
    )
    expect(state.quiz.a.attempts).toBe(0)
    expect(state.quiz.a.correct).toBe(1)
    expect(state.flashcards.f.views).toBe(0)
  })
})

describe('serialize / parse round trip', () => {
  it('preserves a populated state', () => {
    let state = createEmptyProgress()
    state = markDifficult(state, 'a')
    state = recordQuizAnswer(state, 'q1', true, 42)
    state = recordFlashcardView(state, 'f1')
    state = recordVisit(state, 2, 'flashcards')

    expect(parseProgress(serializeProgress(state))).toEqual(state)
  })
})

describe('pruneProgress', () => {
  it('drops entries whose items no longer exist', () => {
    let state = createEmptyProgress()
    state = markDifficult(state, 'keep')
    state = markDifficult(state, 'drop')
    state = recordQuizAnswer(state, 'drop', true)
    state = recordFlashcardView(state, 'drop')

    const pruned = pruneProgress(state, ['keep'])
    expect(isDifficult(pruned, 'keep')).toBe(true)
    expect(isDifficult(pruned, 'drop')).toBe(false)
    expect(pruned.quiz.drop).toBeUndefined()
    expect(pruned.flashcards.drop).toBeUndefined()
  })
})

describe('storage helpers', () => {
  it('saves and loads through a Storage-like object', () => {
    const storage = makeStorage()
    const state = markDifficult(createEmptyProgress(), 'x')

    saveProgress(state, storage)
    expect(loadProgress(storage)).toEqual(state)
  })

  it('returns an empty state when nothing is stored', () => {
    expect(loadProgress(makeStorage())).toEqual(createEmptyProgress())
  })

  it('returns an empty state when the stored value is corrupt', () => {
    const storage = makeStorage({ 'sta310-study:progress:v1': '{oops' })
    expect(loadProgress(storage)).toEqual(createEmptyProgress())
  })

  it('clears stored progress', () => {
    const storage = makeStorage()
    saveProgress(markDifficult(createEmptyProgress(), 'x'), storage)
    clearStoredProgress(storage)
    expect(loadProgress(storage)).toEqual(createEmptyProgress())
  })

  it('never throws when the underlying storage throws', () => {
    const hostile: StorageLike = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('quota exceeded')
      },
      removeItem: () => {
        throw new Error('blocked')
      },
    }

    expect(loadProgress(hostile)).toEqual(createEmptyProgress())
    expect(() => saveProgress(createEmptyProgress(), hostile)).not.toThrow()
    expect(() => clearStoredProgress(hostile)).not.toThrow()
  })
})
