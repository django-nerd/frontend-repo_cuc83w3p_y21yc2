import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import Customizer from './Customizer'

export default function SneakerPage({ sneakerId }){
  const [sneaker, setSneaker] = useState(null)
  const [live, setLive] = useState(null)

  useEffect(()=>{
    apiGet(`/api/sneakers/${sneakerId}`).then(setSneaker)
  }, [sneakerId])

  useEffect(()=>{
    let t
    async function tick(){
      try { const d = await apiGet(`/api/stockx/${sneakerId}/live`); setLive(d) } catch {}
      t = setTimeout(tick, 5000)
    }
    tick()
    return ()=> clearTimeout(t)
  }, [sneakerId])

  if(!sneaker) return <div className="text-white p-6">Loading...</div>

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <img src={sneaker.media.large} alt={sneaker.name} className="rounded-2xl shadow-lg" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{sneaker.name}</h1>
            <div className="text-zinc-300 mt-2">{sneaker.brand} • {sneaker.model} • {sneaker.colorway}</div>
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4 text-white">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-zinc-300 text-xs">Lowest Ask</div>
                  <div className="text-emerald-400 text-xl font-semibold">${live?.lowestAsk ?? sneaker.stockx.lowestAsk}</div>
                </div>
                <div>
                  <div className="text-zinc-300 text-xs">Highest Bid</div>
                  <div className="text-rose-400 text-xl font-semibold">${live?.highestBid ?? sneaker.stockx.highestBid}</div>
                </div>
                <div>
                  <div className="text-zinc-300 text-xs">Last Sale</div>
                  <div className="text-white text-xl font-semibold">${live?.lastSale ?? sneaker.stockx.lastSale}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-zinc-400">Volatility: {live?.volatility ?? sneaker.stockx.volatility} • Sales (72h): {live?.salesLast72h ?? sneaker.stockx.salesLast72h} • As of: {live?.asOf ? new Date(live.asOf).toLocaleTimeString() : '—'}</div>
            </div>
            <div className="mt-6">
              <a href="#customizer" className="inline-flex items-center px-4 py-2 rounded-md bg-white text-black font-semibold">Customize this Sneaker</a>
            </div>
          </div>
        </div>
      </section>
      <Customizer sneaker={sneaker} />
    </div>
  )
}
