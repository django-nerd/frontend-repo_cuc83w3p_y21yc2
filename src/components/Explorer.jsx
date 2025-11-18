import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Explorer() {
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState({ brand: '', model: '', minPrice: '', maxPrice: '' })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const brands = useMemo(() => ['Nike','Jordan','adidas'], [])

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = await apiGet('/api/sneakers', {
        q: q || undefined,
        brand: filters.brand || undefined,
        model: filters.model || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        sort: 'trending',
        limit: 24,
      })
      setItems(res.items)
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e){ e.preventDefault(); fetchData() }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" id="explorer">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Explore</h2>
      <form onSubmit={onSubmit} className="grid grid-cols-2 md:grid-cols-6 gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search sneakers" className="col-span-2 md:col-span-2 bg-transparent border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
        <select value={filters.brand} onChange={e=>setFilters(f=>({...f, brand:e.target.value}))} className="bg-transparent border border-white/10 rounded-md px-3 py-2 text-white">
          <option value="">All Brands</option>
          {brands.map(b=> <option key={b} value={b}>{b}</option>)}
        </select>
        <input value={filters.model} onChange={e=>setFilters(f=>({...f, model:e.target.value}))} placeholder="Model" className="bg-transparent border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
        <input value={filters.minPrice} onChange={e=>setFilters(f=>({...f, minPrice:e.target.value}))} placeholder="Min $" className="bg-transparent border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
        <input value={filters.maxPrice} onChange={e=>setFilters(f=>({...f, maxPrice:e.target.value}))} placeholder="Max $" className="bg-transparent border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
        <button type="submit" className="bg-white text-black rounded-md px-4 py-2">Search</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {loading ? (
          [...Array(8)].map((_,i)=> <div key={i} className="h-56 rounded-xl bg-white/5 animate-pulse" />)
        ) : (
          items.map(s => (
            <a key={s.id} href={`/sneaker/${s.id}`} className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition">
              <img src={s.media.small} alt={s.name} className="rounded-lg aspect-[4/3] object-cover w-full" />
              <div className="mt-3">
                <div className="text-white font-semibold group-hover:underline line-clamp-1">{s.name}</div>
                <div className="text-zinc-300 text-sm">{s.brand} • {s.model}</div>
                <div className="text-emerald-400 text-sm mt-1">Lowest Ask: ${s.stockx.lowestAsk}</div>
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  )
}
