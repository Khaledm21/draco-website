import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import DragonLogo from '@/components/common/DragonLogo'
import FadeReveal from '@/components/animations/FadeReveal'
import { LOOKS } from '@/services/dataService'
export default function LookbookPage(){
  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">
        <div className="border-b border-brand-border" style={{padding:'clamp(40px,5vw,70px) 0'}}>
          <div className="container-draco">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <p className="font-condensed text-[11px] tracking-[.42em] text-brand-red mb-3">— SS 2025 CAMPAIGN</p>
              <h1 className="font-display tracking-wider" style={{fontSize:'clamp(52px,10vw,110px)'}}>LOOKBOOK</h1>
            </motion.div>
          </div>
        </div>
        <div className="container-draco py-0">
          <FadeReveal>
            <div className="relative flex items-center justify-center overflow-hidden scan-wrap mb-px cursor-pointer"
              style={{height:'clamp(320px,45vw,520px)',background:'linear-gradient(135deg,#1a0000,#000 60%,#0a0a0a)',border:'1px solid #1a1a1a'}}>
              <motion.div className="animate-float" whileHover={{scale:1.06}} transition={{duration:.8}}>
                <DragonLogo size={230} glow/>
              </motion.div>
              <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 55%)'}}/>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div>
                  <p className="font-condensed text-[10px] tracking-[.4em] text-brand-red mb-2">EDITORIAL</p>
                  <h3 className="font-display text-5xl tracking-wider">THE VOID SERIES</h3>
                  <p className="font-condensed text-sm text-zinc-500 mt-1 tracking-wider">SS 2025 · Campaign 001</p>
                </div>
                <Link to="/shop" className="hidden sm:flex items-center gap-2 px-6 py-3 font-condensed text-xs tracking-widest text-white hover:text-brand-red transition-colors border border-white/15 hover:border-brand-red">
                  SHOP THE LOOK <ArrowRight size={12} strokeWidth={1.5}/>
                </Link>
              </div>
            </div>
          </FadeReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{background:'#111'}}>
            {LOOKS.map((look,i)=>(
              <motion.div key={look.id} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:i*.07}}
                className="group cursor-pointer bg-brand-dark overflow-hidden" onClick={()=>{}}>
                <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${look.bg}`}
                  style={{height:'clamp(220px,25vw,340px)'}}>
                  <motion.div whileHover={{scale:1.1}} transition={{duration:.7}}
                    className="opacity-[.18] group-hover:opacity-[.5] transition-opacity duration-500">
                    <DragonLogo size={120} className="animate-glow-pulse"/>
                  </motion.div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                    <p className="font-condensed text-sm text-zinc-300 tracking-wider">{look.sub}</p>
                  </div>
                  <div className="absolute top-4 right-4 font-display text-5xl text-white/[.04] select-none">{look.num}</div>
                </div>
                <div className="p-5 border-t border-brand-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl tracking-wider group-hover:text-brand-red transition-colors">{look.title}</h3>
                    <span className="font-condensed text-[9px] text-zinc-800 tracking-widest">{look.num}</span>
                  </div>
                  <p className="font-condensed text-xs text-zinc-700 tracking-wider mt-1">{look.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
