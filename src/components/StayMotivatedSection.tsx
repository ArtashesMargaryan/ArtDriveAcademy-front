import './StayMotivatedSection.css'

const leaderboard = [
  { rank: 1, name: 'Alex', score: null, color: 'gold' },
  { rank: 2, name: 'Sam', score: null, color: 'silver' },
  { rank: 3, name: 'Mia', score: '4102', color: 'bronze' },
]

export function StayMotivatedSection() {
  return (
    <section className="stay-motivated">
      <h2 className="stay-motivated-title">
        <span className="stay-motivated-line" aria-hidden />
        Stay Motivated & Level Up!
        <span className="stay-motivated-line" aria-hidden />
      </h2>

      <div className="stay-motivated-grid">
        {/* XP & Progress */}
        <div className="stay-panel stay-panel-xp">
          <div className="stay-xp-row">
            <span className="stay-xp-icon" aria-hidden>★</span>
            <span className="stay-xp-value">XP +1250</span>
          </div>
          <div className="stay-progress-wrap">
            <div className="stay-progress-bar">
              <div className="stay-progress-fill" style={{ width: '65%' }} />
              <span className="stay-progress-label stay-progress-level">Level 5</span>
              <span className="stay-progress-label stay-progress-title">Pro Driver</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="stay-panel stay-panel-badges">
          <h3 className="stay-panel-heading">New Badge Unlocked!</h3>
          <div className="stay-badges">
            <div className="stay-badge stay-badge--car" title="Car badge">
              <span className="stay-badge-icon">🚗</span>
            </div>
            <div className="stay-badge stay-badge--check" title="Check badge">
              <span className="stay-badge-icon">✓</span>
            </div>
            <div className="stay-badge stay-badge--trophy" title="Trophy badge">
              <span className="stay-badge-icon">🏆</span>
            </div>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="stay-panel stay-panel-streak">
          <h3 className="stay-panel-heading stay-panel-heading--with-icon">
            <span className="stay-streak-moon" aria-hidden>🌙</span>
            Learning Streak <strong>15</strong> Days
          </h3>
          <div className="stay-streak-icons">
            <div className="stay-streak-icon" title="Flame">🔥</div>
            <div className="stay-streak-icon" title="Streak">🕯️</div>
            <div className="stay-streak-icon" title="Progress">📈</div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="stay-panel stay-panel-leaderboard">
          <h3 className="stay-panel-heading stay-panel-heading--with-icon">
            <span className="stay-leaderboard-coin" aria-hidden>🪙</span>
            Leaderboard
          </h3>
          <ul className="stay-leaderboard-list">
            {leaderboard.map((entry) => (
              <li key={entry.rank} className="stay-leaderboard-item">
                <span className={`stay-leaderboard-rank stay-leaderboard-rank--${entry.color}`}>
                  {entry.rank}
                </span>
                <span className="stay-leaderboard-avatar" aria-hidden />
                <span className="stay-leaderboard-name">{entry.name}</span>
                {entry.score ? (
                  <span className="stay-leaderboard-score">{entry.score}</span>
                ) : (
                  <span className="stay-leaderboard-badge" aria-hidden>★</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
