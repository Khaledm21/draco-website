import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { X, Instagram, Twitter, ArrowUpRight } from 'lucide-react'
import DragonLogo from '@/components/common/DragonLogo'
import { useUIStore } from '@/store'
import { NAV_LINKS } from '@/services/dataService'
import { useLockBodyScroll } from '@/hooks'

export default function MobileMenu() {
  const isOpen = useUIStore(s => s.mobileNavOpen)
  const close  = useUIStore(s => s.closeMobileNav)
  const location = useLocation()
  useLockBodyScroll(isOpen)
  useEffect(() => { close() }, [location.pathname])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: .07, delayChildren: .22 } },
    exit:   { transition: { staggerChildren: .04, staggerDirection: -1 } },
  }
  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: .7, ease: [.16, 1, .3, 1] } },
    exit:   { y: -30, opacity: 0, transition: { duration: .35, ease: [.4, 0, .2, 1] } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mob-menu"
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: .65, ease: [.16, 1, .3, 1] }}
          style={{ background: '#000' }}
        >
          {/* Atmospheric background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(220,38,38,.06) 0%, transparent 70%)' }} />
          </div>

          {/* Noise film grain */}
          <div className="film-grain opacity-[.06]" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/[.04]">
            <Link to="/" className="flex items-center gap-3">
              <DragonLogo size={34} glow />
              <span className="font-display text-[20px] tracking-[.4em] text-white">DRACO</span>
            </Link>
            <motion.button
              onClick={close}
              className="relative w-11 h-11 flex items-center justify-center text-zinc-500 hover:text-white transition-colors border border-white/[.06] hover:border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .9 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 0 : 45 }}
                transition={{ duration: .3 }}
              >
                <X size={18} strokeWidth={1.5} />
              </motion.div>
            </motion.button>
          </div>

          {/* Nav Items */}
          <motion.nav
            className="relative z-10 flex-1 flex flex-col justify-center px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div key={link.path} variants={itemVariants}>
                <Link
                  to={link.path}
                  className="group flex items-center justify-between py-5 border-b border-white/[.05] hover:border-white/[.1] transition-colors"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-condensed text-[11px] tracking-widest text-zinc-700 w-6 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-display text-[clamp(46px,10vw,80px)] leading-none text-zinc-400 group-hover:text-white transition-colors duration-400"
                      style={{ transition: 'color .4s cubic-bezier(0.16,1,0.3,1)' }}
                    >
                      {link.label}
                    </span>
                  </div>
                  <motion.div
                    className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -8, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    <ArrowUpRight size={22} strokeWidth={1} />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Footer */}
          <motion.div
            className="relative z-10 px-8 py-6 border-t border-white/[.04] flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .55, duration: .5, ease: [.16, 1, .3, 1] }}
          >
            <div className="flex gap-5">
              <a href="#" className="text-zinc-700 hover:text-white transition-colors p-2 hover:bg-white/[.04]">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-zinc-700 hover:text-white transition-colors p-2 hover:bg-white/[.04]">
                <Twitter size={16} strokeWidth={1.5} />
              </a>
            </div>
            <div className="text-right">
              <p className="font-condensed text-[9px] tracking-[.45em] text-zinc-800 uppercase">Break Your Limits</p>
              <p className="font-condensed text-[9px] tracking-[.3em] text-zinc-900 uppercase mt-0.5">DRACO © 2025</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
