import { useState } from 'react'
import styles from './Home.module.css'
import imgChica from '/chica.webp'
import imgRelo from '/relo.webp'
import imgNumeros from '/numeros.webp'
import imgLibro from '/libro.webp'
import imgInfinito from '/infinito.webp'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const benefits = [
  { icon: '📅', title: '5 Clases en Vivo', desc: "Sesiones en directo donde aprenderás, preguntarás y avanzarás con acompañamiento real en cada etapa del reto." },
  { icon: '🗓️', title: '33 Días de Reto Diario', desc: "Un desafío diario estructurado durante 33 días para construir hábitos poderosos que transformen tu vida de adentro hacia afuera." },
  { icon: '🌙', title: 'Inducción a los Sueños', desc: "Técnicas de reprogramación nocturna para que tu mente trabaje por ti incluso mientras duermes." },
  { icon: '🌿', title: 'Ayunos Conscientes', desc: "Protocolo de ayuno guiado para limpiar tu cuerpo, elevar tu energía y potenciar tu enfoque mental." },
  { icon: '7→11', title: 'Metodología 7 – 11', desc: "El sistema exclusivo del Reto 33 que te lleva paso a paso desde donde estás hasta donde quieres llegar." },
  { icon: '💬', title: 'Comunidad Abierta', desc: "Acceso a un grupo activo de personas comprometidas con su crecimiento, donde podrás compartir, apoyarte y celebrar tus avances." },
  { icon: '👥', title: 'Mentorías Grupales', desc: "Sesiones de mentoría en grupo para resolver dudas, recibir orientación personalizada y mantenerte enfocado durante todo el proceso." },
]

const testimonials = [
  { name: 'Sofía M.', role: 'Emprendedora, Bogotá', text: "En menos de tres semanas vi un cambio brutal en mi vida. Este método me dio la claridad que llevaba años buscando. ¡No me arrepiento para nada!", stars: 5 },
  { name: 'Carlos R.', role: 'Consultor, Medellín', text: "La mejor plata que he invertido este año, ¡sin duda! Todo es concreto, directo al grano. Lo recomiendo a todo el mundo.", stars: 5 },
  { name: 'Alejandra T.', role: 'Coach, Cali', text: "Al principio estaba escéptica, pero desde la primera semana los resultados me dejaron sin palabras. ¡Esto sí funciona de verdad!", stars: 5 },
]

