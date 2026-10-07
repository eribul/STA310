import type { Chapter, StudyMode } from '../content/types'
import type { ProgressApi } from '../hooks/useProgress'
import { FlashcardDeck } from './FlashcardDeck'
import { QuizRunner } from './QuizRunner'

interface ChapterViewProps {
  chapter: Chapter
  mode: StudyMode
  progress: ProgressApi
  onNavigate: (mode: StudyMode) => void
  onBack: () => void
}

/** One chapter with a tab switcher between flashcards and the quiz. */
export function ChapterView({
  chapter,
  mode,
  progress,
  onNavigate,
  onBack,
}: ChapterViewProps) {
  return (
    <>
      <div className="chapter-head">
        <div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
            ← All chapters
          </button>
          <h1>
            Chapter {chapter.number}: {chapter.title}
          </h1>
          <p className="muted small">
            {chapter.bookSections} · {chapter.flashcards.length} flashcards ·{' '}
            {chapter.questions.length} questions
          </p>
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label="Study mode">
        <button
          type="button"
          role="tab"
          className="tab"
          aria-selected={mode === 'flashcards'}
          onClick={() => onNavigate('flashcards')}
        >
          Flashcards
        </button>
        <button
          type="button"
          role="tab"
          className="tab"
          aria-selected={mode === 'quiz'}
          onClick={() => onNavigate('quiz')}
        >
          Quiz
        </button>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        {mode === 'flashcards' ? (
          <FlashcardDeck key={`flashcards-${chapter.number}`} chapter={chapter} progress={progress} />
        ) : (
          <QuizRunner key={`quiz-${chapter.number}`} chapter={chapter} progress={progress} />
        )}
      </div>
    </>
  )
}
