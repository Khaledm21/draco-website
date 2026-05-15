import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '@/components/shop/ProductCard'
export default function ProductGrid({products}){
  if(products.length===0) return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="py-32 text-center">
      <p className="font-condensed text-zinc-700 tracking-[.3em] text-sm">NO PIECES FOUND</p>
    </motion.div>
  )
  return(
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{background:'#111'}}>
      <AnimatePresence mode="popLayout">
        {products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}
      </AnimatePresence>
    </motion.div>
  )
}
