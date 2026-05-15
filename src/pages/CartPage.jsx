import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import DragonLogo from '@/components/common/DragonLogo'
import Button from '@/components/common/Button'
import FadeReveal from '@/components/animations/FadeReveal'
import { useCartStore } from '@/store'
import { formatPrice } from '@/utils'
export default function CartPage(){
  const {items,updateQty,removeItem,clearCart}=useCartStore()
  const subtotal=items.reduce((s,i)=>s+i.price*i.qty,0)
  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">
        <div className="border-b border-brand-border" style={{padding:'clamp(40px,5vw,70px) 0'}}>
          <div className="container-draco flex items-end justify-between">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <p className="font-condensed text-[11px] tracking-[.42em] text-brand-red mb-3">— YOUR SELECTIONS</p>
              <h1 className="font-display tracking-wider" style={{fontSize:'clamp(52px,10vw,110px)'}}>YOUR BAG</h1>
            </motion.div>
            {items.length>0&&(
              <motion.button initial={{opacity:0}} animate={{opacity:1}} onClick={clearCart}
                className="font-condensed text-[11px] tracking-widest text-zinc-700 hover:text-brand-red transition-colors mb-4 flex items-center gap-2">
                <Trash2 size={12} strokeWidth={1.5}/> CLEAR BAG
              </motion.button>
            )}
          </div>
        </div>
        <div className="container-draco" style={{padding:'clamp(40px,5vw,70px) clamp(20px,4vw,56px)'}}>
          {items.length===0?(
            <FadeReveal>
              <div className="flex flex-col items-center justify-center py-32 gap-8 text-center">
                <DragonLogo size={90} className="opacity-10"/>
                <div>
                  <p className="font-display text-3xl tracking-wider mb-2">YOUR BAG IS EMPTY</p>
                  <p className="font-condensed text-sm text-zinc-700 tracking-widest">Begin your collection</p>
                </div>
                <Link to="/shop">
                  <Button variant="primary" size="lg"><ShoppingBag size={14} strokeWidth={1.5}/>EXPLORE THE SHOP</Button>
                </Link>
              </div>
            </FadeReveal>
          ):(
            <div className="grid lg:grid-cols-[1fr_380px] gap-12">
              <div>
                <div className="rule-dim mb-0"/>
                <AnimatePresence>
                  {items.map(item=>(
                    <motion.div key={item.key} layout initial={{opacity:0,x:24}} animate={{opacity:1,x:0}}
                      exit={{opacity:0,x:-24,height:0}} transition={{duration:.35}}
                      className="flex gap-6 py-8 border-b border-brand-border">
                      <div className="w-24 h-28 flex-shrink-0 flex items-center justify-center scan-wrap"
                        style={{background:item.bg||'#111',border:'1px solid #1a1a1a'}}>
                        {item.images && item.images.length > 0 ? (
                          <img src={item.images[0]} alt="" className="w-full h-full object-contain p-3 relative z-10" />
                        ) : (
                          <DragonLogo size={38} className="opacity-25"/>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link to={`/product/${item.slug}`} className="font-condensed font-semibold tracking-wider hover:text-brand-red transition-colors block">{item.name}</Link>
                            <p className="font-condensed text-[11px] text-zinc-600 tracking-widest mt-1">SIZE: {item.size}</p>
                          </div>
                          <span className="font-display text-2xl flex-shrink-0">{formatPrice(item.price*item.qty)}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-5">
                          <div className="flex items-center gap-2">                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:.88}} onClick={()=>updateQty(item.key,-1)}
                              className="w-8 h-8 border border-zinc-900 hover:border-brand-red flex items-center justify-center transition-colors">
                              <Minus size={10} strokeWidth={1.5}/>
                            </motion.button>
                            <span className="font-condensed w-8 text-center tabular-nums text-sm">{item.qty}</span>
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:.88}} onClick={()=>updateQty(item.key,1)}
                              className="w-8 h-8 border border-zinc-900 hover:border-brand-red flex items-center justify-center transition-colors">
                              <Plus size={10} strokeWidth={1.5}/>
                            </motion.button>
                          </div>
                          <button onClick={()=>removeItem(item.key)} className="ml-auto flex items-center gap-1.5 font-condensed text-[10px] tracking-widest text-zinc-700 hover:text-brand-red transition-colors">
                            <Trash2 size={10} strokeWidth={1.5}/> REMOVE
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <FadeReveal direction="right" delay={.1}>
                <div className="bg-brand-dark border border-brand-border p-8 sticky top-28">
                  <h3 className="font-display text-2xl tracking-wider mb-8">ORDER SUMMARY</h3>
                  <div className="space-y-4 mb-6">
                    {[['Subtotal',formatPrice(subtotal)],['Shipping','Calculated at checkout'],['Taxes','Calculated at checkout']].map(([l,v])=>(
                      <div key={l} className="flex justify-between">
                        <span className="font-condensed text-xs tracking-[.25em] text-zinc-600">{l}</span>
                        <span className="font-condensed text-xs tracking-wider text-zinc-400">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rule-dim mb-6"/>
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-condensed text-[11px] tracking-[.3em] text-zinc-500">TOTAL</span>
                    <span className="font-display text-3xl">{formatPrice(subtotal)}</span>
                  </div>
                  <Button variant="primary" size="lg" fullWidth className="mb-3">PROCEED TO CHECKOUT</Button>
                  <Link to="/shop"><Button variant="dark" size="md" fullWidth>CONTINUE SHOPPING</Button></Link>
                  <div className="mt-6 flex items-center gap-2 justify-center">
                    <span className="font-condensed text-[10px] text-zinc-800 tracking-widest">SECURE CHECKOUT · SSL ENCRYPTED</span>
                  </div>
                </div>
              </FadeReveal>
            </div>
          )}
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
