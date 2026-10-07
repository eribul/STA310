import { ChapterOverview } from './components/ChapterOverview'
import { ChapterView } from './components/ChapterView'
import { ResetProgressButton } from './components/ResetProgressButton'
import { chapters, getChapter } from './content'
import type { StudyMode } from './content/types'
import { useHashRoute } from './hooks/useHashRoute'
import { useProgress } from './hooks/useProgress'
import { countDifficult } from './logic/progress'

function App() {
  const [route, navigate] = useHashRoute()
  const progress = useProgress()

  const difficult = countDifficult(progress.state)
  const hasProgress =
    difficult > 0 ||
    Object.keys(progress.state.quiz).length > 0 ||
    Object.keys(progress.state.flashcards).length > 0 ||
    progress.state.lastVisited !== null

  function openChapter(chapter: number, mode: StudyMode) {
    progress.recordVisit(chapter, mode)
    navigate({ name: 'chapter', chapter, mode })
  }

  let content
  if (route.name === 'chapter') {
    const chapter = getChapter(route.chapter)
    content = chapter ? (
      <ChapterView
        chapter={chapter}
        mode={route.mode}
        progress={progress}
        onNavigate={(mode) => openChapter(chapter.number, mode)}
        onBack={() => navigate({ name: 'home' })}
      />
    ) : (
      <div className="card empty-state">
        <p>Chapter {route.chapter} is not part of this study companion.</p>
        <button
          type="button"
          className="btn"
          onClick={() => navigate({ name: 'home' })}
        >
          Back to chapters
        </button>
      </div>
    )
  } else {
    content = (
      <ChapterOverview chapters={chapters} progress={progress} onOpen={openChapter} />
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <button
            type="button"
            className="brand"
            onClick={() => navigate({ name: 'home' })}
            aria-label="STA310 Study, go to the chapter overview"
          >
            <span className="brand__mark" aria-hidden="true">
              S
            </span>
            <span className="brand__text">
              <span className="brand__title">STA310 Study</span>
              <span className="brand__subtitle">
                Survival analysis · Collett, 4th ed.
              </span>
            </span>
          </button>
          <span className="header-spacer" />
          {difficult > 0 ? (
            <span className="badge badge--warn" data-testid="global-difficult-badge">
              {difficult} difficult
            </span>
          ) : null}
          <ResetProgressButton onReset={progress.reset} disabled={!hasProgress} />
        </div>
      </header>

      <main className="app-main">{content}</main>

      <footer className="app-main" style={{ paddingTop: 0, paddingBottom: '2rem' }}>
        <p className="muted small">
          Offline study aid · all progress is stored in this browser only ·
          source material: Collett, <em>Modelling Survival Data in Medical
          Research</em> (4th ed., 2023).
        </p>
      </footer>
    </div>
  )
}

export default App
