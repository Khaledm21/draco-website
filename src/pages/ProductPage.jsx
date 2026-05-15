import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Share2 } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import ProductGallery from '@/components/product/ProductGallery'
import SizeSelector from '@/components/product/SizeSelector'
import ColorSelector from '@/components/product/ColorSelector'
import RelatedProducts from '@/components/product/RelatedProducts'
import Button from '@/components/common/Button'
import { useCartStore, useWishlistStore } from '@/store'
import { getProductBySlug, getRelatedProducts } from '@/services/dataService'
import { formatPrice, cn } from '@/utils'

export default function ProductPage(){
  const {slug}=useParams()
  const product=getProductBySlug(slug)
  if(!product) return <Navigate to="/shop" replace/>

  const [size,setSize]=useState(null)
  const [color,setColor]=useState(product.colors[0])
  const [tab,setTab]=useState(0)
  const [added,setAdded]=useState(false)
  const addItem=useCartStore(s=>s.addItem)
  const isWished=useWishlistStore(s=>s.isWished(product.id))
  const toggle=useWishlistStore(s=>s.toggle)
  const related=getRelatedProducts(product,3)

  // Get images based on selected color
  const displayImages = product.colorImages?.[color] || product.images

  const handleAdd=()=>{
    if(!size) return
    addItem({ ...product, selectedColor: color, images: displayImages }, size)
    setAdded(true)
    setTimeout(()=>setAdded(false),2500)
  }

  const tabs=['DETAILS','SHIPPING','CARE']
  const tabContent=[
    <div className="space-y-3.5">
      {product.specs.map(([k,v])=>(
        <div key={k} className="flex gap-8">
          <span className="font-condensed text-[10px] tracking-[.2em] text-zinc-700 w-24 flex-shrink-0 mt-0.5">{k}</span>
          <span className="text-zinc-400 text-sm">{v}</span>
        </div>
      ))}
    </div>,
    <p className="text-zinc-500 text-sm leading-relaxed">Free express shipping on orders over $300. Standard delivery 3–5 business days. Expedited 1–2 days. International shipping available to 40+ countries.</p>,
    <p className="text-zinc-500 text-sm leading-relaxed">Machine wash cold inside out. Do not tumble dry. Hang or lay flat to dry. Do not iron graphics. Treat this garment with the respect it commands.</p>,
  ]

  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">
        <div className="container-draco py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-condensed text-[11px] tracking-widest text-zinc-800 mb-10">
            <Link to="/shop" className="hover:text-zinc-500 transition-colors">SHOP</Link>
            <span className="text-zinc-900">/</span>
            <span className="text-zinc-600">{product.name}</span>
          </div>
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20">
            <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:.65,ease:[.16,1,.3,1]}}>
              <ProductGallery product={{ ...product, images: displayImages }}/>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:.65,ease:[.16,1,.3,1]}}>
              <p className="font-condensed text-[11px] tracking-[.4em] text-brand-red mb-3">{product.category.toUpperCase()}</p>
              <h1 className="font-display tracking-wider mb-4" style={{fontSize:'clamp(44px,7vw,72px)'}}>{product.name}</h1>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-4xl">{formatPrice(product.price)}</span>
                {product.comparePrice&&<span className="font-condensed text-sm text-zinc-700 line-through">{formatPrice(product.comparePrice)}</span>}
              </div>
              <div className="rule-red mb-7"/>
              <p className="text-zinc-400 leading-relaxed mb-8">{product.description}</p>
              
              <div className="space-y-10 mb-10">
                <ColorSelector 
                  colors={product.colors} 
                  colorNames={product.colorNames} 
                  selected={color} 
                  onChange={setColor}
                />
                <SizeSelector sizes={product.sizes} selected={size} onChange={setSize}/>
              </div>

              <div className="flex gap-3 mb-3">
                <Button variant="primary" size="lg" fullWidth onClick={handleAdd}
                  className={cn(!size&&'opacity-50 cursor-not-allowed')}>
                  {added?'✓  ADDED TO BAG':size?'ADD TO BAG':'SELECT A SIZE'}
                </Button>
                <motion.button whileHover={{scale:1.1}} whileTap={{scale:.88}} onClick={()=>toggle(product)}
                  className="flex-shrink-0 w-[52px] h-[52px] border border-brand-border flex items-center justify-center hover:border-zinc-600 transition-colors">
                  <Heart size={18} strokeWidth={1.5} className={cn(isWished?'fill-brand-red stroke-brand-red':'stroke-zinc-500')}/>
                </motion.button>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-brand-border hover:border-zinc-700 font-condensed tracking-[.25em] text-xs text-zinc-600 hover:text-white transition-colors mb-8">
                <Share2 size={12} strokeWidth={1.5}/> SHARE
              </button>
              <div className="rule-dim"/>
              <div className="mt-8">
                <div className="flex gap-7 border-b border-brand-border mb-6">
                  {tabs.map((t,i)=>(
                    <button key={t} onClick={()=>setTab(i)}
                      className={cn('font-condensed text-[11px] tracking-[.28em] pb-3 transition-all',
                        tab===i?'text-white border-b border-brand-red':'text-zinc-700 hover:text-zinc-400')}>
                      {t}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={tab} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.3}}>
                    {tabContent[tab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          <div className="mt-24"><RelatedProducts products={related}/></div>
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
