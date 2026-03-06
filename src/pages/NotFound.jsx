import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.content}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.desc}>Esta página no existe o fue movida.</p>
        <Link to="/" className={styles.back}>← Volver al inicio</Link>
      </div>
    </section>
  )
}

export default NotFound
