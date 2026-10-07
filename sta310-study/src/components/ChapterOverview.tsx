import type { Chapter } from '../content/types'
import type { ProgressApi } from '../hooks/useProgress'
import { chapterStats, countDifficult } from '../logic/progress'

interface ChapterOverviewProps {
  chapters: Chapter[]
  progress: ProgressApi
  onOpen: (chapter: number, mode: 'flashcards' | 'quiz') => void
}

/**
 * Landing view: overall progress plus a card per chapter with direct entry to
 * flashcards and the quiz.
 */
export function ChapterOverview({ chapters, progress, onOpen }: ChapterOverviewProps) {
  const totalFlashcards = chapters.reduce((sum, c) => sum + c.flashcards.length, 0)
  const totalQuestions = chapters.reduce((sum, c) => sum + c.questions.length, 0)
  const totalDifficult = countDifficult(progress.state)

  const stats = chapters.map((chapter) => ({
    chapter,
    stats: chapterStats(chapter, progress.state),
  }))

  const covered = stats.reduce(
    (sum, entry) =>
      sum + entry.stats.flashcardsViewed + entry.stats.quizCorrect,
    0,
  )
  const totalItems = totalFlashcards + totalQuestions
  const coverage = totalItems === 0 ? 0 : Math.round((covered / totalItems) * 100)

  const lastVisited = progress.state.lastVisited
  const continueChapter = lastVisited
    ? chapters.find((chapter) => chapter.number === lastVisited.chapter)
    : undefined

  return (
    <>
      <section className="hero">
        <div className="hero__eyebrow">STA310 · Survival analysis</div>
        <h1>Study companion for the course book</h1>
        <p>
          Flashcards and multiple-choice questions organised chapter by chapter,
          built from Collett, <em>Modelling Survival Data in Medical Research</em>{' '}
          (4th edition). Mark questions as difficult and your progress is saved
          locally in this browser. No account, no server.
        </p>
      </section>

      {continueChapter && lastVisited ? (
        <div className="banner">
          <span>
            Continue where you left off: <strong>Chapter {continueChapter.number}</strong>{' '}
            · {lastVisited.mode === 'quiz' ? 'Quiz' : 'Flashcards'}
          </span>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={() => onOpen(continueChapter.number, lastVisited.mode)}
          >
            Continue
          </button>
        </div>
      ) : null}

      <div className="card">
        <div className="section-title" style={{ margin: 0 }}>
          <h2>Your progress</h2>
          <span className="small muted">
            {totalFlashcards} flashcards · {totalQuestions} questions ·{' '}
            {totalDifficult} marked difficult
          </span>
        </div>
        <div className="progress">
          <div className="progress__fill" style={{ width: `${coverage}%` }} />
        </div>
        <div className="progress-legend">
          <span>{coverage}% of items covered</span>
          <span>
            {covered} of {totalItems}
          </span>
        </div>
      </div>

      <div className="section-title">
        <h2>Chapters</h2>
        <span className="small muted">
          {chapters.length} chapters of the core text (1-7)
        </span>
      </div>

      <div className="chapter-grid">
        {stats.map(({ chapter, stats: chapterStat }) => {
          const total = chapterStat.flashcards + chapterStat.questions
          const done = chapterStat.flashcardsViewed + chapterStat.quizCorrect
          const percent = total === 0 ? 0 : Math.round((done / total) * 100)
          return (
            <article
              key={chapter.number}
              className="card chapter-card"
              aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
            >
              <div className="chapter-card__head">
                <div className="chapter-card__number" aria-hidden="true">
                  {chapter.number}
                </div>
                <div>
                  <h3 className="chapter-card__title">{chapter.title}</h3>
                  <div className="chapter-card__source">
                    Book {chapter.bookSections}
                  </div>
                </div>
              </div>

              <p className="chapter-card__summary">{chapter.summary}</p>

              <div className="progress">
                <div className="progress__fill" style={{ width: `${percent}%` }} />
              </div>

              <div className="chapter-card__stats">
                <span className="stat">
                  <span className="stat__dot" aria-hidden="true" />
                  {chapterStat.flashcardsViewed}/{chapterStat.flashcards} cards viewed
                </span>
                <span className="stat">
                  <span className="stat__dot stat__dot--good" aria-hidden="true" />
                  {chapterStat.quizCorrect}/{chapterStat.questions} correct
                </span>
                {chapterStat.difficult > 0 ? (
                  <span className="stat">
                    <span className="stat__dot stat__dot--warn" aria-hidden="true" />
                    {chapterStat.difficult} difficult
                  </span>
                ) : null}
              </div>

              <div className="chapter-card__actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => onOpen(chapter.number, 'flashcards')}
                >
                  Flashcards
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => onOpen(chapter.number, 'quiz')}
                >
                  Quiz
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <p className="source-note">
        Content is stored as editable data files in{' '}
        <code>src/content/chapters/</code> and follows the question types and
        chapter progression of the course&apos;s exercise material. Book sections
        are indicated on every card and question.
      </p>
    </>
  )
}
