import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Training', href: '/training' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
]

export function Header() {
  const [query, setQuery] = useState('')
  const location = useLocation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/?q=${encodeURIComponent(query.trim())}`
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          ARTdrive
        </Link>
        <nav className="header-nav">
          <ul className="header-menu">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`header-link ${location.pathname === item.href ? 'header-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <form className="header-search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            className="header-search-input"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <button type="submit" className="header-search-btn" aria-label="Submit search">
            Search
          </button>
        </form>
      </div>
    </header>
  )
}
