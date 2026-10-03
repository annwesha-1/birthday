import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Heart, RotateCcw, Sparkles, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GrandCelebration({ name, onReplay, onReturn }) {
  useEffect(() => {
    const colors = ['#ffb84d', '#f6f1e9', '#b4533c', '#e7a044', '#ffd98a']
    const launch = () => {
      const x = .18 + Math.random() * .64
      confetti({ particleCount: 70, angle: 60, spread: 72, startVelocity: 44, origin: { x, y: .74 }, colors, scalar: .9, gravity: .83 })
      confetti({ particleCount: 34, angle: 120, spread: 64, startVelocity: 40, origin: { x, y: .74 }, colors, scalar: .75, gravity: .86 })
    }
    launch()
    const interval = window.setInterval(launch, 1100)
    const timeout = window.setTimeout(() => window.clearInterval(interval), 7000)
    return () => { window.clearInterval(interval); window.clearTimeout(timeout) }
  }, [])

  return (
    <motion.main className="grand-finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="festival-garland garland-left" aria-hidden="true">{Array.from({ length: 9 }).map((_, index) => <i key={index} />)}</div>
      <div className="festival-garland garland-right" aria-hidden="true">{Array.from({ length: 9 }).map((_, index) => <i key={index} />)}</div>
      <div className="grand-fireworks" aria-hidden="true"><span /><span /><span /><span /></div>
      <section className="grand-message">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}><Sparkles size={15} /> the whole sky is celebrating you</motion.p>
        <motion.h1 initial={{ opacity: 0, scale: .82 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .42, type: 'spring', damping: 13 }}>Happy Birthday,<br /><i>{name}</i></motion.h1>
        <motion.div className="grand-divider" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .7 }}><Heart size={16} fill="currentColor" /></motion.div>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .88 }}>May this year love you<br />as fiercely as I do.</motion.h2>
        <motion.div className="celebration-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <button type="button" onClick={onReplay}><RotateCcw size={15} /> relive our rooftop</button>
          <button type="button" className="return-button" onClick={onReturn}><Star size={15} /> return to the lights</button>
        </motion.div>
      </section>
      <p className="grand-signoff">A thousand tiny fireworks, all saying your name.</p>
    </motion.main>
  )
}
