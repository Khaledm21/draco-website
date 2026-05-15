import { Link } from 'react-router-dom'
import { Instagram, Twitter } from 'lucide-react'
import DragonLogo from '@/components/common/DragonLogo'
const LINKS={
  SHOP:[['All Pieces','/shop'],['New Drops','/shop'],['Collections','/collections'],['Lookbook','/lookbook']],
  BRAND:[['Philosophy','/about'],['Contact','/contact'],['Size Guide','/shop'],['Press','/contact']],
  LEGAL:[['Privacy Policy','#'],['Terms of Use','#'],['Returns','#'],['Shipping','#']],
}
export default function Footer(){
  return(
    <footer className="border-t border-brand-border bg-brand-black">
      <div className="container-draco pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14 border-b border-brand-border">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6"><DragonLogo size={36} glow/><span className="font-display text-xl tracking-[.35em]">DRACO</span></Link>
            <p className="font-condensed text-xs text-zinc-700 leading-relaxed tracking-wider max-w-[200px]">Luxury streetwear for those who refuse to be ordinary.</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-zinc-800 hover:text-zinc-400 transition-colors"><Instagram size={16} strokeWidth={1.5}/></a>
              <a href="#" className="text-zinc-800 hover:text-zinc-400 transition-colors"><Twitter size={15} strokeWidth={1.5}/></a>
            </div>
          </div>
          {Object.entries(LINKS).map(([title,links])=>(
            <div key={title}>
              <p className="font-condensed text-[10px] tracking-[.42em] text-zinc-700 mb-5">{title}</p>
              <div className="space-y-3">
                {links.map(([l,p])=>(
                  <Link key={l} to={p} className="block font-condensed text-xs tracking-wider text-zinc-600 hover:text-white transition-colors">{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-condensed text-[10px] tracking-[.32em] text-zinc-900">© 2025 DRACO. ALL RIGHTS RESERVED.</p>
          <p className="font-condensed text-[10px] tracking-[.35em] text-zinc-900">BREAK YOUR LIMITS.</p>
        </div>
      </div>
    </footer>
  )
}
