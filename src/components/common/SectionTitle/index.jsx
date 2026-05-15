import { motion } from 'framer-motion'
import { cn } from '@/utils'
const titleSizes={sm:'text-heading',default:'text-display',lg:'text-hero'}
const alignMap={left:'text-left',center:'text-center items-center',right:'text-right items-end'}
export default function SectionTitle({eyebrow,title,subtitle,align='left',className='',titleSize='default'}){
  return(
    <div className={cn('flex flex-col gap-3',alignMap[align],className)}>
      {eyebrow&&<motion.p initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.5}} className="text-subheading text-brand-red">— {eyebrow}</motion.p>}
      {title&&<div className="overflow-hidden"><motion.h2 initial={{y:'100%'}} whileInView={{y:'0%'}} viewport={{once:true,margin:'-60px'}} transition={{duration:.72,ease:[.16,1,.3,1]}} className={cn(titleSizes[titleSize],'font-display tracking-wider text-white')}>{title}</motion.h2></div>}
      {subtitle&&<motion.p initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.55,delay:.15}} className="font-body text-lg leading-relaxed text-zinc-400 max-w-2xl">{subtitle}</motion.p>}
    </div>
  )
}
