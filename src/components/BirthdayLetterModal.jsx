import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Heart, Sparkles, X } from 'lucide-react'

export default function BirthdayLetterModal({ open, letter, signature, onClose, onCelebrate }) {
  const [wishMade, setWishMade] = useState(false)
  useEffect(() => { if (!open) setWishMade(false) }, [open])
  const makeWish = () => {
    setWishMade(true)
    const colors = ['#FFB84D', '#EAD7C3', '#B4533C', '#F6F1E9']
    confetti({ particleCount: 95, spread: 85, startVelocity: 35, origin: { y: .72 }, colors, scalar: .76, shapes: ['circle'] })
    setTimeout(() => confetti({ particleCount: 55, spread: 130, startVelocity: 46, origin: { x: .33, y: .65 }, colors, scalar: .55 }), 170)
    setTimeout(() => confetti({ particleCount: 55, spread: 130, startVelocity: 46, origin: { x: .67, y: .65 }, colors, scalar: .55 }), 290)
  }
  return <AnimatePresence>{open && (
    <motion.div className="letter-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="final-stars" aria-hidden="true" />
      <motion.div className="ascending-lantern" initial={{ y: '65vh', opacity: 1 }} animate={{ y: '-18vh', opacity: 0 }} transition={{ duration: 3.4, ease: 'easeOut' }} aria-hidden="true"><span /></motion.div>
      <motion.article className="birthday-letter" initial={{ opacity: 0, y: 80, rotateX: -20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 1.35, duration: .85 }} role="dialog" aria-modal="true" aria-label="Your birthday letter">
        <button className="letter-close" type="button" onClick={onClose} aria-label="Close birthday letter"><X size={17} /></button>
        <p className="letter-eyebrow"><Sparkles size={14} /> {letter.eyebrow}</p>
        <h2>{letter.heading}</h2>
        {letter.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <p className="signature">{signature}</p>
        <button type="button" className={`wish-button ${wishMade ? 'made' : ''}`} onClick={makeWish}>
          {wishMade ? <><Heart size={17} fill="currentColor" /> Wish sent to the stars</> : <><Flame size={17} /> Blow out the candle · make a wish</>}
        </button>
        <button type="button" className="celebrate-button" onClick={onCelebrate}>Turn the page · let’s celebrate</button>
      </motion.article>
    </motion.div>
  )}</AnimatePresence>
}
