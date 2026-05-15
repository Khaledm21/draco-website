import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils'
const DIRS={up:{y:40,x:0},down:{y:-30,x:0},left:{x:-40,y:0},right:{x:40,y:0},none:{x:0,y:0}}
export default function FadeReveal({children,direction='up',delay=0,duration=.6,margin='-60px',once=true,className=''}){
  const ref=useRef(null)
  const inView=useInView(ref,{once,margin})
  const d=DIRS[direction]||DIRS.up
  return(
    <motion.div ref={ref} initial={{opacity:0,...d}} animate={inView?{opacity:1,x:0,y:0}:{opacity:0,...d}}
      transition={{duration,delay,ease:[.16,1,.3,1]}} className={cn(className)}>
      {children}
    </motion.div>
  )
}
