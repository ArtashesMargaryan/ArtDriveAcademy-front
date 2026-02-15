import './Footer.css'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            ARTdrive
          </a>
          <p className="footer-tagline">
            Your creative drive.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <ul className="footer-menu">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="footer-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} ARTdrive. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
