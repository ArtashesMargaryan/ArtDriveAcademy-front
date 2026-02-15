import { useState } from 'react'
import './HowItWorksSection.css'

const steps = [
  {
    number: 1,
    title: 'Որոշիր օրական ժամանակը',
    graphic: 'calendar',
  },
  {
    number: 2,
    title: 'Մասնակցել 3 րոպեանոց թեստին',
    graphic: 'robot',
  },
  {
    number: 3,
    title: 'Արհեստական բանականության անձնական մարզիչ',
    graphic: 'progress',
  },
  {
    number: 4,
    title: 'Ստանալ ուսուցման պլանը',
    graphic: 'chart',
  },
]

function monthKey(year: number, month: number) {
  return `${year}-${month}`
}

function CalendarGraphic() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const [baseYear, setBaseYear] = useState(currentYear)
  const [baseMonth, setBaseMonth] = useState(currentMonth)
  const [freeDaysByMonth, setFreeDaysByMonth] = useState<Record<string, Set<number>>>(() => ({
    [monthKey(currentYear, currentMonth)]: new Set([9, 10]),
  }))
  const [selectedByMonth, setSelectedByMonth] = useState<Record<string, number | null>>(() => ({
    [monthKey(currentYear, currentMonth)]: 10,
  }))

  const goPrev = () => {
    if (baseMonth === 0) {
      setBaseYear((y) => y - 1)
      setBaseMonth(11)
    } else {
      setBaseMonth((m) => m - 1)
    }
  }

  const goNext = () => {
    if (baseMonth === 11) {
      setBaseYear((y) => y + 1)
      setBaseMonth(0)
    } else {
      setBaseMonth((m) => m + 1)
    }
  }

  const toggleDay = (day: number, year: number, month: number) => {
    const key = monthKey(year, month)
    setFreeDaysByMonth((prev) => {
      const set = prev[key] ? new Set(prev[key]) : new Set<number>()
      if (set.has(day)) {
        set.delete(day)
        setSelectedByMonth((s) => ({
          ...s,
          [key]: s[key] === day ? (set.size ? Math.min(...set) : null) : s[key],
        }))
      } else {
        set.add(day)
        setSelectedByMonth((s) => ({ ...s, [key]: day }))
      }
      return { ...prev, [key]: set }
    })
  }

  const monthsToShow = [0, 1, 2].map((i) => {
    const m = baseMonth + i
    const y = baseYear + Math.floor(m / 12)
    const month = m % 12
    return { year: y, month }
  })

  return (
    <div className="how-graphic how-graphic-calendar">
      <div className="how-calendar-spine" aria-hidden />
      <div className="how-calendar-nav">
        <button
          type="button"
          className="how-calendar-nav-btn"
          onClick={goPrev}
          aria-label="Previous months"
        >
        prev
        </button>
        <span className="how-calendar-nav-label" title={`${monthsToShow[0].year}`}>
          {monthsToShow.map(({ year, month }) => new Date(year, month).toLocaleString('default', { month: 'short' })).join(' → ')}
        </span>
        <button
          type="button"
          className="how-calendar-nav-btn"
          onClick={goNext}
          aria-label="Next months"
        >
         next
        </button>
      </div>
      <div className="how-calendar-three">
        {monthsToShow.map(({ year, month }) => {
          const key = monthKey(year, month)
          const daysInMonth = new Date(year, month + 1, 0).getDate()
          const firstWeekday = new Date(year, month, 1).getDay()
          const freeDays = freeDaysByMonth[key] ?? new Set<number>()
          const selectedDay = selectedByMonth[key] ?? null
          const emptySlots = Array.from({ length: firstWeekday }, (_, i) => i)
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
          const monthName = new Date(year, month).toLocaleString('default', { month: 'short' })

          return (
            <div key={key} className="how-calendar-month-block">
              <div className="how-calendar-month-title">{monthName}</div>
              <div className="how-calendar-weekdays">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <span key={i} className="how-calendar-weekday">{d}</span>
                ))}
              </div>
              <div className="how-calendar-grid">
                {emptySlots.map((i) => (
                  <span key={`e-${i}`} className="how-calendar-day how-calendar-day--empty" />
                ))}
                {days.map((day) => {
                  const isFree = freeDays.has(day)
                  const isSelected = selectedDay === day
                  return (
                    <button
                      key={day}
                      type="button"
                      className={`how-calendar-day ${isFree ? 'how-calendar-day--free' : ''} ${isSelected ? 'how-calendar-day--selected' : ''}`}
                      onClick={() => toggleDay(day, year, month)}
                      aria-pressed={isSelected}
                      aria-label={isSelected ? `Selected ${day}` : isFree ? `Free ${day}` : `Day ${day}`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StepGraphic({ type }: { type: string }) {
  if (type === 'calendar') {
    return <CalendarGraphic />
  }
  if (type === 'robot') {
    return (
      <div className="how-graphic how-graphic-robot" aria-hidden>
        <div className="how-robot-head">
          <div className="how-robot-eyes">
            <span className="how-robot-eye" />
            <span className="how-robot-eye" />
          </div>
        </div>
        <div className="how-robot-body" />
        <div className="how-robot-bars">
          {[40, 65, 50, 80, 60].map((h, i) => (
            <div key={i} className="how-robot-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    )
  }
  if (type === 'progress') {
    return (
      <div className="how-graphic how-graphic-progress" aria-hidden>
        <div className="how-progress-ring">
          <svg viewBox="0 0 36 36">
            <path
              className="how-progress-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="how-progress-fill"
              strokeDasharray="85, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="how-progress-value">85%</span>
        </div>
        <p className="how-progress-label">Progress</p>
      </div>
    )
  }
  if (type === 'chart') {
    return (
      <div className="how-graphic how-graphic-chart" aria-hidden>
        <svg viewBox="0 0 120 60" className="how-line-chart">
          <polyline
            points="10,45 35,38 55,28 75,22 95,15 110,8"
            className="how-line-chart-line"
          />
          <circle cx="10" cy="45" r="3" className="how-line-chart-dot" />
          <circle cx="35" cy="38" r="3" className="how-line-chart-dot" />
          <circle cx="55" cy="28" r="3" className="how-line-chart-dot" />
          <circle cx="75" cy="22" r="3" className="how-line-chart-dot" />
          <circle cx="95" cy="15" r="3" className="how-line-chart-dot" />
          <circle cx="110" cy="8" r="3" className="how-line-chart-dot" />
        </svg>
      </div>
    )
  }
  return null
}

export function HowItWorksSection() {
  const [index, setIndex] = useState(0)

  const goPrev = () => setIndex((i) => (i === 0 ? steps.length - 1 : i - 1))
  const goNext = () => setIndex((i) => (i === steps.length - 1 ? 0 : i + 1))

  return (
    <section className="how-it-works">
      <h2 className="how-it-works-title">Քո ուսուցման ճանապարհը ARTDRIVE-ում</h2>
      <div className="how-it-works-underline" aria-hidden />

      <div className="how-carousel">
        <button
          type="button"
          className="how-carousel-btn how-carousel-btn--prev"
          onClick={goPrev}
          aria-label="Previous step"
        >
          ‹
        </button>

        <div className="how-carousel-track">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`how-card ${i === index ? 'how-card--active' : ''}`}
              aria-hidden={i !== index}
            >
              <div className="how-card-header">
                <span className="how-card-number">{step.number}</span>
                <h3 className="how-card-title">{step.title}</h3>
              </div>
              <div className="how-card-graphic">
                <StepGraphic type={step.graphic} />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="how-carousel-btn how-carousel-btn--next"
          onClick={goNext}
          aria-label="Next step"
        >
          ›
        </button>
      </div>

      <div className="how-dots">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`how-dot ${i === index ? 'how-dot--active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to step ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>

      <a href="#training" className="how-cta">
        Try Your First Mini-Test »
      </a>
    </section>
  )
}
