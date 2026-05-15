import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import DragonLogo from '@/components/common/DragonLogo'
import Badge from '@/components/common/Badge'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPrice, cn } from '@/utils'

export default function ProductCard({ product, index = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const addItem = useCartStore(s => s.addItem)
  const isWished = useWishlistStore(s => s.isWished(product.id))
  const toggle = useWishlistStore(s => s.toggle)
  const midSize = product.sizes.find(s => s.available) || product.sizes[0]

  const [imgIdx, setImgIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let interval
    if (isHovered && product.images && product.images.length > 1) {
      interval = setInterval(() => {
        setImgIdx(prev => (prev + 1) % product.images.length)
      }, 1200)
    } else {
      setImgIdx(0)
    }
    return () => clearInterval(interval)
  }, [isHovered, product.images])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: 'clamp(260px, 28vw, 380px)' }}>
        <div className="card-img absolute inset-0 flex items-center justify-center" style={{ background: product.bg }}>
          {product.images && product.images.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIdx}
                src={product.images[imgIdx]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full object-contain p-6 relative z-10"
              />
            </AnimatePresence>
          ) : (
            <DragonLogo size={110} className="opacity-[.18] group-hover:opacity-[.5] transition-opacity duration-700 animate-glow-pulse" />
          )}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
        
        {/* Progress indicators for images */}
        {isHovered && product.images?.length > 1 && (
          <div className="absolute top-4 inset-x-4 z-20 flex gap-1">
            {product.images.map((_, i) => (
              <div key={i} className="h-[2px] flex-1 bg-white/20 overflow-hidden">
                <motion.div 
                  className="h-full bg-brand-red"
                  initial={{ width: 0 }}
                  animate={{ width: i === imgIdx ? '100%' : i < imgIdx ? '100%' : '0%' }}
                  transition={{ duration: i === imgIdx ? 1.2 : 0, ease: "linear" }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="quick-add absolute inset-x-0 bottom-5 flex justify-center z-10">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: .95 }}
            onClick={e => { e.preventDefault(); addItem(product, midSize.label) }}
            className="px-8 py-3 bg-brand-red hover:bg-red-700 font-condensed tracking-[.25em] text-[13px] font-bold text-white transition-colors"
            style={{ boxShadow: '0 6px 24px rgba(220,38,38,.45)' }}
          >
            QUICK ADD
          </motion.button>
        </div>
        
        {product.tag && <div className="absolute top-4 left-4 z-10"><Badge>{product.tag}</Badge></div>}
        
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: .88 }}
          onClick={e => { e.preventDefault(); toggle(product) }}
          className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart size={18} strokeWidth={1.5} className={cn('transition-colors', isWished ? 'fill-brand-red stroke-brand-red' : 'stroke-white')} />
        </motion.button>
      </div>
      
      <Link to={`/product/${product.slug}`} className="block">
        <div className="p-5 border-t border-brand-border">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-condensed font-bold tracking-widest text-[16px] group-hover:text-brand-red transition-colors">{product.name}</h3>
            <div className="text-right flex-shrink-0">
              <span className="font-display text-2xl leading-none">{formatPrice(product.price)}</span>
              {product.comparePrice && <span className="block font-condensed text-[12px] text-zinc-600 line-through mt-0.5">{formatPrice(product.comparePrice)}</span>}
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-condensed text-[12px] font-medium tracking-[.25em] text-zinc-600">{product.category.toUpperCase()}</span>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full border border-zinc-800" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

