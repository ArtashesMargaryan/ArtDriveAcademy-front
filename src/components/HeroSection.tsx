import './HeroSection.css'

const features = [
  'Քեզ հարմարեցված կարճ թեստեր',
  'Քննության իրական փորձարկում',
  'Արհեստական բանականության անձնական մարզիչ',
  'Իրական վարելու հմտություններ',
]

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">
          Ինչու են շատերը   <span className="hero-title-accent">ձախողում</span>
            {' '}
            վարորդական  քննությունը
          </h1>
          <p className="hero-subtitle">
          Օրական ընդամենը 3 րոպե — և դու պատրաստ ես իրական քննությանը
          </p>
          <ul className="hero-features">
            {features.map((label) => (
              <li key={label}>
                <span className="hero-check" aria-hidden>✓</span>
                {label}
              </li>
            ))}
          </ul>
          <div className="hero-cta">
            <a href="/training" className="hero-btn">
            Սկսիր 3 րոպեանոց թեստ
            </a>
            <a href="#how-it-works" className="hero-link">
            Տեսնես ինչպես է աշխատում »
            </a>
          </div>
        </div>
        <div className="hero-phones" aria-hidden>
          <div className="hero-phone hero-phone-left" />
          <div className="hero-phone hero-phone-center" />
          <div className="hero-phone hero-phone-right" />
        </div>
      </div>
      <p className="hero-tagline">Մասնակցես ապագա վարորդների համակարգին, որը ձախողում է իրական ճանապարհի անվտանգությունը։</p>
    </section>
  )
}
