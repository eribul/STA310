import { useCallback, useEffect, useState } from 'react'
import { allItemIds } from '../content'
import type { StudyMode } from '../content/types'
import {
  clearStoredProgress,
  createEmptyProgress,
  loadProgress,
  markDifficult as markDifficultIn,
  pruneProgress,
  recordFlashcardView as recordFlashcardViewIn,
  recordQuizAnswer as recordQuizAnswerIn,
  recordVisit as recordVisitIn,
  saveProgress,
  setFlashcardConfidence as setFlashcardConfidenceIn,
  toggleDifficult as toggleDifficultIn,
  type ProgressState,
  type StorageLike,
} from '../logic/progress'

/** The browser localStorage, or null when it is unavailable (SSR / blocked). */
function getBrowserStorage(): StorageLike | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    return window.localStorage
  } catch {
    return null
  }
}

/** Everything a component needs to read and update progress. */
export interface ProgressApi {
  state: ProgressState
  toggleDifficult: (itemId: string) => void
  setDifficult: (itemId: string, difficult: boolean) => void
  recordAnswer: (questionId: string, correct: boolean) => void
  recordFlashcardView: (flashcardId: string) => void
  setFlashcardConfident: (flashcardId: string, confident: boolean) => void
  recordVisit: (chapter: number, mode: StudyMode) => void
  reset: () => void
}

/**
 * Progress state backed by localStorage. State updates are pure functions from
 * `src/logic/progress.ts`; this hook only wires them to React and persistence.
 */
export function useProgress(storage: StorageLike | null = getBrowserStorage()): ProgressApi {
  const [state, setState] = useState<ProgressState>(() => {
    const loaded = storage ? loadProgress(storage) : createEmptyProgress()
    // Drop entries for questions that have since been removed or renamed.
    return pruneProgress(loaded, allItemIds())
  })

  useEffect(() => {
    if (storage) saveProgress(state, storage)
  }, [state, storage])

  const toggleDifficult = useCallback((itemId: string) => {
    setState((current) => toggleDifficultIn(current, itemId))
  }, [])

  const setDifficult = useCallback((itemId: string, difficult: boolean) => {
    setState((current) => markDifficultIn(current, itemId, difficult))
  }, [])

  const recordAnswer = useCallback((questionId: string, correct: boolean) => {
    setState((current) => recordQuizAnswerIn(current, questionId, correct))
  }, [])

  const recordFlashcardView = useCallback((flashcardId: string) => {
    setState((current) => recordFlashcardViewIn(current, flashcardId))
  }, [])

  const setFlashcardConfident = useCallback(
    (flashcardId: string, confident: boolean) => {
      setState((current) => setFlashcardConfidenceIn(current, flashcardId, confident))
    },
    [],
  )

  const recordVisit = useCallback((chapter: number, mode: StudyMode) => {
    setState((current) => recordVisitIn(current, chapter, mode))
  }, [])

  const reset = useCallback(() => {
    if (storage) clearStoredProgress(storage)
    setState(createEmptyProgress())
  }, [storage])

  return {
    state,
    toggleDifficult,
    setDifficult,
    recordAnswer,
    recordFlashcardView,
    setFlashcardConfident,
    recordVisit,
    reset,
  }
}
