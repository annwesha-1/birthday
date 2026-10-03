import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function DoorScene({ onEnter }) {
  return (
    <motion.main
      className="door-scene"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 1.15 }}
    >
      <div className="rain rain-door" aria-hidden="true" />
      <div className="door-city" aria-hidden="true" />
      <div className="haze" aria-hidden="true" />
      <section className="door-intro">
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .35 }} className="eyebrow"><Sparkles size={14} /> a little world, made for you</motion.p>
        <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .5 }}>
          Meet me<br /><i>under the lights.</i>
        </motion.h1>
      </section>

      <motion.button
        type="button" className="door-wrap" onClick={onEnter} aria-label="Open the rooftop door"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .75, type: 'spring', stiffness: 70 }} whileHover={{ scale: 1.025 }} whileTap={{ scale: .98 }}
      >
        <span className="bulb-string bulbs-left" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <b key={index} style={{ animationDelay: `${index * .38}s` }} />)}</span>
        <span className="bulb-string bulbs-right" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <b key={index} style={{ animationDelay: `${index * .3 + .2}s` }} />)}</span>
        <span className="rustic-door" aria-hidden="true"><span className="door-handle" /></span>
        <span className="hanging-sign">Push to enter<br /><small>our space</small></span>
        <span className="door-action">open the door <ArrowRight size={15} /></span>
      </motion.button>
    </motion.main>
  )
}
