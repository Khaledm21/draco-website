import { motion } from 'framer-motion'
import { useShopStore } from '@/store'
import { CATEGORIES, SORT_OPTIONS } from '@/services/dataService'
import { cn } from '@/utils'
export default function ShopFilters({count}){
  const {activeCategory,activeSort,setCategory,setSort}=useShopStore()
  return(
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-brand-border">
      <div className="flex items-center gap-1.5 flex-wrap">
        {CATEGORIES.map(cat=>(
          <motion.button key={cat} whileHover={{scale:1.04}} whileTap={{scale:.95}} onClick={()=>setCategory(cat)}
            className={cn('px-4 py-2 font-condensed text-[11px] tracking-[.25em] uppercase transition-colors',
              activeCategory===cat?'bg-brand-red text-white border border-brand-red':'text-zinc-600 hover:text-white border border-transparent hover:border-zinc-800')}>
            {cat}
          </motion.button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-condensed text-[10px] tracking-widest text-zinc-800">{count} PIECES</span>
        <div className="relative">
          <select value={activeSort} onChange={e=>setSort(e.target.value)} className="draco-input py-2 pl-3 pr-8 text-[11px] tracking-[.2em]" style={{width:'auto',minWidth:180}}>
            {SORT_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700">▾</span>
        </div>
      </div>
    </div>
  )
}
