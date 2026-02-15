import './WhyFailSection.css'

const items = [
  {
    problem: 'Հիշել թեստերը',
    detail: 'Փոխանցել արագ',
    solution: 'Ամբողջական համակարգ',
    solutionHighlight: true,
  },
  {
    problem: 'Պատահական ուսումնասիրում',
    detail: 'No Structure',
    solution: 'Անձնական ուսումնասիրում',
    solutionHighlight: false,
  },
  {
    problem: 'Քննության վախը',
    detail: 'No Practice',
    solution: 'Իրական քննության սիմուլյացիոն',
    solutionHighlight: false,
  },
]

export function WhyFailSection() {
  return (
    <section className="why-fail">
      <h2 className="why-fail-title">
        <span className="why-fail-line" aria-hidden />
        Ո՞րն է այն պատճառը, որ շատերը ձախողում են վարորդական քննությունը
        <span className="why-fail-line" aria-hidden />
      </h2>
      <div className="why-fail-box">
        {items.map((item) => (
          <div key={item.problem} className="why-fail-column">
            <div className="why-fail-problem">
              {item.problem}
              <span className="why-fail-arrow" aria-hidden>&gt;</span>
            </div>
            <hr className="why-fail-divider" />
            <p className="why-fail-detail">{item.detail}</p>
            <hr className="why-fail-divider" />
            <p className={`why-fail-solution ${item.solutionHighlight ? 'why-fail-solution--highlight' : ''}`}>
              {item.solution}
            </p>
          </div>
        ))}
      </div>
      <p className="why-fail-tagline">
        <span className="why-fail-line" aria-hidden />
        ARTDRIVE-ը սովորեցնում է մտածել ինչպես վարորդ
        <span className="why-fail-line" aria-hidden />
      </p>
    </section>
  )
}
