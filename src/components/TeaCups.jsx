import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function TeaCups({ notes, onNote }) {
  return (
    <div className="tea-area">
      <div className="wooden-stool" aria-hidden="true"><i /><i /></div>
      {notes.slice(0, 2).map((note, index) => (
        <motion.button key={note} type="button" className={`bhar bhar-${index + 1}`} onClick={() => onNote(note)} whileHover={{ y: -5, rotate: index ? 3 : -3 }} whileTap={{ scale: .94 }} aria-label="Reveal a love note">
          <span className="steam steam-one" /><span className="steam steam-two" />
          <span className="tea-surface" />
        </motion.button>
      ))}
    </div>
  )
}
