import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <span className={styles.logo}>⬡ KARLA</span>

        <div className={styles.shapes}>
          <svg className={styles.shape} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="3"/>
          </svg>
          <svg className={styles.shape} viewBox="0 0 60 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,3 57,53 3,53" stroke="currentColor" strokeWidth="3"/>
          </svg>
          <svg className={styles.shape} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="52" height="52" stroke="currentColor" strokeWidth="3"/>
          </svg>
        </div>

        <span className={styles.copy}>© {new Date().getFullYear()} Karla — Todos los derechos reservados</span>

      </div>
    </footer>
  )
}

export default Footer
