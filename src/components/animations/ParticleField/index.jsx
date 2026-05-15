import { useMemo } from 'react'
import { motion } from 'framer-motion'
export default function ParticleField({count=26}){
  const pts=useMemo(()=>Array.from({length:count},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*2.5+.5,red:i%5===0,dur:Math.random()*7+5,delay:Math.random()*8})),[count])
  return(
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {pts.map(p=>(
        <motion.div key={p.id} className="absolute rounded-full"
          style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,background:p.red?'#dc2626':'rgba(255,255,255,.2)'}}
          animate={{y:[-15,-200],opacity:[0,p.red?.85:.4,0],scale:[0,1,.2]}}
          transition={{duration:p.dur,repeat:Infinity,delay:p.delay,ease:'easeOut'}}/>
      ))}
    </div>
  )
}
