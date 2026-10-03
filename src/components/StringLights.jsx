import { motion } from 'framer-motion'

export default function StringLights({ litLights, memories, onLight }) {
  return (
    <section className="string-light-section" aria-label="Memory string lights">
      <div className="railing-wire" />
      <div className="lights-counter">Lights lit: <strong>{litLights.length} / {memories.length}</strong></div>
      <div className="light-row">
        {memories.map((memory, index) => {
          const isLit = litLights.includes(index)
          return <motion.button key={memory.date} type="button" className={`memory-light ${isLit ? 'lit' : ''}`} onClick={() => onLight(index)} aria-label={`Open memory from ${memory.date}`} whileTap={{ scale: .9 }}>
            {index === 0 && litLights.length === 0 && <motion.span className="first-light-callout" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: [0, -5, 0] }} transition={{ opacity: { delay: .45, duration: .5 }, y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }}>
              <em>There’s a small piece of my heart tucked into this first glow.<br /><b>Will you wake it for me?</b></em>
              <svg viewBox="0 0 330 135" aria-hidden="true"><path d="M 302 15 C 242 7, 219 91, 31 117" /><path d="M 48 96 L 29 118 L 58 126" /></svg>
              
            </motion.span>}
            <span className="cord" style={{ height: `${25 + (index % 3) * 16}px` }} />
            <span className="bulb"><i /></span>
            <small>{index + 1}</small>
          </motion.button>
        })}
      </div>
      <p className="rail-prompt">Each small light keeps a little piece of us.</p>
    </section>
  )
}