const faqs = [
  { q: '¿Para quién es este programa?', a: "Este programa es para toda persona con ganas de crecer y obtener resultados concretos, dispuesta a comprometerse durante 33 días. No importa de dónde seas ni en qué etapa estés." },
  { q: '¿Cuánto tiempo necesito dedicarle cada día?', a: "Con 30 a 45 minutos diarios es suficiente. El programa está diseñado para encajar en un horario ocupado, sin excusas." },
  { q: '¿Qué pasa si no veo resultados?', a: "Ofrecemos garantía total de 30 días. Si no ves cambios, te devolvemos tu inversión completa, sin preguntas ni letra pequeña." },
  { q: '¿Hay seguimiento después del programa?', a: "¡Claro que sí! Conservas el acceso a la comunidad y a todos los recursos después del día 33, para que sigas avanzando sin parar." },
]

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={styles.star}>★</span>
      ))}
    </div>
  )
}

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
        <div className={styles.shapes} aria-hidden="true">
          <div className={`${styles.shape} ${styles.shapeCircle}`} />
          <div className={`${styles.shape} ${styles.shapeSquare}`} />
          <div className={`${styles.shape} ${styles.shapeTriangle}`} />
        </div>
        <img src={imgChica} alt="" className={styles.heroImage} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>⬡ Programa Exclusivo — Cupos Limitados</p>
          <h1 className={styles.heroTitle}>
            Transforma tu vida<br />
            en <span className={styles.gold}>33 días</span>
          </h1>
          <p className={styles.heroSub}>
            El método intensivo que ya cambió la vida de más de 500 personas en Latinoamérica.
            Únete al próximo ciclo y descubre todo lo que eres capaz de lograr.
          </p>
          <div className={styles.heroCta}>
            <a href="#" onClick={e => { e.preventDefault(); scrollTo('pricing') }} className={styles.btnPrimary}>Quiero mi cupo →</a>
            <a href="#" onClick={e => { e.preventDefault(); scrollTo('program') }} className={styles.btnGhost}>Conocer el programa</a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}><span className={styles.statNum}>500+</span><span className={styles.statLabel}>Participantes</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>33</span><span className={styles.statLabel}>Días</span></div>
            <div className={styles.statDivider} />
            <div className={styles.stat}><span className={styles.statNum}>97%</span><span className={styles.statLabel}>Satisfechos</span></div>
          </div>
        </div>
      </section>

      {/* URGENCIA */}
      <div className={styles.urgency}>
        <span className={styles.urgencyDot} />
        El próximo ciclo arranca en <strong> 7 días</strong> — Solo quedan <strong> 12 cupos</strong> disponibles
      </div>

      {/* PROBLEMA */}
      <section className={styles.section} id="problem">
        <div className="container">
          <div className={styles.sectionWithImage}>
            <div className={styles.sectionImageSide}>
              <img src={imgRelo} alt="El tiempo pasa" className={styles.sectionImage} />
            </div>
            <div className={styles.sectionContentSide}>
              <p className={styles.sectionEyebrow}>¿Te identificas con alguno de estos?</p>
              <h2 className={styles.sectionTitle}>Llevas demasiado tiempo<br /><span className={styles.red}>sin avanzar de verdad</span></h2>
              <div className={styles.problemGrid}>
                {[
                  "Sabes lo que quieres pero no sabes por dónde empezar ni cómo arrancar",
                  "Ya probaste métodos que no funcionaron y no quieres volver a equivocarte",
                  "Te sientes solo frente a tus metas y nadie a tu alrededor te entiende",
                  "Cada semana parece igual a la anterior y el tiempo sigue pasando sin cambios",
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
                  { num: '01', title: 'Diagnóstico Personalizado', desc: "Desde el primer día identificas exactamente dónde estás y hacia dónde quieres ir. Nada genérico — un plan hecho a tu medida." },
                  { num: '02', title: 'Método por Bloques', desc: "11 bloques de 3 días, cada uno enfocado en un aspecto puntual de tu transformación. Acción concreta cada día, sin agobios." },
                  { num: '03', title: 'Comunidad Activa', desc: "Te unes a un grupo de personas con los mismos objetivos. La energía colectiva multiplica tus resultados de una forma brutal." },
                  { num: '04', title: 'Cambio que Dura', desc: "Al día 33 no vuelves a cero. Los nuevos hábitos ya están grabados en ti y los resultados son permanentes. Eso es lo que buscamos." },
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
              <img src={imgNumeros} alt="Numerología" className={styles.sectionImage} />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className={styles.section} id="benefits">
        <div className="container">
          <p className={styles.sectionEyebrow}>Lo que recibes</p>
          <h2 className={styles.sectionTitle}>Todo incluido para<br /><span className={styles.gold}>tu éxito</span></h2>
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

      {/* TESTIMONIOS */}
      <section className={`${styles.section} ${styles.sectionDark}`} id="testimonials">
        <div className="container">
          <p className={styles.sectionEyebrow}>Ellos ya lo vivieron</p>
          <h2 className={styles.sectionTitle}>Lo que dicen<br /><span className={styles.gold}>nuestros participantes</span></h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <Stars count={t.stars} />
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.name[0]}</div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                </div>
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
              <div className={styles.pricingBadge}>Cupos Limitados</div>
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
                <img src={imgLibro} alt="Diario Numerológico" className={styles.bonusImage} />
                <p className={styles.bonusTitle}>📖 Diario Numerológico PDF</p>
                <p className={styles.bonusSub}>Incluido sin costo adicional</p>
              </div>
              <a href="https://wa.me/34641899336?text=Hola%2C%20quiero%20unirme%20al%20Reto%2033%20%F0%9F%8C%9F" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary} style={{ display: 'block', textAlign: 'center', marginTop: '2rem' }}>
                Me uno al programa →
              </a>
              <p className={styles.pricingGuarantee}>🔒 Pago seguro · Garantía de 30 días sin condiciones</p>
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
          <img src={imgInfinito} alt="Infinito" className={styles.ctaImage} />
          <h2 className={styles.ctaTitle}>En 33 días,<br />todo puede cambiar</h2>
          <p className={styles.ctaSub}>La única diferencia entre donde estás hoy y donde quieres estar es la decisión que tomas en este momento. No la sigas aplazando.</p>
          <a href="https://wa.me/34641899336?text=Hola%2C%20quiero%20unirme%20al%20Reto%2033%20%F0%9F%8C%9F" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Quiero mi cupo ahora →</a>
          <p className={styles.ctaNote}>Garantía de devolución a 30 días · Acceso inmediato</p>
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
