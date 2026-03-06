import { useState } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { to: '#program', label: 'El Programa' },
  { to: '#testimonials', label: 'Testimonios' },
  { to: '#pricing', label: 'Precio' },
  { to: '#faq', label: 'Preguntas' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          ⬡ KARLA
        </a>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          {navLinks.map(({ to, label }) => (
            <a
              key={to}
              href={to}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <a href="tel:+34641899336" className={styles.phone}>+34 641 899 336</a>
          <a href="#pricing" className={styles.ctaBtn}>Únete →</a>
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
