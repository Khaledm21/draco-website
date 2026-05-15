import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Heart, Menu } from 'lucide-react'
import DragonLogo from '@/components/common/DragonLogo'
import { useScrolled } from '@/hooks'
import { useCartStore, useWishlistStore, useUIStore } from '@/store'
import { NAV_LINKS } from '@/services/dataService'
import { cn } from '@/utils'

function MagneticLink({ to, label, isActive }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.22, y: (e.clientY - rect.top - rect.height / 2) * 0.22 })
  }

  return (
    <Link
      ref={ref}
      to={to}
      data-label={label}
      className={cn('nav-link group relative py-1', isActive && 'active')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }) }}
      onMouseMove={handleMove}
      style={{
        transform: hovered ? `translate(${pos.x}px, ${pos.y}px)` : 'translate(0,0)',
        transition: hovered ? 'transform .1s linear, color .3s' : 'transform .5s cubic-bezier(0.16,1,0.3,1), color .3s',
      }}
    >
      {/* base text */}
      <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-0 text-[13px] tracking-[.25em] uppercase">{label}</span>
      {/* revealed white text overlay */}
      <span
        className="absolute inset-0 flex items-center font-condensed text-[13px] tracking-[.25em] uppercase text-white overflow-hidden"
        style={{ width: hovered ? '100%' : '0', transition: 'width .38s cubic-bezier(0.16,1,0.3,1)', whiteSpace: 'nowrap' }}
      >{label}</span>
      {/* underline */}
      <span
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-brand-red to-transparent"
        style={{ width: (hovered || isActive) ? '100%' : '0', transition: 'width .4s cubic-bezier(0.16,1,0.3,1)' }}
      />
      {/* glow spot */}
      {hovered && (
        <motion.span
          className="absolute -inset-3 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,.06) 0%, transparent 70%)' }}
        />
      )}
    </Link>
  )
}

export default function Navbar() {
  const location = useLocation()
  const scrolled = useScrolled(80)
  const [scrollProgress, setScrollProgress] = useState(0)
  const cartCount = useCartStore(s => s.items.reduce((n, i) => n + i.qty, 0))
  const wishCount = useWishlistStore(s => s.items.length)
  const openCart = useCartStore(s => s.openCart)
  const openMobile = useUIStore(s => s.openMobileNav)

  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setScrollProgress(Math.min(p, 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: .85, ease: [.16, 1, .3, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-700',
          scrolled ? 'nav-glass' : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container-draco flex items-center justify-between h-[68px]">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            >
              <DragonLogo size={48} glow />
            </motion.div>
            <motion.span
              className="font-display text-[30px] tracking-[.42em] text-white relative"
              whileHover={{ letterSpacing: '.5em' }}
              transition={{ duration: .4, ease: [.16, 1, .3, 1] }}
            >
              DRACO
              {scrolled && (
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-brand-red/50 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: .5, ease: [.16, 1, .3, 1] }}
                />
              )}
            </motion.span>
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <MagneticLink
                key={link.path}
                to={link.path}
                label={link.label}
                isActive={location.pathname === link.path}
              />
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-5">
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: .88 }}>
              <Link to="/wishlist" className="relative text-zinc-600 hover:text-white transition-colors duration-300 hidden sm:block group">
                <Heart size={18} strokeWidth={1.5} />
                <AnimatePresence>
                  {wishCount > 0 && (
                    <motion.span
                      key="wc"
                      initial={{ scale: 0, y: 4 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="absolute -top-2.5 -right-2.5 w-4 h-4 bg-brand-red rounded-full font-condensed text-[8px] font-bold flex items-center justify-center text-white shadow-[0_0_8px_rgba(220,38,38,.6)]"
                    >{wishCount}</motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>

            <motion.button
              onClick={openCart}
              className="relative text-zinc-600 hover:text-white transition-colors duration-300 group"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: .88 }}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cc"
                    initial={{ scale: 0, y: 4 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-brand-red rounded-full font-condensed text-[9px] font-bold flex items-center justify-center text-white shadow-[0_0_10px_rgba(220,38,38,.6)]"
                  >{cartCount}</motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={openMobile}
              className="md:hidden text-zinc-600 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }}
            >
              <Menu size={20} strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>

        {/* Scroll progress line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-brand-red via-brand-red to-transparent origin-left"
          style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
          transition={{ ease: 'linear' }}
        />
      </motion.header>
    </>
  )
}
