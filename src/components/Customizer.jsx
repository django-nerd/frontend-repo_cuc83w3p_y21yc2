import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

const PARTS = [
  { key: 'upper', label: 'Upper' },
  { key: 'swoosh', label: 'Swoosh' },
  { key: 'toe', label: 'Toe' },
  { key: 'heel', label: 'Heel' },
  { key: 'laces', label: 'Laces' },
  { key: 'midsole', label: 'Midsole' },
  { key: 'outsole', label: 'Outsole' },
]

const COLORS = ['#111827','#ffffff','#fca5a5','#60a5fa','#34d399','#facc15','#f472b6','#a78bfa']
const MATERIALS = ['leather','suede','mesh','canvas','patent']

export default function Customizer({ sneaker }) {
  const [layers, setLayers] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(()=>{ setLayers({}) }, [sneaker?.id])

  function setPart(part, value){ setLayers(prev => ({ ...prev, [part]: { ...(prev[part]||{}), ...value } })) }

  async function saveDesign(){
    setSaving(true)
    try {
      const res = await apiPost('/api/designs', {
        user_id: null, // integrate Supabase later
        sneaker_id: sneaker.id,
        name: `${sneaker.model} custom`,
        layers
      })
      alert('Design saved! ID: ' + res.id)
    } catch (e) {
      alert('Failed to save: ' + e.message)
    } finally { setSaving(false) }
  }

  return (
    <section id="customizer" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Customizer</h2>
      <p className="text-zinc-300 mb-6">Pick colors and materials. Assets are easy to swap later (supports textures/layers).</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6">
          <div className="aspect-[4/3] rounded-xl bg-zinc-50 border flex items-center justify-center">
            <div className="relative">
              <img src={sneaker.media.small} alt={sneaker.name} className="w-[420px] max-w-full rounded-md" />
              {/* simple overlay blocks to hint layering */}
              {PARTS.map((p,i)=>{
                const c = layers[p.key]?.color
                return (
                  <div key={p.key} style={{ background: c || 'transparent', mixBlendMode: c ? 'multiply' : 'normal', opacity: c ? 0.45 : 1 }} className="absolute inset-0 rounded-md pointer-events-none" />
                )
              })}
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="space-y-6">
            {PARTS.map(part => (
              <div key={part.key} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white font-semibold mb-3">{part.label}</div>
                <div className="flex items-center gap-3 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c} onClick={()=>setPart(part.key, { color: c })} className="w-8 h-8 rounded-full border-2 border-white/20" style={{ background: c }} />
                  ))}
                </div>
                <div className="mt-3 text-sm text-zinc-300 flex gap-2 flex-wrap">
                  {MATERIALS.map(m => (
                    <button key={m} onClick={()=>setPart(part.key, { material: m })} className="px-2 py-1 rounded border border-white/20 hover:bg-white/10 text-white/90">
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button disabled={saving} onClick={saveDesign} className="w-full bg-white text-black rounded-md py-3 font-semibold disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Variant'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
