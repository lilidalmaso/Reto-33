import { useEffect, useRef } from 'react'

export default function BubblesCanvas() {
  const canvasBgRef = useRef(null)

  useEffect(() => {
    const canvasBg = canvasBgRef.current
    const ctx = canvasBg.getContext('2d')
    let animId
    let W, H
    let bubbles = []
    let particles = []
    let frameCount = 0

    let state = 'idle'
    let idleTimer = null
    const IDLE_DELAY = 5000

    const NUMBERS = ['1','2','3','4','5','6','7','8','9','11','22','33']

    function spawnPopParticles(cx, cy, r, col) {
      const count = Math.floor(8 + r * 0.4)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
        const speed = (1.5 + Math.random() * 3) * (r / 40)
        const size = 1.5 + Math.random() * 3
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size, col, alpha: 1,
          decay: 0.025 + Math.random() * 0.02,
        })
      }
      particles.push({
        x: cx, y: cy,
        ring: true,
        r: r * 0.8,
        maxR: r * 2.2,
        col, alpha: 0.7,
        decay: 0.04,
      })
    }

    function popBubble(b) {
      if (b.popping) return
      b.popping = true
      b.popProgress = 0
      spawnPopParticles(b.x, b.y, b.r, b.col)
    }

    function triggerPopAll() {
      if (state === 'hidden') return
      clearTimeout(idleTimer)
      const sorted = [...bubbles].filter(b => !b.popping)
      sorted.sort((a, b) => a.y - b.y)
      sorted.forEach((b, i) => {
        setTimeout(() => popBubble(b), i * 80)
      })
      const totalDelay = sorted.length * 80 + 800
      state = 'popping'
      setTimeout(() => {
        bubbles = []
        state = 'hidden'
        idleTimer = setTimeout(triggerSpawn, IDLE_DELAY)
      }, totalDelay)
    }

    function triggerSpawn() {
      if (state !== 'hidden') return
      state = 'spawning'
      let count = 0
      const total = 11
      const interval = setInterval(() => {
        if (count >= total) { clearInterval(interval); state = 'idle'; return }
        bubbles.push(mkBubble(false))
        count++
      }, 11)
    }

    // ── Gestion des clics ────────────────────────────────────────────────────
    function handleClick(e) {
      if (state === 'hidden') {
        clearTimeout(idleTimer)
        idleTimer = setTimeout(triggerSpawn, IDLE_DELAY)
        return
      }

      const clientX = e.clientX ?? e.touches?.[0]?.clientX
      const clientY = e.clientY ?? e.touches?.[0]?.clientY

      if (clientX === undefined) { triggerPopAll(); return }

      // Cherche une bulle sous le curseur
      let hitBubble = null
      for (const b of bubbles) {
        if (b.popping) continue
        const dx = b.x - clientX
        const dy = b.y - clientY
        if (Math.sqrt(dx*dx + dy*dy) <= b.r) {
          hitBubble = b
          break
        }
      }

      if (hitBubble) {
        // Clic direct sur une bulle → pop individuel
        popBubble(hitBubble)
      } else {
        // Clic ailleurs (bouton, lien, n'importe où) → pop toutes
        triggerPopAll()
      }
    }

    // Écoute sur window pour capturer TOUS les clics (boutons, liens, partout)
    window.addEventListener('click', handleClick)
    window.addEventListener('touchstart', handleClick, { passive: true })

    // ── Curseur intelligent : pointer si bulle sous la souris ────────────────
    function handleMouseMove(e) {
      let onBubble = false
      for (const b of bubbles) {
        if (b.popping) continue
        const dx = b.x - e.clientX
        const dy = b.y - e.clientY
        if (Math.sqrt(dx*dx + dy*dy) <= b.r) { onBubble = true; break }
      }
      canvasBg.style.pointerEvents = onBubble ? 'auto' : 'none'
      canvasBg.style.cursor = onBubble ? 'pointer' : 'default'
    }
    window.addEventListener('mousemove', handleMouseMove)

    function getNavbarHeight() {
      const nav = document.querySelector('header')
      if (nav) return nav.getBoundingClientRect().bottom
      return 64
    }

    function resize() {
      W = canvasBg.width = window.innerWidth
      H = canvasBg.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const WIN7_COLORS = [
      { h: 300, s: 70, l: 72 },
      { h: 280, s: 75, l: 68 },
      { h: 195, s: 80, l: 65 },
      { h: 170, s: 75, l: 62 },
      { h: 110, s: 65, l: 62 },
      { h: 55,  s: 85, l: 65 },
      { h: 330, s: 70, l: 70 },
      { h: 0,   s: 65, l: 72 },
    ]

    function mkBubble(randomY = false) {
      const r = 22 + Math.random() * 45
      const col = WIN7_COLORS[Math.floor(Math.random() * WIN7_COLORS.length)]
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5
      const speed = 2.5 + Math.random() * 1.5
      const number = NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
      return {
        x: r + Math.random() * (W - r * 2),
        y: randomY ? Math.random() * H : H + r + Math.random() * 50,
        r, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, col,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.008 + Math.random() * 0.01,
        wobbleAmp: 0.3 + Math.random() * 0.4,
        popping: false, popProgress: 0,
        number,
      }
    }

    for (let i = 0; i < 11; i++) bubbles.push(mkBubble(true))

    function drawBubble(ctx, cx, cy, r, col, alpha, number) {
      if (alpha === undefined) alpha = 1
      const { h, s, l } = col
      ctx.save()

      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      const body = ctx.createRadialGradient(cx, cy - r*0.2, r*0.1, cx, cy + r*0.3, r)
      body.addColorStop(0,   'hsla('+h+','+s+'%,'+(l+20)+'%,'+(0.15*alpha)+')')
      body.addColorStop(0.7, 'hsla('+h+','+s+'%,'+l+'%,'+(0.22*alpha)+')')
      body.addColorStop(1,   'hsla('+h+','+s+'%,'+(l-10)+'%,'+(0.35*alpha)+')')
      ctx.fillStyle = body
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      const bG = ctx.createLinearGradient(cx-r, cy-r, cx+r, cy+r)
      bG.addColorStop(0,   'hsla('+h+','+s+'%,'+(l+15)+'%,'+(0.9*alpha)+')')
      bG.addColorStop(0.3, 'hsla('+((h+40)%360)+','+s+'%,'+(l+10)+'%,'+(0.75*alpha)+')')
      bG.addColorStop(0.6, 'hsla('+((h+90)%360)+','+s+'%,'+l+'%,'+(0.65*alpha)+')')
      bG.addColorStop(1,   'hsla('+((h+160)%360)+','+s+'%,'+(l-5)+'%,'+(0.8*alpha)+')')
      ctx.strokeStyle = bG
      ctx.lineWidth = Math.max(1.5, r * 0.045)
      ctx.stroke()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.98, 0, Math.PI * 2)
      ctx.clip()
      ctx.save()
      ctx.translate(cx - r*0.28, cy - r*0.28)
      ctx.rotate(-Math.PI / 5)
      ctx.scale(1, 0.55)
      const reflet = ctx.createRadialGradient(0, 0, 0, 0, 0, r*0.38)
      reflet.addColorStop(0,    'rgba(255,255,255,'+(0.85*alpha)+')')
      reflet.addColorStop(0.4,  'rgba(255,255,255,'+(0.45*alpha)+')')
      reflet.addColorStop(0.75, 'rgba(255,255,255,'+(0.1*alpha)+')')
      reflet.addColorStop(1,    'rgba(255,255,255,0)')
      ctx.fillStyle = reflet
      ctx.beginPath()
      ctx.arc(0, 0, r*0.38, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()
      const spec = ctx.createRadialGradient(cx-r*0.5, cy-r*0.45, 0, cx-r*0.5, cy-r*0.45, r*0.1)
      spec.addColorStop(0,   'rgba(255,255,255,'+(0.95*alpha)+')')
      spec.addColorStop(0.5, 'rgba(255,255,255,'+(0.4*alpha)+')')
      spec.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = spec
      ctx.fillRect(cx-r, cy-r, r*2, r*2)
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()
      const shad = ctx.createRadialGradient(cx, cy+r*0.6, 0, cx, cy+r*0.6, r*0.8)
      shad.addColorStop(0, 'hsla('+h+','+s+'%,20%,'+(0.12*alpha)+')')
      shad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = shad
      ctx.fillRect(cx-r, cy-r, r*2, r*2)
      ctx.restore()

      if (number && r > 20) {
        const fontSize = Math.max(10, r * 0.52)
        ctx.save()
        ctx.font = `900 ${fontSize}px "Palatino Linotype", Palatino, Georgia, serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(240, 192, 64, 0.9)'
        ctx.shadowBlur = r * 0.4
        const goldGrad = ctx.createLinearGradient(cx, cy - fontSize*0.5, cx, cy + fontSize*0.5)
        goldGrad.addColorStop(0,   `rgba(255,245,180,${0.98*alpha})`)
        goldGrad.addColorStop(0.3, `rgba(255,215,50,${0.95*alpha})`)
        goldGrad.addColorStop(0.6, `rgba(240,160,10,${0.9*alpha})`)
        goldGrad.addColorStop(1,   `rgba(255,220,80,${0.95*alpha})`)
        ctx.fillStyle = goldGrad
        ctx.fillText(number, cx, cy + fontSize*0.05)

        ctx.restore()
      }

      ctx.restore()
    }

    function drawParticles() {
      particles = particles.filter(p => {
        if (p.ring) {
          p.r += (p.maxR - p.r) * 0.12
          p.alpha -= p.decay
          if (p.alpha <= 0) return false
          const { h, s, l } = p.col
          ctx.save()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${h},${s}%,${l+10}%,${p.alpha})`
          ctx.lineWidth = 2
          ctx.stroke()
          ctx.restore()
          return true
        }
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.vx *= 0.98
        p.alpha -= p.decay
        if (p.alpha <= 0) return false
        const { h, s, l } = p.col
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const g = ctx.createRadialGradient(p.x - p.size*0.3, p.y - p.size*0.3, 0, p.x, p.y, p.size)
        g.addColorStop(0, `hsla(${h},${s}%,${l+25}%,1)`)
        g.addColorStop(0.5, `hsla(${h},${s}%,${l}%,0.8)`)
        g.addColorStop(1, `hsla(${h},${s}%,${l-10}%,0.3)`)
        ctx.fillStyle = g
        ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,0.7)`
        ctx.beginPath()
        ctx.arc(p.x - p.size*0.3, p.y - p.size*0.3, p.size * 0.25, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        return true
      })
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 1
      frameCount++

      const navH = getNavbarHeight()

      if (state === 'idle' && frameCount % 110 === 0 && bubbles.length < 20) {
        bubbles.push(mkBubble(false))
      }

      drawParticles()

      bubbles = bubbles.filter(b => {
        if (b.popping) {
          b.popProgress += 0.07
          if (b.popProgress >= 1) return false
          const scale = 1 + b.popProgress * 0.15
          const alpha = 1 - b.popProgress
          drawBubble(ctx, b.x, b.y, b.r * scale, b.col, alpha, b.number)
          return true
        }

        b.wobblePhase += b.wobbleSpeed
        b.x += b.vx + Math.sin(b.wobblePhase) * b.wobbleAmp * 0.08
        b.y += b.vy

        if (b.y - b.r <= navH) {
          popBubble(b)
          return true
        }

        if (b.y + b.r < -10) {
          if (state === 'idle') { Object.assign(b, mkBubble(false)) }
          else { return false }
        }

        if (b.x - b.r < 0)  { b.x = b.r;     b.vx =  Math.abs(b.vx) * 0.6 }
        if (b.x + b.r > W)  { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.6 }

        drawBubble(ctx, b.x, b.y, b.r, b.col, 1, b.number)
        return true
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(idleTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchstart', handleClick)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasBgRef}
      id="bubblesCanvas"
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 500,
        mixBlendMode: 'screen',

      }}
    />
  )
}
