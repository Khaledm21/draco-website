import { cn } from '@/utils'
const V={red:'bg-brand-red text-white',dark:'bg-brand-surface text-zinc-400 border border-brand-border',outline:'border border-brand-red text-brand-red'}
export default function Badge({children,variant='red',className=''}){
  if(!children) return null
  return <span className={cn('inline-block font-condensed uppercase text-[10px] tracking-[.3em] px-2.5 py-1',V[variant],className)}>{children}</span>
}
