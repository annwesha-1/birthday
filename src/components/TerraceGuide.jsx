import { Sparkles } from 'lucide-react'

export default function TerraceGuide({ litLights }) {
  if (litLights.length > 0) return null
  return (
    <aside className="terrace-guide" aria-label="The first memory invitation">
      <div className="guide-title"><Sparkles size={15} /> a first little secret</div>
      <h2>One light knows<br />how this began.</h2>
      <p>Follow the golden thread below.</p>
    </aside>
  )
}
