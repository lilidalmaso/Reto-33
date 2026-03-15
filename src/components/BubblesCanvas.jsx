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

    // Palette argent — tons neutres froids
    const SILVER_COLORS = [
      { h: 210, s: 8,  l: 88 },
      { h: 215, s: 6,  l: 82 },
      { h: 205, s: 10, l: 90 },
      { h: 220, s: 5,  l: 85 },
      { h: 200, s: 12, l: 87 },
      { h: 210, s: 7,  l: 92 },
    ]

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
        r: r * 0.8, maxR: r * 2.2,
        col, alpha: 0.7, decay: 0.04,
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
      sorted.forEach((b, i) => setTimeout(() => popBubble(b), i * 80))
      state = 'popping'
      setTimeout(() => { bubbles = []; state = 'idle' }, sorted.length * 80 + 800)
    }

    function handleClick(e) {
      if (state === 'hidden') return
      const clientX = e.clientX ?? e.touches?.[0]?.clientX
      const clientY = e.clientY ?? e.touches?.[0]?.clientY
      if (clientX === undefined) { triggerPopAll(); return }
      let hitBubble = null
      for (const b of bubbles) {
        if (b.popping) continue
        const dx = b.x - clientX, dy = b.y - clientY
        if (Math.sqrt(dx*dx + dy*dy) <= b.r) { hitBubble = b; break }
      }
      if (hitBubble) popBubble(hitBubble)
      else triggerPopAll()
    }

    function handleMouseMove(e) {
      let onBubble = false
      for (const b of bubbles) {
        if (b.popping) continue
        const dx = b.x - e.clientX, dy = b.y - e.clientY
        if (Math.sqrt(dx*dx + dy*dy) <= b.r) { onBubble = true; break }
      }
      canvasBg.style.pointerEvents = onBubble ? 'auto' : 'none'
      canvasBg.style.cursor = onBubble ? 'pointer' : 'default'
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('touchstart', handleClick, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)

    function getNavbarHeight() {
      const nav = document.querySelector('header')
      return nav ? nav.getBoundingClientRect().bottom : 64
    }

    function resize() {
      W = canvasBg.width = window.innerWidth
      H = canvasBg.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function mkBubble(randomY = false) {
      const r = 22 + Math.random() * 45
      const col = SILVER_COLORS[Math.floor(Math.random() * SILVER_COLORS.length)]
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5
      const speed = 2.5 + Math.random() * 1.5
      return {
        x: r + Math.random() * (W - r * 2),
        y: randomY ? Math.random() * H : H + r + Math.random() * 50,
        r, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, col,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.008 + Math.random() * 0.01,
        wobbleAmp: 0.3 + Math.random() * 0.4,
        popping: false, popProgress: 0,
        number: NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
      }
    }

    function drawBubble(ctx, cx, cy, r, col, alpha, number) {
      if (alpha === undefined) alpha = 1
      const { h, s, l } = col
      ctx.save()

      // Corps — argent translucide avec dégradé radial
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      const body = ctx.createRadialGradient(cx - r*0.3, cy - r*0.3, 0, cx, cy, r)
      body.addColorStop(0,   `hsla(${h},${s}%,${l+8}%,${0.55*alpha})`)
      body.addColorStop(0.5, `hsla(${h},${s}%,${l}%,${0.30*alpha})`)
      body.addColorStop(1,   `hsla(${h},${s}%,${l-12}%,${0.50*alpha})`)
      ctx.fillStyle = body
      ctx.fill()

      // Bordure argent irisée
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      const border = ctx.createLinearGradient(cx-r, cy-r, cx+r, cy+r)
      border.addColorStop(0,    `hsla(${h},${s}%,98%,${0.95*alpha})`)
      border.addColorStop(0.25, `hsla(${h},${s}%,${l+5}%,${0.85*alpha})`)
      border.addColorStop(0.5,  `hsla(${h},${s}%,${l-5}%,${0.75*alpha})`)
      border.addColorStop(0.75, `hsla(${h},${s}%,${l+8}%,${0.85*alpha})`)
      border.addColorStop(1,    `hsla(${h},${s}%,98%,${0.95*alpha})`)
      ctx.strokeStyle = border
      ctx.lineWidth = Math.max(0.5, r * 0.018)
      ctx.stroke()

      // Reflet principal — brillance haut gauche
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.97, 0, Math.PI * 2)
      ctx.clip()
      ctx.save()
      ctx.translate(cx - r*0.3, cy - r*0.3)
      ctx.rotate(-Math.PI / 5)
      ctx.scale(1, 0.5)
      const reflet = ctx.createRadialGradient(0, 0, 0, 0, 0, r*0.45)
      reflet.addColorStop(0,    `rgba(255,255,255,${0.92*alpha})`)
      reflet.addColorStop(0.35, `rgba(255,255,255,${0.50*alpha})`)
      reflet.addColorStop(0.7,  `rgba(255,255,255,${0.12*alpha})`)
      reflet.addColorStop(1,    'rgba(255,255,255,0)')
      ctx.fillStyle = reflet
      ctx.beginPath()
      ctx.arc(0, 0, r*0.45, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.restore()

      // Petit reflet spéculaire
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()
      const spec = ctx.createRadialGradient(cx-r*0.48, cy-r*0.42, 0, cx-r*0.48, cy-r*0.42, r*0.12)
      spec.addColorStop(0,   `rgba(255,255,255,${0.98*alpha})`)
      spec.addColorStop(0.5, `rgba(255,255,255,${0.45*alpha})`)
      spec.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = spec
      ctx.fillRect(cx-r, cy-r, r*2, r*2)
      ctx.restore()

      // Numéro en noir
      if (number && r > 20) {
        const fontSize = Math.max(10, r * 0.48)
        ctx.save()
        ctx.font = `700 ${fontSize}px "Palatino Linotype", Palatino, Georgia, serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(255,255,255,0.6)'
        ctx.shadowBlur = r * 0.15
        ctx.fillStyle = `rgba(15,15,20,${alpha * 0.85})`
        ctx.fillText(number, cx, cy + fontSize * 0.05)
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
          ctx.lineWidth = 1.5
          ctx.stroke()
          ctx.restore()
          return true
        }
        p.x += p.vx; p.y += p.vy
        p.vy += 0.04; p.vx *= 0.98
        p.alpha -= p.decay
        if (p.alpha <= 0) return false
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0, 'rgba(255,255,255,1)')
        g.addColorStop(0.5, `hsla(${p.col.h},${p.col.s}%,${p.col.l}%,0.8)`)
        g.addColorStop(1, 'rgba(200,205,215,0)')
        ctx.fillStyle = g
        ctx.fill()
        ctx.restore()
        return true
      })
    }

    function resolveBubbleCollisions() {
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i], b = bubbles[j]
          if (a.popping || b.popping) continue
          const dx = b.x - a.x, dy = b.y - a.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          const minDist = a.r + b.r
          if (dist < minDist && dist > 0) {
            const nx = dx/dist, ny = dy/dist
            const overlap = (minDist - dist) * 0.5
            a.x -= nx*overlap; a.y -= ny*overlap
            b.x += nx*overlap; b.y += ny*overlap
            const dvx = a.vx-b.vx, dvy = a.vy-b.vy
            const dot = dvx*nx + dvy*ny
            if (dot > 0) {
              const imp = dot * 0.85
              a.vx -= imp*nx; a.vy -= imp*ny
              b.vx += imp*nx; b.vy += imp*ny
            }
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 1
      frameCount++

      const navH = getNavbarHeight()

      if (state === 'idle' && frameCount % 60 === 0 && bubbles.length < 11) {
        bubbles.push(mkBubble(false))
      }

      drawParticles()
      resolveBubbleCollisions()

      bubbles = bubbles.filter(b => {
        if (b.popping) {
          b.popProgress += 0.07
          if (b.popProgress >= 1) return false
          drawBubble(ctx, b.x, b.y, b.r * (1 + b.popProgress*0.15), b.col, 1 - b.popProgress, b.number)
          return true
        }
        b.wobblePhase += b.wobbleSpeed
        b.x += b.vx + Math.sin(b.wobblePhase) * b.wobbleAmp * 0.08
        b.y += b.vy
        if (b.y - b.r <= navH) { popBubble(b); return true }
        if (b.y + b.r < -10) { if (state === 'idle') { Object.assign(b, mkBubble(false)) } else return false }
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
