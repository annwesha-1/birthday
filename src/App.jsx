import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DoorScene from './components/DoorScene.jsx'
import RooftopView from './components/RooftopView.jsx'
import PolaroidModal from './components/PolaroidModal.jsx'
import BirthdayLetterModal from './components/BirthdayLetterModal.jsx'
import GrandCelebration from './components/GrandCelebration.jsx'
import { letter, memories, person, teaNotes } from './data/memories.js'
import { useAudio } from './hooks/useAudio.js'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [litLights, setLitLights] = useState([])
  const [openMemory, setOpenMemory] = useState(null)
  const [teaNote, setTeaNote] = useState(null)
  const [letterOpen, setLetterOpen] = useState(false)
  const [celebrationOpen, setCelebrationOpen] = useState(false)
  const audio = useAudio()

  const enterRooftop = async () => {
    await audio.creak()
    audio.play()
    setEntered(true)
  }
  const showMemory = (index) => {
    setLitLights((current) => current.includes(index) ? current : [...current, index])
    setOpenMemory(index)
  }
  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {!entered ? <DoorScene key="door" onEnter={enterRooftop} /> : <RooftopView key="rooftop" memories={memories} teaNotes={teaNotes} litLights={litLights} onLight={showMemory} onTeaNote={setTeaNote} onRelease={() => setLetterOpen(true)} onRestart={() => { audio.pause(); setLitLights([]); setOpenMemory(null); setEntered(false) }} />}
      </AnimatePresence>
      <PolaroidModal memory={openMemory === null ? null : memories[openMemory]} index={openMemory ?? 0} onClose={() => setOpenMemory(null)} />
      <AnimatePresence>{teaNote && <motion.button className="tea-toast" onClick={() => setTeaNote(null)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}><span>because I love you</span>{teaNote}<small>tap to tuck this away</small></motion.button>}</AnimatePresence>
      <BirthdayLetterModal open={letterOpen} letter={letter} signature={person.signature} onClose={() => setLetterOpen(false)} onCelebrate={() => { setLetterOpen(false); setCelebrationOpen(true) }} />
      <AnimatePresence>{celebrationOpen && <GrandCelebration name={person.name} onReplay={() => { setCelebrationOpen(false); setLitLights([]); setEntered(false) }} onReturn={() => setCelebrationOpen(false)} />}</AnimatePresence>
    </div>
  )
}
