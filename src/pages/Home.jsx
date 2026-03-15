import { useState } from 'react'
import styles from './Home.module.css'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const benefits = [
  { icon: '📅', title: '5 Clases en Vivo', desc: "Sesiones en directo donde aprenderás, preguntarás y avanzarás con acompañamiento real en cada etapa del reto." },
  { icon: '🗓️', title: '33 Días de Reto Diario', desc: "Un desafío diario estructurado durante 33 días para construir hábitos poderosos que transformen tu vida de adentro hacia afuera." },
  { icon: '🌙', title: 'Inducción a los Sueños', desc: "Técnicas de reprogramación nocturna y exploración del subconsciente para que tu mente trabaje por ti incluso mientras duermes. Aprende qué significan tus sueños y úsalos a tu favor." },
  { icon: '🌿', title: 'Ayunos Conscientes', desc: "Protocolo de ayuno guiado para limpiar tu cuerpo, elevar tu energía y potenciar tu enfoque mental." },
  { icon: '7→11', title: 'Metodología 7 – 11', desc: "El sistema exclusivo del Reto 33 que te lleva paso a paso desde donde estás hasta donde quieres llegar, trabajando la inteligencia emocional y el autoconocimiento profundo." },
  { icon: '💬', title: 'Comunidad Abierta', desc: "Acceso a un grupo activo de personas comprometidas con su crecimiento, donde podrás compartir, apoyarte y celebrar tus avances." },
  { icon: '👥', title: 'Mentorías Grupales', desc: "Sesiones de mentoría en grupo para resolver dudas, recibir orientación personalizada y mantenerte enfocado durante todo el proceso." },
]

const faqs = [
  { q: '¿Para quién es este programa?', a: "Para toda persona que siente vacío interno, miedo a avanzar, o que simplemente se pregunta «¿cómo saber quién soy realmente?». No importa tu edad ni de dónde seas — si quieres conocerte y crecer, este programa es para ti." },
  { q: '¿Cuánto tiempo necesito dedicarle cada día?', a: "Con 30 a 45 minutos diarios es suficiente. El programa está diseñado para encajar en un horario ocupado, sin excusas." },
  { q: '¿Qué pasa si no veo resultados?', a: "Ofrecemos garantía total de 30 días. Si no ves cambios, te devolvemos tu inversión completa, sin preguntas ni letra pequeña." },
  { q: '¿Hay seguimiento después del programa?', a: "¡Claro que sí! Conservas el acceso a la comunidad y a todos los recursos después del día 33, para que sigas avanzando sin parar." },
  { q: '¿Este programa ayuda a superar miedos profundos?', a: "Sí. Trabajamos el miedo a equivocarse, el miedo a no poder hacerlo, el miedo a manejar tu propia vida y el miedo a avanzar sin saber cómo. A través de ejercicios de introspección, atención plena y gestión emocional, aprenderás a transformar esos miedos en impulso." },
  { q: '¿Se trabajan las heridas de la infancia?', a: "Absolutamente. Una parte fundamental del Reto 33 es sanar heridas de la infancia y trabajar el amor propio y la autoestima desde la raíz, no desde la superficie." },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqQ} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={styles.faqIcon}>{open ? '−' : '+'}</span>
      </button>
      {open && <p className={styles.faqA}>{a}</p>}
    </div>
  )
}

