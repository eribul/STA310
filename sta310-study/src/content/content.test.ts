import { describe, expect, it } from 'vitest'
import {
  allFlashcards,
  allItemIds,
  allQuestions,
  chapters,
  findItemById,
  getChapter,
  getChapterBySlug,
} from './index'

describe('chapter registry', () => {
  it('exposes all chapters of the course book, in order', () => {
    expect(chapters).toHaveLength(17)
    expect(chapters.map((chapter) => chapter.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    ])
  })

  it('has unique chapter numbers and slugs', () => {
    const numbers = chapters.map((chapter) => chapter.number)
    const slugs = chapters.map((chapter) => chapter.slug)
    expect(new Set(numbers).size).toBe(numbers.length)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('is searchable by number and by slug', () => {
    expect(getChapter(3)?.slug).toBe('cox-regression')
    expect(getChapterBySlug('parametric-models')?.number).toBe(5)
    expect(getChapter(99)).toBeUndefined()
    expect(getChapterBySlug('nope')).toBeUndefined()
  })

  it('gives every chapter a title, summary and book section range', () => {
    for (const chapter of chapters) {
      expect(chapter.title.trim().length, `chapter ${chapter.number}`).toBeGreaterThan(0)
      expect(chapter.summary.trim().length, `chapter ${chapter.number}`).toBeGreaterThan(20)
      expect(chapter.bookSections, `chapter ${chapter.number}`).toMatch(/^§\d/)
    }
  })
})

describe('content volume', () => {
  it('has the promised number of items per chapter', () => {
    for (const chapter of chapters) {
      expect(
        chapter.flashcards.length,
        `chapter ${chapter.number} flashcards`,
      ).toBeGreaterThanOrEqual(8)
      expect(
        chapter.questions.length,
        `chapter ${chapter.number} questions`,
      ).toBeGreaterThanOrEqual(6)
    }
  })
})

describe('item ids', () => {
  it('are globally unique', () => {
    const ids = allItemIds()
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('use a chapter-scoped prefix', () => {
    for (const chapter of chapters) {
      const prefix = `ch${String(chapter.number).padStart(2, '0')}-`
      for (const card of chapter.flashcards) {
        expect(card.id.startsWith(prefix), card.id).toBe(true)
        expect(card.id).toMatch(/^ch\d{2}-f\d{2}$/)
      }
      for (const question of chapter.questions) {
        expect(question.id.startsWith(prefix), question.id).toBe(true)
        expect(question.id).toMatch(/^ch\d{2}-q\d{2}$/)
      }
    }
  })

  it('can be looked up by id', () => {
    const first = allItemIds()[0]
    expect(findItemById(first)).toBeDefined()
    expect(findItemById('does-not-exist')).toBeUndefined()
  })
})

describe('flashcard integrity', () => {
  it('has non-empty fronts and backs', () => {
    for (const card of allFlashcards()) {
      expect(card.front.trim().length, card.id).toBeGreaterThan(0)
      expect(card.back.trim().length, card.id).toBeGreaterThan(0)
    }
  })

  it('points at a book section', () => {
    for (const card of allFlashcards()) {
      expect(card.source, card.id).toMatch(/^§\d/)
    }
  })
})

describe('multiple-choice integrity', () => {
  it('has a prompt, at least two options and an explanation', () => {
    for (const question of allQuestions()) {
      expect(question.prompt.trim().length, question.id).toBeGreaterThan(0)
      expect(question.options.length, question.id).toBeGreaterThanOrEqual(2)
      expect(question.explanation.trim().length, question.id).toBeGreaterThan(0)
    }
  })

  it('points at a valid correct option', () => {
    for (const question of allQuestions()) {
      expect(Number.isInteger(question.correctIndex), question.id).toBe(true)
      expect(question.correctIndex, question.id).toBeGreaterThanOrEqual(0)
      expect(question.correctIndex, question.id).toBeLessThan(question.options.length)
    }
  })

  it('has non-empty, distinct options', () => {
    for (const question of allQuestions()) {
      for (const option of question.options) {
        expect(option.trim().length, question.id).toBeGreaterThan(0)
      }
      expect(new Set(question.options).size, question.id).toBe(question.options.length)
    }
  })

  it('points at a book section', () => {
    for (const question of allQuestions()) {
      expect(question.source, question.id).toMatch(/^§\d/)
    }
  })
})

describe('cumulative questions', () => {
  it('only build on earlier chapters', () => {
    for (const chapter of chapters) {
      for (const item of [...chapter.flashcards, ...chapter.questions]) {
        for (const dependency of item.buildsOn ?? []) {
          expect(dependency, `${item.id} builds on chapter ${dependency}`).toBeLessThan(
            chapter.number,
          )
          expect(getChapter(dependency), item.id).toBeDefined()
        }
      }
    }
  })
})

describe('rendered content', () => {
  it('avoids raw math markup that the UI cannot render', () => {
    for (const chapter of chapters) {
      for (const item of [...chapter.flashcards, ...chapter.questions]) {
        const texts = 'front' in item
          ? [item.front, item.back]
          : [item.prompt, item.explanation, ...item.options]
        for (const text of texts) {
          expect(text, item.id).not.toMatch(/\\hat|\\beta|\$/)
        }
      }
    }
  })
})
