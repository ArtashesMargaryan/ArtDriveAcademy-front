import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import trainingData from '../data.json'
import './Training.css'

type QuestionItem = {
  question_text: string
  options: string[]
  answer?: string
}

function getQuestions(): QuestionItem[] {
  const list: QuestionItem[] = []
  for (const item of trainingData as unknown[]) {
    const obj = item as { questions?: QuestionItem[]; question_text?: string; options?: string[]; answer?: string }
    if (obj.questions) {
      list.push(...obj.questions)
    } else if (obj.question_text && Array.isArray(obj.options)) {
      list.push({
        question_text: obj.question_text,
        options: obj.options,
        answer: obj.answer,
      })
    }
  }
  return list
}

const TRAINING_SECONDS = 3 * 60 // 3 minutes

export function Training() {
  const questions = useMemo(() => getQuestions(), [])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [secondsLeft, setSecondsLeft] = useState(TRAINING_SECONDS)
  const [isRunning, setIsRunning] = useState(true)
  const [finished, setFinished] = useState(false)

  const question = questions[index]
  const total = questions.length

  useEffect(() => {
    if (!isRunning || finished) return
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setFinished(true)
          setIsRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [isRunning, finished])

  const handleSelect = (optionIndex: number) => {
    setSelected(optionIndex)
    setAnswers((prev) => ({ ...prev, [index]: optionIndex }))
  }

  const handleNext = () => {
    if (index < total - 1) {
      setIndex((i) => i + 1)
      setSelected(answers[index + 1] ?? null)
    } else {
      setFinished(true)
      setIsRunning(false)
    }
  }

  const handlePrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1)
      setSelected(answers[index - 1] ?? null)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (questions.length === 0) {
    return (
      <div className="training-page">
        <div className="training-empty">
          <p>No questions available.</p>
          <Link to="/" className="training-back">← Back to home</Link>
        </div>
      </div>
    )
  }

  if (finished) {
    const answered = Object.keys(answers).length
    return (
      <div className="training-page">
        <div className="training-finished">
          <h2 className="training-finished-title">Mini-test complete</h2>
          <p className="training-finished-stats">
            You answered <strong>{answered}</strong> of <strong>{total}</strong> questions
            {secondsLeft === 0 && ' — time is up!'}
          </p>
          <Link to="/" className="training-cta">Back to home</Link>
          <Link to="/training" className="training-cta training-cta--secondary" onClick={() => window.location.reload()}>
            Try again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="training-page">
      <div className="training-header">
        <Link to="/" className="training-logo">ARTdrive</Link>
        <div className="training-timer" aria-live="polite">
          <span className="training-timer-label">Time left</span>
          <span className={`training-timer-value ${secondsLeft <= 60 ? 'training-timer-value--low' : ''}`}>
            {formatTime(secondsLeft)}
          </span>
        </div>
      </div>

      <div className="training-progress-wrap">
        <div
          className="training-progress-fill"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
        <span className="training-progress-text">
          Question {index + 1} of {total}
        </span>
      </div>

      <article className="training-card">
        <h2 className="training-question">{question.question_text}</h2>
        <div className="training-options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              className={`training-option ${selected === i ? 'training-option--selected' : ''}`}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="training-actions">
          <button
            type="button"
            className="training-btn training-btn--prev"
            onClick={handlePrev}
            disabled={index === 0}
          >
            ← Previous
          </button>
          <button
            type="button"
            className="training-btn training-btn--next"
            onClick={handleNext}
          >
            {index < total - 1 ? 'Next →' : 'Finish'}
          </button>
        </div>
      </article>
    </div>
  )
}
