import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils'
export default function TextReveal({text,className='',delay=0,stagger=.1,splitBy='word',duration=.75}){
  const ref=useRef(null)
  const inView=useInView(ref,{once:true,margin:'-60px'})
  const items=splitBy==='char'?text.split(''):splitBy==='line'?text.split('\n'):text.split(' ')
  return(
    <div ref={ref} className={cn('overflow-hidden flex flex-wrap gap-x-[.22em]',className)}>
      {items.map((item,i)=>(
        <span key={i} className="overflow-hidden inline-block">
          <motion.span className="inline-block" initial={{y:'115%'}} animate={inView?{y:'0%'}:{y:'115%'}}
            transition={{duration,delay:delay+i*stagger,ease:[.16,1,.3,1]}}>
            {item}{splitBy==='word'&&'\u00A0'}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
