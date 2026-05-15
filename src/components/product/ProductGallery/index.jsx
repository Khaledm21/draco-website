import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DragonLogo from '@/components/common/DragonLogo'
import { cn } from '@/utils'
export default function ProductGallery({product}){
  const [active,setActive]=useState(0)
  const images = product.images || []

  useEffect(() => {
    setActive(0)
  }, [product.images])
  
  return(
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center overflow-hidden scan-wrap" style={{height:'clamp(380px,50vw,560px)',background:product.bg,border:'1px solid #1a1a1a'}}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.45,ease:[.16,1,.3,1]}} className="w-full h-full flex items-center justify-center">
            {images.length > 0 ? (
              <img 
                src={images[active]} 
                alt={`${product.name} - view ${active + 1}`}
                className="w-full h-full object-contain relative z-10 p-4"
              />
            ) : (
              <div className="animate-float">
                <DragonLogo size={210} glow/>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {product.tag&&<div className="absolute top-5 left-5 z-10"><span className="tag-badge">{product.tag}</span></div>}
        <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(to bottom,transparent 60%,rgba(0,0,0,.4) 100%)'}}/>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.length > 0 ? (
          images.map((img, i) => (
            <motion.button key={i} whileHover={{scale:1.04}} whileTap={{scale:.94}} onClick={()=>setActive(i)}
              className={cn('flex-shrink-0 w-20 h-20 flex items-center justify-center transition-all overflow-hidden',active===i?'border border-brand-red':'border border-brand-border hover:border-zinc-700')}
              style={{background:product.bg}}>
              <img src={img} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </motion.button>
          ))
        ) : (
          [0,1,2].map(i=>(
            <motion.button key={i} whileHover={{scale:1.04}} whileTap={{scale:.94}} onClick={()=>setActive(i)}
              className={cn('flex-1 flex items-center justify-center transition-all',active===i?'border border-brand-red':'border border-brand-border hover:border-zinc-700')}
              style={{height:72,background:product.bg}}>
              <DragonLogo size={26} className="opacity-20"/>
            </motion.button>
          ))
        )}
      </div>
    </div>
  )
}
