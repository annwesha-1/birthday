import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'

export default function PolaroidModal({ memory, index, onClose }) {
  const [imageSource, setImageSource] = useState(memory?.image ?? null)
  useEffect(() => setImageSource(memory?.image ?? null), [memory])
  const handleImageError = () => setImageSource((current) => current === memory.image ? memory.fallback : null)
  return <AnimatePresence>{memory && (
    <motion.div className="modal-shade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="presentation">
      <motion.article className="polaroid" initial={{ opacity: 0, scale: .72, rotate: index % 2 ? 7 : -7 }} animate={{ opacity: 1, scale: 1, rotate: index % 2 ? 2 : -2 }} exit={{ opacity: 0, scale: .85 }} transition={{ type: 'spring', damping: 16 }} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="A saved memory">
        <button type="button" className="close-modal" onClick={onClose} aria-label="Close memory"><X size={17} /></button>
        {imageSource ? <img src={imageSource} onError={handleImageError} alt="A shared memory" /> : <div className="memory-image-unavailable"><Heart size={28} fill="currentColor" /><span>This photograph is waiting to be added.<br />Its memory is already here.</span></div>}
        <div className="polaroid-copy"><p>{memory.caption}</p><time>{memory.date}</time></div>
      </motion.article>
    </motion.div>
  )}</AnimatePresence>
}
