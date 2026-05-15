import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DragonLogo from '@/components/common/DragonLogo'
export default function LoadingScreen({onComplete}){
  const [pct,set]=useState(0)
  const [done,setDone]=useState(false)
  useEffect(()=>{
    const t=setInterval(()=>set(p=>{const n=p+(Math.random()*2.5+1);if(n>=100){clearInterval(t);setDone(true);setTimeout(onComplete,500);return 100}return n}),24)
    return()=>clearInterval(t)
  },[onComplete])
  return(
    <AnimatePresence>
      {!done&&(
        <motion.div key="loader" className="fixed inset-0 z-[9999] bg-brand-black flex flex-col items-center justify-center overflow-hidden"
          exit={{opacity:0,scale:1.04}} transition={{duration:.65,ease:[.4,0,.2,1]}}>
          <div className="absolute inset-0 bg-grid-pattern opacity-25"/>
          <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 55% 50% at 50% 50%,rgba(220,38,38,.07) 0%,transparent 70%)'}}/>
          <motion.div initial={{opacity:0,scale:.2}} animate={{opacity:1,scale:1}} transition={{duration:.9,ease:[.16,1,.3,1]}} className="mb-8 animate-float">
            <DragonLogo size={120} glow/>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5,duration:.65}} className="text-center">
            <h1 className="font-display text-6xl tracking-[.45em] text-white">DRACO</h1>
            <p className="font-condensed text-[9px] tracking-[.65em] text-zinc-700 mt-2 uppercase">Luxury Streetwear</p>
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}} className="mt-14 flex flex-col items-center gap-3">
            <div className="w-56 h-px bg-zinc-900 relative overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 bg-brand-red" style={{width:`${pct}%`}}/>
              <div className="absolute inset-y-0 left-0 bg-red-400 blur-sm" style={{width:`${pct}%`,opacity:.4}}/>
            </div>
            <p className="font-condensed text-[10px] tracking-widest text-zinc-800 tabular-nums">{Math.round(pct)}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
