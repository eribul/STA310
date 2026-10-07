import { useMemo, useState } from 'react'
import type { Chapter, Flashcard } from '../content/types'
import type { ProgressApi } from '../hooks/useProgress'
import { isDifficult } from '../logic/progress'
import { shuffle } from '../logic/quiz'
import { DifficultButton } from './DifficultButton'

interface FlashcardDeckProps {
  chapter: Chapter
  progress: ProgressApi
}

function buildsOnLabel(buildsOn: number[] | undefined): string | null {
  if (!buildsOn || buildsOn.length === 0) return null
  const first = buildsOn[0]
  const last = buildsOn[buildsOn.length - 1]
  return first === last
    ? `Builds on: Chapter ${first}`
    : `Builds on: Chapters ${first}-${last}`
}

/**
 * Flashcard study mode for one chapter: flip cards, navigate, shuffle, flag
 * difficult cards and self-assess. All flags and counts live in localStorage
 * via the `ProgressApi`.
 *
 * The visible deck is derived from `order` plus the difficulty filter rather
 * than stored in state, so marking a card never resets the student's position.
 */
export function FlashcardDeck({ chapter, progress }: FlashcardDeckProps) {
  const { state, toggleDifficult, recordFlashcardView, setFlashcardConfident } = progress

  const cardById = useMemo(() => {
    const map = new Map<string, Flashcard>()
    for (const card of chapter.flashcards) map.set(card.id, card)
    return map
  }, [chapter.flashcards])

  const [order, setOrder] = useState<string[]>(() =>
    chapter.flashcards.map((card) => card.id),
  )
  const [index, setIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [onlyDifficult, setOnlyDifficult] = useState(false)

  const visibleIds = onlyDifficult
    ? order.filter((id) => isDifficult(state, id))
    : order
  const safeIndex = visibleIds.length === 0 ? 0 : Math.min(index, visibleIds.length - 1)
  const currentId = visibleIds[safeIndex]
  const current = currentId ? cardById.get(currentId) : undefined

  const difficultCount = chapter.flashcards.filter((card) =>
    isDifficult(state, card.id),
  ).length

  function goTo(nextIndex: number) {
    const clamped = Math.max(0, Math.min(nextIndex, visibleIds.length - 1))
    setIndex(clamped)
    setShowBack(false)
  }

  function shuffleDeck() {
    setOrder((ids) => shuffle(ids))
    setIndex(0)
    setShowBack(false)
  }

  function toggleFilter() {
    setOnlyDifficult((value) => !value)
    setIndex(0)
    setShowBack(false)
  }

  function reveal() {
    setShowBack(true)
    if (current) recordFlashcardView(current.id)
  }

  function toggleFlip() {
    if (showBack) {
      setShowBack(false)
    } else {
      reveal()
    }
  }

  if (!current) {
    return (
      <div className="card empty-state">
        <p>
          {onlyDifficult
            ? 'No flashcards are marked as difficult in this chapter yet.'
            : 'This chapter has no flashcards.'}
        </p>
        {onlyDifficult ? (
          <button type="button" className="btn" onClick={toggleFilter}>
            Show all cards
          </button>
        ) : null}
      </div>
    )
  }

  const confident = state.flashcards[current.id]?.confident === true
  const markedDifficult = isDifficult(state, current.id)
  const cumulative = buildsOnLabel(current.buildsOn)

  return (
    <section aria-label={`Flashcards for chapter ${chapter.number}`}>
      <div className="study-toolbar">
        <div className="study-toolbar__group">
          <span className="badge">
            Card {safeIndex + 1} of {visibleIds.length}
          </span>
          {difficultCount > 0 || onlyDifficult ? (
            <span className="badge badge--warn">{difficultCount} difficult</span>
          ) : null}
        </div>
        <div className="study-toolbar__group">
          <button
            type="button"
            className="btn btn--sm"
            aria-pressed={onlyDifficult}
            onClick={toggleFilter}
          >
            Only difficult
          </button>
          <button type="button" className="btn btn--sm" onClick={shuffleDeck}>
            Shuffle
          </button>
        </div>
      </div>

      <div
        className="flashcard"
        data-flipped={showBack}
        role="button"
        tabIndex={0}
        aria-label={
          showBack
            ? 'Answer. Click to hide the answer.'
            : 'Question. Click to reveal the answer.'
        }
        onClick={toggleFlip}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            toggleFlip()
          }
        }}
      >
        <span className="flashcard__label">
          {showBack ? 'Answer' : 'Question'}
          {cumulative ? ` · ${cumulative}` : ''}
        </span>
        <span className="flashcard__text">
          {showBack ? current.back : current.front}
        </span>
        {!showBack && current.hint ? (
          <span className="flashcard__hint">Hint: {current.hint}</span>
        ) : null}
        <span className="flashcard__meta">
          <span>{current.source}</span>
          {confident ? <span>✓ Self-assessed as known</span> : null}
        </span>
      </div>

      <div className="study-toolbar" style={{ marginTop: '0.9rem' }}>
        <div className="study-toolbar__group">
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => goTo(safeIndex - 1)}
            disabled={safeIndex === 0}
          >
            ← Previous
          </button>
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => goTo(safeIndex + 1)}
            disabled={safeIndex >= visibleIds.length - 1}
          >
            Next →
          </button>
        </div>
        <div className="study-toolbar__group">
          <button type="button" className="btn btn--sm" onClick={toggleFlip}>
            {showBack ? 'Hide answer' : 'Show answer'}
          </button>
          <button
            type="button"
            className="btn btn--sm"
            aria-pressed={confident}
            onClick={() => setFlashcardConfident(current.id, !confident)}
          >
            {confident ? '✓ I know this' : 'I know this'}
          </button>
          <DifficultButton
            active={markedDifficult}
            onToggle={() => toggleDifficult(current.id)}
          />
        </div>
      </div>

      <p className="source-note">
        Source: Collett, <em>Modelling Survival Data in Medical Research</em> (4th
        ed.), chapter {chapter.number} ({chapter.bookSections}).
      </p>
    </section>
  )
}
