import { motion } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import CollectionCard from '@/components/collections/CollectionCard'
import { COLLECTIONS } from '@/services/dataService'
export default function CollectionsPage(){
  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">
        <div className="border-b border-brand-border" style={{padding:'clamp(40px,5vw,70px) 0'}}>
          <div className="container-draco">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <p className="font-condensed text-[11px] tracking-[.42em] text-brand-red mb-3">— ARCHIVES</p>
              <h1 className="font-display tracking-wider" style={{fontSize:'clamp(52px,10vw,110px)'}}>COLLECTIONS</h1>
            </motion.div>
          </div>
        </div>
        <div className="container-draco">
          {COLLECTIONS.map((col,i)=><CollectionCard key={col.id} collection={col} index={i}/>)}
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
