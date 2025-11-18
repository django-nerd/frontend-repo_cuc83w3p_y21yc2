import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

export default function TrendingGrid() {
  const [items, setItems] = useState([])
  const [terms, setTerms] = useState([])

  useEffect(() => {
    apiGet('/api/trending').then(({ items, terms }) => { setItems(items); setTerms(terms) }).catch(() => {})
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Trending</h2>
        <div className="hidden md:flex gap-2 overflow-auto text-sm text-zinc-300">
          {terms.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-white/10">{t}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map(s => (
          <a key={s.id} href={`/sneaker/${s.id}`} className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition">
            <img src={s.media.small} alt={s.name} className="rounded-lg aspect-[4/3] object-cover w-full" />
            <div className="mt-3">
              <div className="text-white font-semibold group-hover:underline line-clamp-1">{s.name}</div>
              <div className="text-zinc-300 text-sm">{s.brand} • {s.model}</div>
              <div className="text-emerald-400 text-sm mt-1">Lowest Ask: ${s.stockx.lowestAsk}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
