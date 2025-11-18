import { motion } from 'framer-motion'
import { Button } from './ui/Button'

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.25),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.2),transparent_45%)]" />
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          SneakPeak
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 text-lg md:text-xl text-zinc-200 max-w-2xl"
        >
          Discover trending sneakers, track live prices, and customize your own — just like Nike By You.
        </motion.p>
        <div className="mt-8 flex gap-3">
          <Button onClick={onExplore} className="bg-white text-black hover:bg-zinc-100">Explore Sneakers</Button>
          <a href="#customizer" className="inline-flex items-center text-white/80 hover:text-white">Open Customizer →</a>
        </div>
      </div>
    </section>
  )
}
