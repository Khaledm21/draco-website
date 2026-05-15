import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trash2, Heart } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import DragonLogo from '@/components/common/DragonLogo'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import FadeReveal from '@/components/animations/FadeReveal'
import { useWishlistStore, useCartStore } from '@/store'
import { formatPrice } from '@/utils'
export default function WishlistPage(){
  const {items,remove,clearWishlist}=useWishlistStore()
  const addItem=useCartStore(s=>s.addItem)
  const getProduct=slug=>({slug,sizes:[{label:'M',available:true}]})
  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">   
        <div className="border-b border-brand-border" style={{padding:'clamp(40px,5vw,70px) 0'}}>
          <div className="container-draco flex items-end justify-between">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <p className="font-condensed text-[11px] tracking-[.42em] text-brand-red mb-3">— SAVED PIECES</p>
              <h1 className="font-display tracking-wider" style={{fontSize:'clamp(52px,10vw,110px)'}}>WISHLIST</h1>
            </motion.div>
            {items.length>0&&(
              <motion.button initial={{opacity:0}} animate={{opacity:1}} onClick={clearWishlist}
                className="font-condensed text-[11px] tracking-widest text-zinc-700 hover:text-brand-red transition-colors mb-4 flex items-center gap-2">
                <Trash2 size={12} strokeWidth={1.5}/> CLEAR ALL
              </motion.button>
            )}
          </div>
        </div>
        <div className="container-draco" style={{padding:'clamp(40px,5vw,70px) clamp(20px,4vw,56px)'}}>
          {items.length===0?(
            <FadeReveal>
              <div className="flex flex-col items-center justify-center py-32 gap-8 text-center">
                <Heart size={72} strokeWidth={.8} className="text-zinc-900"/>
                <div>
                  <p className="font-display text-3xl tracking-wider mb-2">YOUR WISHLIST IS EMPTY</p>
                  <p className="font-condensed text-sm text-zinc-700 tracking-widest">Save pieces you love</p>
                </div>
                <Link to="/shop"><Button variant="primary" size="lg">EXPLORE THE SHOP</Button></Link>
              </div>
            </FadeReveal>
          ):(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{background:'#111'}}>
              <AnimatePresence>
                {items.map((item,i)=>(
                  <motion.div key={item.id} layout initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.95}}
                    transition={{delay:i*.07,duration:.45}} className="bg-brand-dark group">
                    <Link to={`/product/${item.slug}`}>
                      <div className="relative overflow-hidden" style={{height:'clamp(240px,25vw,320px)'}}>
                        <div className="absolute inset-0 flex items-center justify-center" style={{background:item.bg||'#111'}}>
                          {item.images && item.images.length > 0 ? (
                            <img src={item.images[0]} alt="" className="w-full h-full object-contain p-4 relative z-10" />
                          ) : (
                            <DragonLogo size={90} className="opacity-[.18] group-hover:opacity-[.45] transition-opacity duration-500 animate-glow-pulse"/>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"/>
                        {item.tag&&<div className="absolute top-4 left-4 z-10"><Badge>{item.tag}</Badge></div>}
                      </div>
                    </Link>
                    <div className="p-5 border-t border-brand-border">
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <Link to={`/product/${item.slug}`}><h3 className="font-condensed font-semibold tracking-wider text-sm hover:text-brand-red transition-colors">{item.name}</h3></Link>
                        <span className="font-display text-xl flex-shrink-0">{formatPrice(item.price)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm" fullWidth onClick={()=>addItem({...item,sizes:[{label:'M',available:true}]},'M')}>ADD TO BAG</Button>
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:.88}} onClick={()=>remove(item.id)}
                          className="w-9 h-9 border border-zinc-900 hover:border-brand-red flex items-center justify-center transition-colors flex-shrink-0">
                          <Trash2 size={12} strokeWidth={1.5}/>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
