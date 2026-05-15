import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/common/SectionTitle'
import ProductCard from '@/components/shop/ProductCard'
export default function RelatedProducts({products}){
  if(!products?.length) return null
  return(
    <div className="border-t border-brand-border" style={{paddingTop:'clamp(48px,6vw,80px)'}}>
      <div className="flex items-end justify-between mb-12">
        <SectionTitle eyebrow="YOU MAY ALSO LIKE" title="RELATED PIECES" titleSize="sm"/>
        <Link to="/shop" className="hidden md:flex items-center gap-2 font-condensed text-xs tracking-widest text-zinc-600 hover:text-white transition-colors group">
          VIEW ALL <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform"/>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{background:'#111'}}>
        {products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}
      </div>
    </div>
  )
}
