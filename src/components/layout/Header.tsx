import { useState, useEffect, useCallback } from 'react'
import logo1 from '../../assets/images/logo1.jpg'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { href: '#hem', label: 'Hem' },
    { href: '#tjanster', label: 'Tjänster' },
    { href: '#alla-tjanster', label: 'Alla tjänster' },
    { href: '#om-oss', label: 'Om oss' },
    { href: '#kontakt', label: 'Kontakt & Öppettider' },
  ]

  return (
    <header className={`site-header${sticky ? ' scrolled' : ''}`} id="site-header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo" aria-label="Brynäs Bilservice">
            <img src={logo1} alt="Brynäs Bilservice" width="220" height="73" className="logo__img" loading="eager" />
          </a>

          <nav aria-label="Huvudnavigation">
            <ul className="nav__links">
              {navLinks.map(l => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="header-cta">
            <a href="tel:0705533395" className="header-phone" aria-label="Ring oss">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.04z"/>
              </svg>
              070-553 33 95
            </a>
            <a href="#kontakt" className="btn btn--primary">Boka tid</a>
          </div>

          <button
            className={`nav-toggle${menuOpen ? ' active' : ''}`}
            id="nav-toggle"
            aria-label="Öppna meny"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} id="mobile-nav" aria-label="Mobilnavigation">
        <ul>
          {navLinks.map(l => (
            <li key={l.href}><a href={l.href} onClick={closeMenu}>{l.label}</a></li>
          ))}
        </ul>
        <div className="mobile-cta">
          <a href="tel:0705533395" className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
            Ring oss: 070-553 33 95
          </a>
          <a href="#kontakt" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} onClick={closeMenu}>
            Boka tid
          </a>
        </div>
      </nav>
    </header>
  )
}
