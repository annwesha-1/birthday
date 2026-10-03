import { motion } from 'framer-motion'
import { CloudRain, MoonStar } from 'lucide-react'
import TeaCups from './TeaCups.jsx'
import StringLights from './StringLights.jsx'
import SkyLantern from './SkyLantern.jsx'
import TerraceGuide from './TerraceGuide.jsx'

export default function RooftopView({ memories, teaNotes, litLights, onLight, onTeaNote, onRelease, onRestart }) {
  const allLit = litLights.length === memories.length
  return (
    <motion.main className="rooftop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
      <div className="rooftop-sky"><div className="moon" /><div className="rooftop-stars" /></div>
      <div className="rain" aria-hidden="true" />
      <div className="cityline" aria-hidden="true">{Array.from({ length: 17 }).map((_, index) => <i key={index} style={{ height: `${35 + ((index * 31) % 93)}px`, width: `${28 + ((index * 17) % 44)}px` }} />)}</div>
      <div className="terrace-ground" />
      <header className="terrace-header"><p><CloudRain size={15} /> soft rain, warm lights</p><h1>Our little <i>date</i></h1></header>
      <TerraceGuide litLights={litLights} />
      <TeaCups notes={teaNotes} onNote={onTeaNote} />
      <StringLights litLights={litLights} memories={memories} onLight={onLight} />
      <SkyLantern unlocked={allLit} onRelease={onRelease} />
      {allLit && <motion.div className="all-lit-note" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>Every memory is glowing now.</motion.div>}
    </motion.main>
  )
}
