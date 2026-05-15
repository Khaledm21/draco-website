import { forwardRef, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'

const V = {
  primary: 'bg-brand-red text-white border border-transparent relative overflow-hidden',
  outline: 'bg-transparent border border-zinc-700 text-zinc-400 hover:border-white hover:text-white relative overflow-hidden',
  ghost:   'bg-transparent border border-brand-red/60 text-brand-red hover:bg-brand-red hover:text-white relative overflow-hidden',
  dark:    'bg-brand-surface border border-brand-border text-zinc-400 hover:border-zinc-600 hover:text-white relative overflow-hidden',
}
const S = {
  sm: 'px-7 py-3 text-[12px] tracking-[.28em] font-semibold',
  md: 'px-10 py-4 text-[13px] tracking-[.25em] font-bold',
  lg: 'px-14 py-5 text-[15px] tracking-[.3em] font-bold',
}

const Button = forwardRef(({ variant = 'primary', size = 'md', className = '', children, disabled = false, loading = false, fullWidth = false, ...props }, ref) => {
  const btnRef = useRef(null)
  const [mag, setMag] = useState({ x: 0, y: 0 })
  const [hov, setHov] = useState(false)

  const handleMove = (e) => {
    const el = (ref?.current || btnRef.current)
    if (!el) return
    const rect = el.getBoundingClientRect()
    setMag({
      x: (e.clientX - rect.left - rect.width / 2) * 0.16,
      y: (e.clientY - rect.top - rect.height / 2) * 0.16,
    })
  }

  const glowStyle = variant === 'primary'
    ? { boxShadow: hov ? '0 0 48px rgba(220,38,38,.55), 0 0 96px rgba(220,38,38,.2)' : '0 0 24px rgba(220,38,38,.25)' }
    : variant === 'ghost'
      ? { boxShadow: hov ? '0 0 30px rgba(220,38,38,.3)' : 'none' }
      : {}

  const base = cn(
    'inline-flex items-center justify-center gap-2 font-condensed uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red disabled:opacity-40 btn-magnetic',
    V[variant], S[size], fullWidth && 'w-full', className
  )

  return (
    <motion.button
      ref={ref || btnRef}
      className={base}
      disabled={disabled || loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setMag({ x: 0, y: 0 }) }}
      onMouseMove={handleMove}
      animate={{
        x: hov && !disabled ? mag.x : 0,
        y: hov && !disabled ? mag.y : 0,
        scale: hov && !disabled ? 1.03 : 1,
        ...glowStyle,
      }}
      whileTap={!disabled && !loading ? { scale: .96 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      style={glowStyle}
      {...props}
    >
      {/* Shimmer sweep on hover for primary */}
      {variant === 'primary' && hov && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-110%', skewX: '-20deg' }}
          animate={{ x: '110%' }}
          transition={{ duration: .55, ease: [.16, 1, .3, 1] }}
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.12) 50%, transparent 100%)' }}
        />
      )}
      {loading
        ? <><span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /><span>LOADING</span></>
        : children
      }
    </motion.button>
  )
})
Button.displayName = 'Button'
export default Button