function Home() {
  return (
    <div className={styles.landing}>

      {/* HERO */}
      <section className={styles.hero}>
        <img src="/chica.webp" alt="Karla, coach de numerología y desarrollo personal en Torrevieja" className={styles.heroImage} fetchPriority="high" width="600" height="900" />
        <div className={styles.shapes} aria-hidden="true">
          <div className={`${styles.shape} ${styles.shapeCircle}`} />
          <div className={`${styles.shape} ${styles.shapeTriangle}`} />
          <div className={`${styles.shape} ${styles.shapeSquare}`} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>⬡ Programa Exclusivo — Plazas Limitadas</p>
          <h1 className={styles.heroTitle}>
            Transforma tu vida<br />
            en <span className={styles.gold}>33 días</span>
          </h1>
          <p className={styles.heroSub}>
            Numerología, autoconocimiento y gestión emocional para dejar de sentir ese vacío interno
            y convertirte en la mejor versión de ti. Desde Torrevieja para todo el mundo.
          </p>
          <div className={styles.heroCta}>
            <a href="#" onClick={e => { e.preventDefault(); scrollTo('pricing') }} className={styles.btnPrimary}>Quiero mi Plaza →</a>
            <a href="#" onClick={e => { e.preventDefault(); scrollTo('program') }} className={styles.btnGhost}>Conocer el programa</a>
          </div>
          {/* Formes géométriques — mobile uniquement */}
          <div className={styles.shapesMobile} aria-hidden="true">
            <div className={`${styles.shape} ${styles.shapeCircle}`} />
            <div className={`${styles.shape} ${styles.shapeTriangle}`} />
            <div className={`${styles.shape} ${styles.shapeSquare}`} />
          </div>
        </div>
      </section>

      {/* URGENCIA */}
      <div className={styles.urgency}>
        <span className={styles.urgencyDot} />
        El próximo ciclo arranca en <strong> 7 días</strong> — Solo quedan <strong> 12 Plazas</strong> disponibles
      </div>

      {/* PROBLEMA */}
      <section className={styles.section} id="problem">
        <div className="container">
          <div className={styles.sectionWithImage}>
            <div className={styles.sectionImageSide}>
              <img src="/relo.webp" alt="El tiempo pasa sin conocerse a uno mismo" className={styles.sectionImage} width="500" height="500" loading="lazy" />
            </div>
            <div className={styles.sectionContentSide}>
              <p className={styles.sectionEyebrow}>¿Te identificas con alguno de estos?</p>
              <h2 className={styles.sectionTitle}>¿Por qué me da miedo<br /><span className={styles.red}>conocerme de verdad?</span></h2>
              <div className={styles.problemGrid}>
                {[
                  "Sientes un vacío interno que no sabes cómo llenar, aunque todo parezca estar bien por fuera",
                  "Te preguntas «¿cómo saber quién soy realmente?» y no encuentras la respuesta",
                  "Tienes miedo a equivocarte, miedo a no poder hacerlo, miedo a avanzar sin saber cómo",
                  "Cargas heridas de la infancia que siguen afectando tus relaciones y tu autoestima hoy",
                ].map((item, i) => (
                  <div key={i} className={styles.problemItem}>
                    <span className={styles.problemX}>✕</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <p className={styles.problemClose}>
                Si te identificas con al menos uno de estos puntos,<br />
                este programa fue creado <span className={styles.gold}>exactamente para ti.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section className={`${styles.section} ${styles.sectionDark}`} id="program">
        <div className="container">
          <div className={styles.sectionWithImageReverse}>
            <div className={styles.sectionContentSide}>
              <p className={styles.sectionEyebrow}>La solución</p>
              <h2 className={styles.sectionTitle}>El <span className={styles.gold}>Reto 33</span> — Así funciona</h2>
              <div className={styles.steps}>
                {[
                  { num: '01', title: 'Autoconocimiento Profundo', desc: "A través de ejercicios de introspección y numerología, descubres quién eres realmente — tus patrones, tus miedos, tu potencial. No hay test de personalidad más poderoso que este proceso." },
                  { num: '02', title: 'Gestión Emocional e Inteligencia Emocional', desc: "Aprenderás a gestionar tus emociones con herramientas concretas — atención plena, meditación guiada y técnicas de psicología holística para sanar desde adentro." },
                  { num: '03', title: 'Amor Propio y Autoestima', desc: "Trabajamos el amor propio, la autoestima y las heridas de la infancia en grupo. La energía colectiva acelera una transformación que sola llevaría años." },
                  { num: '04', title: 'Cambio que Dura', desc: "Al día 33 los nuevos hábitos están grabados en ti. Superarás el miedo a manejar tu propia vida y el miedo a hacer dinero — los resultados son permanentes." },
                ].map((step) => (
                  <div key={step.num} className={styles.step}>
                    <span className={styles.stepNum}>{step.num}</span>
                    <div>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.sectionImageSide}>
              <img src="/numeros.webp" alt="Numerología y autoconocimiento" className={styles.sectionImage} width="500" height="500" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className={styles.section} id="benefits">
        <div className="container">
          <p className={styles.sectionEyebrow}>Lo que recibes</p>
          <h2 className={styles.sectionTitle}>Todo incluido para<br /><span className={styles.gold}>tu transformación</span></h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((b) => (
              <div key={b.title} className={styles.benefitCard}>
                <span className={styles.benefitIcon}>{b.icon}</span>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className={styles.section} id="pricing">
        <div className="container">
          <p className={styles.sectionEyebrow}>Tu inversión</p>
          <h2 className={styles.sectionTitle}>Una sola oferta,<br /><span className={styles.gold}>todo incluido</span></h2>
          <div className={styles.pricingWrapper}>
            <div className={styles.pricingCard}>
              <div className={styles.pricingBadge}>Plazas Limitadas</div>
              <p className={styles.pricingName}>Reto 33 Completo</p>
              <div className={styles.pricingPrice}>
                <span className={styles.pricingAmount}>55</span>
                <span className={styles.pricingCurrency}>€</span>
              </div>
              <p className={styles.pricingLabel}>Inversión Única</p>
              <ul className={styles.pricingList}>
                {[
                  '5 Clases en Vivo',
                  '33 Días de Reto Diario',
                  'Inducción a los Sueños',
                  'Ayunos Conscientes',
                  'Metodología 7 – 11',
                  'Comunidad Abierta',
                  'Mentorías Grupales',
                ].map((item) => (
                  <li key={item} className={styles.pricingItem}>
                    <span className={styles.check}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className={styles.bonusBox}>
                <p className={styles.bonusLabel}>BONO ESPECIAL</p>
                <img src="/libro.webp" alt="Diario Numerológico PDF — diario personal de autoconocimiento" className={styles.bonusImage} width="200" height="200" loading="lazy" />
                <p className={styles.bonusTitle}>📖 Diario Numerológico PDF</p>
                <p className={styles.bonusSub}>Tu diario personal de introspección — incluido sin costo adicional</p>
              </div>
              <a href="https://wa.me/34641899336?text=Hola%2C%20quiero%20unirme%20al%20Reto%2033%20%F0%9F%8C%9F" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary} style={{ display: 'block', textAlign: 'center', marginTop: '2rem' }}>
                Me uno al programa →
              </a>
              <p className={styles.pricingGuarantee}>🔒 Garantía de 7 días sin condiciones</p>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className={`${styles.section} ${styles.sectionDark}`} id="faq">
        <div className="container">
          <p className={styles.sectionEyebrow}>Preguntas frecuentes</p>
          <h2 className={styles.sectionTitle}>Todo lo que necesitas<br /><span className={styles.gold}>saber</span></h2>
          <div className={styles.faqList}>
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.ctaFinal} id="contact">
        <div className={`container ${styles.ctaInner}`}>
          <p className={styles.sectionEyebrow}>La decisión es tuya</p>
          <img src="/infinito.webp" alt="Transformación personal con numerología en Torrevieja" className={styles.ctaImage} width="400" height="400" loading="lazy" />
          <h2 className={styles.ctaTitle}>En 33 días,<br />todo puede cambiar</h2>
          <p className={styles.ctaSub}>Deja de preguntarte «¿por qué siento este vacío?» y empieza a construir la vida que mereces. El autoconocimiento, la gestión emocional y el amor propio no son un lujo — son tu derecho.</p>
          <a href="https://wa.me/34641899336?text=Hola%2C%20quiero%20unirme%20al%20Reto%2033%20%F0%9F%8C%9F" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Empieza este Juego ahora →</a>
          <p className={styles.ctaNote}>Garantía de devolución a 30 días · Acceso inmediato · Torrevieja y todo el mundo</p>
          <div className={styles.ctaShapes}>
            <svg className={`${styles.ctaShape} ${styles.ctaShapeGold}`} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="3"/>
            </svg>
            <svg className={`${styles.ctaShape} ${styles.ctaShapeGold}`} viewBox="0 0 60 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="30,3 57,53 3,53" stroke="currentColor" strokeWidth="3"/>
            </svg>
            <svg className={`${styles.ctaShape} ${styles.ctaShapeGold}`} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="52" height="52" stroke="currentColor" strokeWidth="3"/>
            </svg>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
