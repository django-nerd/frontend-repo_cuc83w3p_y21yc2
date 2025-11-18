import { useMemo, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import TrendingGrid from './components/TrendingGrid'
import Explorer from './components/Explorer'
import SneakerPage from './components/SneakerPage'

function Home(){
  const [jump, setJump] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="text-white font-extrabold tracking-tight text-xl">SneakPeak</a>
          <nav className="hidden md:flex gap-6 text-zinc-300">
            <a href="#explorer" className="hover:text-white">Explore</a>
            <a href="#customizer" className="hover:text-white">Customizer</a>
            <a href="/test" className="hover:text-white">System</a>
          </nav>
        </div>
      </div>
      <Hero onExplore={()=>{
        setJump(true); setTimeout(()=>{
          document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })
        }, 50)
      }} />
      <TrendingGrid />
      <Explorer />
      <footer className="max-w-7xl mx-auto px-6 py-12 text-zinc-400">© {new Date().getFullYear()} SneakPeak</footer>
    </div>
  )
}

function SneakerRoute(){
  const id = window.location.pathname.split('/').pop()
  return <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"><SneakerPage sneakerId={id} /></div>
}

export default function App(){
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/sneaker/:id" element={<SneakerRoute />} />
    </Routes>
  )
}
