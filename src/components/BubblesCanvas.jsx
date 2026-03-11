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
    const IDLE_DELAY = 10000

    const NUMBERS = ['1','2','3','4','5','6','7','8','9','11','22','33']

    function spawnPopParticles(cx, cy, r, col) {
      const count = Math.floor(10 + r * 0.5)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6
        const speed = (3 + Math.random() * 5) * (r / 35) // plus rapide
        const size = 1.5 + Math.random() * 3
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size, col,
          alpha: 1,
          decay: 0.055 + Math.random() * 0.04, // disparition rapide
        })
      }
      // Anneau de dilation rapide
      particles.push({
        x: cx, y: cy,
        ring: true,
        r: r * 0.5,
        maxR: r * 2.5,
        col,
        alpha: 0.8,
        decay: 0.09, // anneau rapide
      })
    }

    function triggerPop() {
      if (state === 'popping' || state === 'hidden') return
      state = 'popping'
      clearTimeout(idleTimer)
      const sorted = [...bubbles].filter(b => !b.popping)
      sorted.sort((a, b) => a.y - b.y)
      sorted.forEach((b, i) => {
        setTimeout(() => {
          if (!b.popping) { b.popping = true; b.popProgress = 0 }
        }, i * 80)
      })
      const totalDelay = sorted.length * 80 + 800
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
      const total = 18
      const interval = setInterval(() => {
        if (count >= total) { clearInterval(interval); state = 'idle'; return }
        bubbles.push(mkBubble(false))
        count++
      }, 200)
    }

    function onActivity() {
      if (state === 'hidden') {
        clearTimeout(idleTimer)
        idleTimer = setTimeout(triggerSpawn, IDLE_DELAY)
        return
      }
      if (state === 'spawning' || state === 'idle') triggerPop()
    }

    window.addEventListener('click',      onActivity)
    window.addEventListener('keydown',    onActivity)
    window.addEventListener('touchstart', onActivity, { passive: true })

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

      // Trajectoire aléatoire — pas forcément vers le haut
      const angle = -Math.PI / 2       // direction de base : haut
        + (Math.random() - 0.5) * 1.8  // déviation latérale importante
      const speed = 1.2 + Math.random() * 2.0 // plus rapide

      const col = WIN7_COLORS[Math.floor(Math.random() * WIN7_COLORS.length)]
      const number = NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
      return {
        x: r + Math.random() * (W - r * 2),
        y: randomY ? Math.random() * H : H + r + Math.random() * 200,
        r,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        col,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02,  // wobble plus prononcé
        wobbleAmp: 0.8 + Math.random() * 1.2,        // amplitude plus grande
        popping: false, popProgress: 0,
        number,
        // Changement de direction aléatoire
        driftTimer: 60 + Math.floor(Math.random() * 120),
        driftCount: 0,
      }
    }

    for (let i = 0; i < 18; i++) bubbles.push(mkBubble(true))

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
        ctx.shadowBlur = 0
        ctx.globalAlpha = 0.35 * alpha
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.fillText(number, cx, cy - fontSize*0.06)
        ctx.restore()
      }

      ctx.restore()
    }

    function drawParticles() {
      particles = particles.filter(p => {
        if (p.ring) {
          p.r += (p.maxR - p.r) * 0.18 // dilation rapide
          p.alpha -= p.decay
          if (p.alpha <= 0) return false
          const { h, s, l } = p.col
          ctx.save()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${h},${s}%,${l+10}%,${p.alpha})`
          ctx.lineWidth = 2.5
          ctx.stroke()
          ctx.restore()
          return true
        }

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08 // gravité plus forte = chute rapide
        p.vx *= 0.96
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

      if (state === 'idle' && frameCount % 90 === 0 && bubbles.length < 22) {
        bubbles.push(mkBubble(false))
      }

      drawParticles()

      bubbles = bubbles.filter(b => {
        if (b.popping) {
          b.popProgress += 0.12 // pop plus rapide
          if (b.popProgress >= 1) return false
          const scale = 1 + b.popProgress * 0.1
          const alpha = 1 - b.popProgress
          drawBubble(ctx, b.x, b.y, b.r * scale, b.col, alpha, b.number)
          return true
        }

        b.wobblePhase += b.wobbleSpeed
        b.x += b.vx + Math.sin(b.wobblePhase) * b.wobbleAmp * 0.15
        b.y += b.vy

        // Changement de direction aléatoire progressif
        b.driftCount++
        if (b.driftCount >= b.driftTimer) {
          b.driftCount = 0
          b.driftTimer = 60 + Math.floor(Math.random() * 120)
          // Petite impulsion aléatoire
          b.vx += (Math.random() - 0.5) * 0.8
          b.vy += (Math.random() - 0.5) * 0.5
          // Limite la vitesse max
          const spd = Math.sqrt(b.vx*b.vx + b.vy*b.vy)
          if (spd > 3) { b.vx = (b.vx/spd)*3; b.vy = (b.vy/spd)*3 }
          // Force légère vers le haut pour qu'elles ne descendent pas indéfiniment
          if (b.vy > 0.5) b.vy -= 0.4
        }

        // Pop au contact navbar
        if (b.y - b.r <= navH && !b.popping) {
          b.popping = true
          b.popProgress = 0
          spawnPopParticles(b.x, Math.max(b.y, navH), b.r, b.col)
          return true
        }

        if (b.y + b.r < -10) {
          if (state === 'idle') { Object.assign(b, mkBubble(false)) }
          else { return false }
        }

        if (b.x - b.r < 0)  { b.x = b.r;     b.vx =  Math.abs(b.vx) * 0.7 }
        if (b.x + b.r > W)  { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.7 }

        drawBubble(ctx, b.x, b.y, b.r, b.col, 1, b.number)
        return true
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(idleTimer)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('click',      onActivity)
      window.removeEventListener('keydown',    onActivity)
      window.removeEventListener('touchstart', onActivity)
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
