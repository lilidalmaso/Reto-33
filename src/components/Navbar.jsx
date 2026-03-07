import { useState } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { to: 'program', label: 'El Programa' },
  { to: 'pricing', label: 'Precio' },
  { to: 'faq', label: 'Preguntas' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          ⬡ KARLA
        </a>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          {navLinks.map(({ to, label }) => (
            <a
              key={to}
              href="#"
              className={styles.link}
              onClick={e => { e.preventDefault(); scrollTo(to); setOpen(false) }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <a href="tel:+34641899336" className={styles.phone}>+34 641 899 336</a>
          <a href="#" className={styles.ctaBtn} onClick={e => { e.preventDefault(); scrollTo('pricing') }}>Únete →</a>
        </div>

        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Navbar
