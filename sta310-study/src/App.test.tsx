import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { chapters, getChapter } from './content'
import { PROGRESS_STORAGE_KEY, createEmptyProgress } from './logic/progress'

interface StoredProgress {
  difficult: Record<string, boolean>
  quiz: Record<string, { attempts: number; correct: number; lastResult: string }>
  flashcards: Record<string, { views: number; confident: boolean }>
  lastVisited: { chapter: number; mode: string } | null
}

function readStoredProgress(): StoredProgress | null {
  const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
  return raw ? (JSON.parse(raw) as StoredProgress) : null
}

function firstOptionButton(): HTMLButtonElement {
  const button = document.querySelector<HTMLButtonElement>('.option')
  if (!button) throw new Error('No answer option is rendered')
  return button
}

function openChapter(user: ReturnType<typeof userEvent.setup>, number: number, mode: string) {
  const card = screen.getByLabelText(new RegExp(`^Chapter ${number}:`))
  return user.click(within(card).getByRole('button', { name: mode }))
}

describe('chapter overview', () => {
  it('renders the course book framing and one card per chapter', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Study companion for the course book' }),
    ).toBeInTheDocument()

    for (const chapter of chapters) {
      expect(
        screen.getByLabelText(new RegExp(`^Chapter ${chapter.number}:`)),
      ).toBeInTheDocument()
    }

    expect(screen.getAllByText(/Collett/).length).toBeGreaterThan(0)
    expect(screen.getByText('17 chapters of the course book')).toBeInTheDocument()
  })

  it('starts from a clean, empty progress state', () => {
    render(<App />)

    expect(readStoredProgress()).toEqual(createEmptyProgress())
    expect(screen.getByText('0% of items covered')).toBeInTheDocument()
    expect(screen.queryByTestId('global-difficult-badge')).not.toBeInTheDocument()
  })
})

describe('quiz flow', () => {
  it('opens a chapter quiz and gives feedback on a correct answer', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openChapter(user, 1, 'Quiz')

    expect(
      screen.getByText('Which statement about the hazard function h(t) is correct?'),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /instantaneous rate of the event at t,/ }),
    )

    expect(screen.getByText('✓ Correct')).toBeInTheDocument()

    const stored = readStoredProgress()
    expect(stored?.quiz['ch01-q01']).toMatchObject({
      attempts: 1,
      correct: 1,
      lastResult: 'correct',
    })
    expect(stored?.lastVisited).toEqual({ chapter: 1, mode: 'quiz' })
  })

  it('explains an incorrect answer', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openChapter(user, 1, 'Quiz')

    await user.click(
      screen.getByRole('button', {
        name: 'It is the probability that an individual dies at time t.',
      }),
    )

    expect(screen.getByText('✗ Not quite')).toBeInTheDocument()
    expect(readStoredProgress()?.quiz['ch01-q01'].correct).toBe(0)
  })

  it('runs every question through to the results screen', async () => {
    const user = userEvent.setup()
    const chapter = getChapter(1)
    if (!chapter) throw new Error('Chapter 1 is missing')

    render(<App />)
    await openChapter(user, 1, 'Quiz')

    for (let i = 0; i < chapter.questions.length; i += 1) {
      await user.click(firstOptionButton())
      const isLast = i === chapter.questions.length - 1
      await user.click(
        screen.getByRole('button', { name: isLast ? 'See results' : 'Next question →' }),
      )
    }

    expect(screen.getByRole('heading', { name: 'Quiz complete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Retry the \d+ incorrect/ })).toBeInTheDocument()

    const stored = readStoredProgress()
    const attempts = Object.values(stored?.quiz ?? {}).reduce(
      (sum, record) => sum + record.attempts,
      0,
    )
    expect(attempts).toBe(chapter.questions.length)
  })
})

describe('flashcard flow', () => {
  it('reveals the answer when asked and counts the view', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openChapter(user, 1, 'Flashcards')

    expect(screen.getByText('What is survival analysis?')).toBeInTheDocument()
    expect(readStoredProgress()?.flashcards['ch01-f01']).toBeUndefined()

    await user.click(screen.getByRole('button', { name: 'Show answer' }))

    expect(screen.getByText(/The analysis of data in the form of times/)).toBeInTheDocument()
    expect(readStoredProgress()?.flashcards['ch01-f01'].views).toBe(1)
  })
})

describe('difficult marking', () => {
  it('records the mark and filters the flashcard deck', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openChapter(user, 1, 'Flashcards')

    await user.click(screen.getByRole('button', { name: 'Mark difficult' }))
    expect(readStoredProgress()?.difficult['ch01-f01']).toBe(true)
    expect(screen.getByTestId('global-difficult-badge')).toHaveTextContent('1 difficult')

    await user.click(screen.getByRole('button', { name: 'Only difficult' }))
    expect(screen.getByText('Card 1 of 1')).toBeInTheDocument()
  })

  it('keeps the mark when the app is reloaded', async () => {
    const user = userEvent.setup()
    const first = render(<App />)

    await openChapter(user, 1, 'Flashcards')
    await user.click(screen.getByRole('button', { name: 'Mark difficult' }))
    expect(screen.getByTestId('global-difficult-badge')).toHaveTextContent('1 difficult')
    first.unmount()

    render(<App />)
    expect(screen.getByTestId('global-difficult-badge')).toHaveTextContent('1 difficult')
  })

  it('can be cleared with the reset control', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openChapter(user, 1, 'Flashcards')
    await user.click(screen.getByRole('button', { name: 'Mark difficult' }))
    expect(screen.getByTestId('global-difficult-badge')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset progress' }))
    await user.click(screen.getByRole('button', { name: 'Confirm reset' }))

    expect(screen.queryByTestId('global-difficult-badge')).not.toBeInTheDocument()
    expect(readStoredProgress()?.difficult).toEqual({})
  })
})
