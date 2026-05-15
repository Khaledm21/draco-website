import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils'
const containerV=(stagger=.1,d=.1)=>({hidden:{},visible:{transition:{staggerChildren:stagger,delayChildren:d}}})
const childV=(dir='up',dur=.6)=>{
  const dirs={up:{y:36},left:{x:-30},right:{x:30},none:{}}
  return {hidden:{opacity:0,...(dirs[dir]||dirs.up)},visible:{opacity:1,x:0,y:0,transition:{duration:dur,ease:[.16,1,.3,1]}}}
}
export function StaggerContainer({children,stagger=.1,delayChildren=.1,className='',margin='-60px'}){
  const ref=useRef(null)
  const inView=useInView(ref,{once:true,margin})
  return <motion.div ref={ref} variants={containerV(stagger,delayChildren)} initial="hidden" animate={inView?'visible':'hidden'} className={cn(className)}>{children}</motion.div>
}
export function StaggerItem({children,direction='up',duration=.6,className=''}){
  return <motion.div variants={childV(direction,duration)} className={cn(className)}>{children}</motion.div>
}
export default StaggerContainer
