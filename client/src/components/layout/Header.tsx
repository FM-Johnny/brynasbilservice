import { useState, useEffect, useCallback } from 'react'
import logo1 from '../../assets/images/logo1.jpg'
import { PhoneIcon } from '../icons/PhoneIcon'

type HeaderProps = {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { href: '#tjanster', label: 'Tjänster' },
    { href: '#kontakt', label: 'Kontakt & Öppettider' },
  ]

  return (
    <header className={`site-header${sticky ? ' scrolled' : ''}`} id="site-header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo" aria-label="Brynäs Bilservice">
            <img src={logo1} alt="Brynäs Bilservice" width="220" height="73" className="logo__img" loading="eager" />
          </a>

          <nav aria-label="Huvudnavigation" style={{ marginLeft: 'auto' }}>
            <ul className="nav__links">
              {navLinks.map(l => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="header-cta">
            <a href="tel:0705533395" className="header-phone" aria-label="Ring oss">
              <PhoneIcon />
              070-553 33 95
            </a>
            <button onClick={onBookingClick} className="btn btn--primary">Boka tid</button>
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
          <a href="tel:0705533395" className="btn btn--ghost mb-3 w-full justify-center">
            Ring oss: 070-553 33 95
          </a>
          <button onClick={onBookingClick} className="btn btn--primary w-full justify-center">
            Boka tid
          </button>
        </div>
      </nav>
    </header>
  )
}
