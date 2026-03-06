import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a
          href="#"
          className={styles.logo}
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          ⬡ KARLA
        </a>
        <span className={styles.copy}>© {new Date().getFullYear()} Karla — Todos los derechos reservados</span>
      </div>
    </footer>
  )
}

export default Footer
