import styles from './About.module.css'

function About() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>Sobre nosotros</h1>
        <p className={styles.text}>
          Somos un equipo comprometido con tu transformación personal. Añade aquí tu historia, tu misión y lo que te diferencia.
        </p>
      </div>
    </section>
  )
}

export default About
