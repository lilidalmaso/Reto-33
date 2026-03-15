import { useEffect, useRef } from 'react'

export default function StarsCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let frame = 0
    let stars = []
    let galaxies = []
    let W, H

    function init() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      stars = buildStars()
      galaxies = buildGalaxies()
    }

    function buildStars() {
      const list = []
      for (let i = 0; i < 120; i++) {
        const big = i < 18
        list.push({
          x: Math.random() * W,
          y: H * 0.55 + Math.random() * H * 0.45,
          r: big ? 1.2 + Math.random() * 1.2 : 0.3 + Math.random() * 0.9,
          baseAlpha: big ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.5,
          color: i < 5 ? [240,200,120] : i < 10 ? [180,210,255] : [255,255,255],
          tw: 0.015 + Math.random() * 0.025,
          twOff: Math.random() * Math.PI * 2,
          spikes: big,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.003,
        })
      }
      return list
    }

    function buildGalaxies() {
      return [
        { cx: W*0.92, cy: H*0.78, r: W*0.09, angle: -0.6, rot: 0.0012, c: '190,160,255' },
      ].map(g => {
        const arms = []
        for (let a = 0; a < 2; a++) {
          for (let i = 0; i < 120; i++) {
            const t = i / 120
            const rad = t * g.r * 0.95
            const ang = t * Math.PI * 3.5 + a * Math.PI
            arms.push({ x: Math.cos(ang)*rad, y: Math.sin(ang)*rad*0.4, s: (1-t)*g.r*0.03+0.4, a: (1-t)*0.4+0.05 })
          }
        }
        const dust = []
        for (let i = 0; i < 150; i++) {
          const rad = Math.random() * g.r * 0.85
          const ang = Math.random() * Math.PI * 2
          dust.push({ x: Math.cos(ang)*rad, y: Math.sin(ang)*rad*0.35, s: Math.random()*0.6+0.1, a: Math.random()*0.2 })
        }
        return { ...g, arms, dust }
      })
    }

    function star(x, y, r, alpha, col, spikes) {
      const [R,G,B] = col

      // Halo
      const h = ctx.createRadialGradient(x, y, 0, x, y, r*5)
      h.addColorStop(0, `rgba(${R},${G},${B},${alpha*0.28})`)
      h.addColorStop(1, `rgba(${R},${G},${B},0)`)
      ctx.beginPath(); ctx.arc(x, y, r*5, 0, Math.PI*2)
      ctx.fillStyle = h; ctx.fill()

      // Noyau
      const c = ctx.createRadialGradient(x, y, 0, x, y, r*1.5)
      c.addColorStop(0,   `rgba(255,255,255,${alpha})`)
      c.addColorStop(0.5, `rgba(${R},${G},${B},${alpha*0.8})`)
      c.addColorStop(1,   `rgba(${R},${G},${B},0)`)
      ctx.beginPath(); ctx.arc(x, y, r*1.5, 0, Math.PI*2)
      ctx.fillStyle = c; ctx.fill()

      // Rayons
      if (spikes) {
        const len = r * 9
        ctx.save(); ctx.globalAlpha = alpha * 0.4
        for (let a = 0; a < Math.PI; a += Math.PI/2) {
          ctx.save(); ctx.translate(x, y); ctx.rotate(a)
          const g = ctx.createLinearGradient(-len, 0, len, 0)
          g.addColorStop(0, 'rgba(255,255,255,0)')
          g.addColorStop(0.5, `rgba(255,255,255,${alpha})`)
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.fillRect(-len, -r*0.22, len*2, r*0.44)
          ctx.restore()
        }
        ctx.restore()
      }
    }

    function galaxy(g) {
      const ang = g.angle + frame * g.rot
      ctx.save(); ctx.translate(g.cx, g.cy); ctx.rotate(ang)

      // Halo
      const halo = ctx.createRadialGradient(0,0,0,0,0,g.r)
      halo.addColorStop(0,   `rgba(${g.c},0.14)`)
      halo.addColorStop(0.5, `rgba(${g.c},0.06)`)
      halo.addColorStop(1,   `rgba(${g.c},0)`)
      ctx.beginPath(); ctx.arc(0,0,g.r,0,Math.PI*2)
      ctx.fillStyle = halo; ctx.fill()

      // Noyau
      const core = ctx.createRadialGradient(0,0,0,0,0,g.r*0.15)
      core.addColorStop(0,   'rgba(255,245,210,0.5)')
      core.addColorStop(1,   `rgba(${g.c},0)`)
      ctx.beginPath(); ctx.arc(0,0,g.r*0.15,0,Math.PI*2)
      ctx.fillStyle = core; ctx.fill()

      // Bras
      for (const s of g.arms) {
        const sg = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.s*2.5)
        sg.addColorStop(0,   `rgba(255,255,255,${s.a*1.5})`)
        sg.addColorStop(0.5, `rgba(${g.c},${s.a})`)
        sg.addColorStop(1,   `rgba(${g.c},0)`)
        ctx.beginPath(); ctx.arc(s.x,s.y,s.s*2.5,0,Math.PI*2)
        ctx.fillStyle = sg; ctx.fill()
      }

      // Poussière
      for (const d of g.dust) {
        ctx.beginPath(); ctx.arc(d.x,d.y,d.s,0,Math.PI*2)
        ctx.fillStyle = `rgba(255,255,255,${d.a})`
        ctx.fill()
      }

      ctx.restore()
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      frame++

      for (const g of galaxies) galaxy(g)

      for (const s of stars) {
        s.rot += s.rotSpeed
        const a = s.baseAlpha * (0.5 + Math.sin(frame * s.tw + s.twOff) * 0.5)
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rot)
        ctx.translate(-s.x, -s.y)
        star(s.x, s.y, s.r, a, s.color, s.spikes)
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', init)
    init()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
