import { motion } from 'framer-motion'
import { cn } from '@/utils'
export default function SizeSelector({sizes,selected,onChange}){
  return(
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-condensed text-[11px] tracking-[.32em] text-zinc-500 uppercase">Select Size</span>
        <button className="font-condensed text-[11px] tracking-widest text-brand-red hover:text-red-400 transition-colors">Size Guide</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map(({label,available})=>(
          <motion.button key={label} whileHover={available?{scale:1.06}:{}} whileTap={available?{scale:.92}:{}}
            onClick={()=>available&&onChange(label)} disabled={!available}
            className={cn('size-btn',selected===label&&'selected',!available&&'opacity-30 line-through cursor-not-allowed')}>
            {label}
          </motion.button>
        ))}
      </div>
      {!selected&&<p className="font-condensed text-[10px] text-zinc-800 tracking-wider mt-2">Please select a size to continue</p>}
    </div>
  )
}
