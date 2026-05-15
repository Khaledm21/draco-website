import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import DragonLogo from '@/components/common/DragonLogo'
export default function CollectionCard({collection,index=0}){
  return(
    <motion.div initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.1,duration:.6,ease:[.16,1,.3,1]}}
      className="group border-b border-brand-border">
      <Link to={`/collections/${collection.slug}`} className="block py-14">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="flex items-center gap-5 mb-5">
              <span className="font-condensed text-[11px] tracking-[.3em] text-brand-red">{collection.subtitle}</span>
              <span className="w-px h-4 bg-zinc-900 block"/>
              <span className="font-condensed text-[11px] tracking-[.3em] text-zinc-800">{collection.itemCount} PIECES</span>
            </div>
            <h2 className="font-display tracking-wider text-white group-hover:text-brand-red transition-colors duration-300 mb-5"
              style={{fontSize:'clamp(44px,8vw,80px)'}}>{collection.name}</h2>
            <p className="text-zinc-600 leading-relaxed max-w-xl">{collection.description}</p>
          </div>
          <div className="flex items-center gap-6">
            <motion.div whileHover={{rotate:360}} transition={{duration:1.2,ease:'easeInOut'}}
              className="opacity-[.15] group-hover:opacity-50 transition-opacity duration-500">
              <DragonLogo size={90}/>
            </motion.div>
            <ArrowRight size={22} strokeWidth={1.5} className="text-zinc-900 group-hover:text-brand-red transition-colors group-hover:translate-x-2 transform duration-300"/>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
