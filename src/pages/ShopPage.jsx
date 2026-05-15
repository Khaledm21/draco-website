import { motion } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import ShopFilters from '@/components/shop/ShopFilters'
import ProductGrid from '@/components/shop/ProductGrid'
import { useShopStore } from '@/store'
import { filterProducts } from '@/services/dataService'
export default function ShopPage(){
  const {activeCategory,activeSort}=useShopStore()
  const products=filterProducts({category:activeCategory,sort:activeSort})
  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">
        <div className="border-b border-brand-border" style={{padding:'clamp(40px,5vw,70px) 0'}}>
          <div className="container-draco">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <p className="font-condensed text-[11px] tracking-[.42em] text-brand-red mb-3">— ALL PIECES</p>
              <h1 className="font-display tracking-wider" style={{fontSize:'clamp(52px,10vw,110px)'}}>THE SHOP</h1>
            </motion.div>
          </div>
        </div>
        <div className="container-draco">
          <ShopFilters count={products.length}/>
          <div className="py-10"><ProductGrid products={products}/></div>
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
