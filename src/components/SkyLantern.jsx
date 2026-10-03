import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

export default function SkyLantern({ unlocked, onRelease }) {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const startRef = useRef(0)
  const frameRef = useRef(0)

  const stopHold = () => {
    setHolding(false); setProgress(0)
    cancelAnimationFrame(frameRef.current)
  }
  const beginHold = () => {
    if (!unlocked) return
    setHolding(true); startRef.current = performance.now()
    const tick = (now) => {
      const current = Math.min(1, (now - startRef.current) / 2000)
      setProgress(current)
      if (current >= 1) { setHolding(false); setProgress(0); onRelease(); return }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])
  return (
    <div className={`lantern-zone ${unlocked ? 'unlocked' : ''}`}>
      {!unlocked && <p className="lantern-locked">The wish waits for all six lights.</p>}
      {unlocked && <p className="lantern-invite"><Flame size={15} /> Hold to release our wish into the night</p>}
      <motion.button type="button" className="fanush" disabled={!unlocked} onPointerDown={beginHold} onPointerUp={stopHold} onPointerLeave={stopHold} onPointerCancel={stopHold} aria-label="Hold for two seconds to release lantern" animate={unlocked ? { y: [0, -5, 0], scale: [1, 1.025, 1] } : {}} transition={{ duration: 1.8, repeat: Infinity }}>
        {unlocked && <span className="hold-ring" style={{ '--progress': `${progress * 360}deg` }} />}
        <span className="lantern-cap" /><span className="lantern-body"><i /></span><span className="lantern-tail" />
      </motion.button>
      {unlocked && <div className="lantern-embers" aria-hidden="true">{Array.from({ length: 8 }).map((_, index) => <b key={index} style={{ left: `${24 + index * 7}%`, animationDelay: `${index * .34}s` }} />)}</div>}
    </div>
  )
}
