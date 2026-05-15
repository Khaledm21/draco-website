import { motion } from 'framer-motion'
export default function PageTransition({children,className=''}){
  return(
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
      transition={{duration:.42,ease:[.4,0,.2,1]}} className={className}>
      {children}
    </motion.div>
  )
}
