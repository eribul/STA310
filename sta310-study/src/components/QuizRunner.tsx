import { useState } from 'react'
import type { Chapter, MultipleChoiceQuestion } from '../content/types'
import type { ProgressApi } from '../hooks/useProgress'
import { isDifficult } from '../logic/progress'
import {
  isCorrect,
  originalIndexOf,
  prepareQuiz,
  scoreQuiz,
  type PreparedQuestion,
  type QuizAnswer,
} from '../logic/quiz'
import { DifficultButton } from './DifficultButton'

interface QuizRunnerProps {
  chapter: Chapter
  progress: ProgressApi
}

const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E', 'F']

/**
 * Multiple-choice quiz for one chapter. Options are shuffled for every attempt
 * but graded against the authored `correctIndex`, and every answer is recorded
 * to the local progress store.
 */
export function QuizRunner({ chapter, progress }: QuizRunnerProps) {
  const { state, recordAnswer, toggleDifficult } = progress

  const [session, setSession] = useState<PreparedQuestion[]>(() =>
    prepareQuiz(chapter.questions, { shuffleOptions: true }),
  )
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [finished, setFinished] = useState(false)
  const [onlyDifficult, setOnlyDifficult] = useState(false)

  const difficultQuestions = chapter.questions.filter((question) =>
    isDifficult(state, question.id),
  )

  function start(questions: MultipleChoiceQuestion[], filter: boolean) {
    setSession(prepareQuiz(questions, { shuffleOptions: true }))
    setIndex(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
    setOnlyDifficult(filter)
  }

  function toggleFilter() {
    if (onlyDifficult) {
      start(chapter.questions, false)
    } else {
      start(difficultQuestions, true)
    }
  }

  if (chapter.questions.length === 0) {
    return (
      <div className="card empty-state">
        <p>This chapter has no multiple-choice questions.</p>
      </div>
    )
  }

  if (onlyDifficult && session.length === 0) {
    return (
      <div className="card empty-state">
        <p>No questions are marked as difficult in this chapter yet.</p>
        <button type="button" className="btn" onClick={toggleFilter}>
          Show all questions
        </button>
      </div>
    )
  }

  if (finished) {
    const score = scoreQuiz(answers)
    const incorrect = answers.filter((answer) => !answer.correct)
    const questionById = new Map(chapter.questions.map((q) => [q.id, q]))

    return (
      <section aria-label={`Quiz results for chapter ${chapter.number}`}>
        <div className="card">
          <h2>Quiz complete</h2>
          <div className="score">
            <div>
              <div className="score__value">
                {score.correct} / {score.total}
              </div>
              <div className="score__label">Correct</div>
            </div>
            <div>
              <div className="score__value">{Math.round(score.accuracy * 100)}%</div>
              <div className="score__label">Accuracy</div>
            </div>
            <div>
              <div className="score__value">{incorrect.length}</div>
              <div className="score__label">To review</div>
            </div>
          </div>

          <div className="btn-row">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => start(chapter.questions, false)}
            >
              Retry all questions
            </button>
            {incorrect.length > 0 ? (
              <button
                type="button"
                className="btn"
                onClick={() =>
                  start(
                    incorrect
                      .map((answer) => questionById.get(answer.questionId))
                      .filter((q): q is MultipleChoiceQuestion => Boolean(q)),
                    false,
                  )
                }
              >
                Retry the {incorrect.length} incorrect
              </button>
            ) : null}
          </div>
        </div>

        <div className="section-title">
          <h2>Review</h2>
        </div>
        <ul className="review-list">
          {answers.map((answer, position) => {
            const question = questionById.get(answer.questionId)
            if (!question) return null
            return (
              <li
                key={`${answer.questionId}-${position}`}
                className="review-item"
                data-result={answer.correct ? 'correct' : 'incorrect'}
              >
                <span aria-hidden="true">{answer.correct ? '✓' : '✗'}</span>
                <span>
                  <strong>Q{position + 1}.</strong> {question.prompt}
                  <br />
                  <span className="muted small">
                    Correct answer: {question.options[question.correctIndex]}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  const current = session[index]
  if (!current) {
    return (
      <div className="card empty-state">
        <p>Nothing to practise here yet.</p>
      </div>
    )
  }

  const answered = selected !== null
  const correct = answered && isCorrect(current, selected)
  const markedDifficult = isDifficult(state, current.question.id)

  function onSelect(optionIndex: number) {
    if (selected !== null) return
    setSelected(optionIndex)
    const wasCorrect = isCorrect(current, optionIndex)
    recordAnswer(current.question.id, wasCorrect)
    setAnswers((previous) => [
      ...previous,
      {
        questionId: current.question.id,
        selectedOptionIndex: originalIndexOf(current, optionIndex),
        correct: wasCorrect,
      },
    ])
  }

  function next() {
    if (index + 1 < session.length) {
      setIndex(index + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  return (
    <section aria-label={`Quiz for chapter ${chapter.number}`}>
      <div className="study-toolbar">
        <div className="study-toolbar__group">
          <span className="badge">
            Question {index + 1} of {session.length}
          </span>
          {difficultQuestions.length > 0 ? (
            <span className="badge badge--warn">
              {difficultQuestions.length} difficult
            </span>
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
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => start(chapter.questions, onlyDifficult)}
          >
            Restart
          </button>
        </div>
      </div>

      <div className="card">
        <p className="quiz-prompt">{current.question.prompt}</p>

        <ul className="options">
          {current.options.map((option, optionIndex) => {
            let optionState: 'idle' | 'correct' | 'incorrect' = 'idle'
            if (answered) {
              if (optionIndex === current.correctOptionIndex) optionState = 'correct'
              else if (optionIndex === selected) optionState = 'incorrect'
            }
            return (
              <li key={option.originalIndex}>
                <button
                  type="button"
                  className="option"
                  data-state={optionState}
                  disabled={answered}
                  aria-pressed={selected === optionIndex}
                  onClick={() => onSelect(optionIndex)}
                >
                  <span className="option__key" aria-hidden="true">
                    {OPTION_KEYS[optionIndex] ?? '?'}
                  </span>
                  <span>{option.text}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {answered ? (
          <div
            className={`feedback ${correct ? 'feedback--correct' : 'feedback--incorrect'}`}
            role="status"
          >
            <span className="feedback__title">
              {correct ? '✓ Correct' : '✗ Not quite'}
            </span>
            {current.question.explanation}
            <div className="source-note">
              Source: {current.question.source}
            </div>
          </div>
        ) : (
          <p className="muted small">Choose one answer.</p>
        )}

        <div className="quiz-footer">
          <DifficultButton
            active={markedDifficult}
            onToggle={() => toggleDifficult(current.question.id)}
          />
          <button
            type="button"
            className="btn btn--primary"
            disabled={!answered}
            onClick={next}
          >
            {index + 1 < session.length ? 'Next question →' : 'See results'}
          </button>
        </div>
      </div>
    </section>
  )
}
