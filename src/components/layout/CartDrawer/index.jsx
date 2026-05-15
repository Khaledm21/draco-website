import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import DragonLogo from '@/components/common/DragonLogo'
import Button from '@/components/common/Button'
import { useCartStore } from '@/store'
import { formatPrice } from '@/utils'
import { useLockBodyScroll } from '@/hooks'
export default function CartDrawer(){
  const {items,isOpen,closeCart,updateQty,removeItem}=useCartStore()
  const subtotal=items.reduce((s,i)=>s+i.price*i.qty,0)
  useLockBodyScroll(isOpen)
  return(
    <AnimatePresence>
      {isOpen&&(
        <>
          <motion.div key="bd" className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={closeCart}/>
          <motion.aside key="dr" className="fixed top-0 right-0 bottom-0 z-[201] flex flex-col bg-[#0b0b0b] border-l border-brand-border" style={{width:'min(100vw,440px)'}}
            initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28,stiffness:260}}>
            <div className="flex items-center justify-between px-7 py-5 border-b border-brand-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl tracking-[.2em]">YOUR BAG</span>
                <span className="font-condensed text-[10px] tracking-widest text-zinc-700 border border-zinc-900 px-2 py-1">{items.length} ITEMS</span>
              </div>
              <motion.button onClick={closeCart} className="text-zinc-600 hover:text-white transition-colors" whileHover={{scale:1.1,rotate:90}} whileTap={{scale:.9}}>
                <X size={20} strokeWidth={1.5}/>
              </motion.button>
            </div>
            <div className="flex-1 overflow-y-auto px-7 py-6 no-scrollbar">
              <AnimatePresence initial={false}>
                {items.length===0?(
                  <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="h-full flex flex-col items-center justify-center gap-6 text-center py-20">
                    <DragonLogo size={72} className="opacity-10"/>
                    <p className="font-condensed text-sm tracking-[.25em] text-zinc-700">YOUR BAG IS EMPTY</p>
                    <button onClick={closeCart}><Link to="/shop" className="font-condensed text-xs tracking-widest text-brand-red border border-brand-red px-6 py-2.5">EXPLORE THE SHOP</Link></button>
                  </motion.div>
                ):items.map(item=>(
                  <motion.div key={item.key} layout initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24,height:0,marginBottom:0}} transition={{duration:.35}}
                    className="flex gap-5 pb-6 mb-6 border-b border-brand-border last:border-0 last:mb-0">
                    <div className="w-[78px] h-[94px] flex-shrink-0 flex items-center justify-center overflow-hidden" style={{background:item.bg||'#111',border:'1px solid #1a1a1a'}}>
                      {item.images && item.images.length > 0 ? (
                        <img src={item.images[0]} alt="" className="w-full h-full object-contain p-2" />
                      ) : (
                        <DragonLogo size={32} className="opacity-25"/>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-condensed font-semibold tracking-wider text-sm truncate">{item.name}</p>
                      <p className="font-condensed text-[11px] text-zinc-600 tracking-widest mt-0.5">SIZE: {item.size}</p>
                      <p className="text-brand-red font-condensed text-sm mt-1 font-semibold">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:.88}} onClick={()=>updateQty(item.key,-1)} className="w-7 h-7 border border-zinc-900 hover:border-red-700 flex items-center justify-center transition-colors"><Minus size={9}/></motion.button>
                        <span className="font-condensed text-sm w-5 text-center tabular-nums">{item.qty}</span>
                        <motion.button whileHover={{scale:1.1}} whileTap={{scale:.88}} onClick={()=>updateQty(item.key,1)} className="w-7 h-7 border border-zinc-900 hover:border-red-700 flex items-center justify-center transition-colors"><Plus size={9}/></motion.button>
                        <button onClick={()=>removeItem(item.key)} className="ml-auto font-condensed text-[10px] tracking-widest text-zinc-700 hover:text-brand-red transition-colors">REMOVE</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {items.length>0&&(
              <div className="px-7 py-6 border-t border-brand-border flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-condensed text-[11px] tracking-[.3em] text-zinc-600">SUBTOTAL</span>
                  <span className="font-display text-3xl">{formatPrice(subtotal)}</span>
                </div>
                <p className="font-condensed text-[10px] text-zinc-800 tracking-wider mb-4">Shipping & taxes calculated at checkout</p>
                <Button variant="primary" size="lg" fullWidth className="mb-3">CHECKOUT — {formatPrice(subtotal)}</Button>
                <Button variant="dark" size="md" fullWidth onClick={closeCart}>CONTINUE SHOPPING</Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
