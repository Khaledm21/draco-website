import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DragonLogo from '@/components/common/DragonLogo'
import Button from '@/components/common/Button'
import ParticleField from '@/components/animations/ParticleField'
export default function NotFoundPage(){
  return(
    <div className="fixed inset-0 bg-brand-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"/>
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 55% 50% at 50% 50%,rgba(220,38,38,.06) 0%,transparent 70%)'}}/>
      <ParticleField count={18}/>
      <div className="relative z-10 text-center px-6">
        <motion.div initial={{opacity:0,scale:.2}} animate={{opacity:1,scale:1}} transition={{duration:.9,ease:[.16,1,.3,1]}} className="animate-float inline-block mb-8">
          <DragonLogo size={100} glow/>
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.4,duration:.6}}>
          <p className="font-condensed text-[11px] tracking-[.55em] text-brand-red mb-4">— PAGE NOT FOUND</p>
          <h1 className="font-display text-white mb-2" style={{fontSize:'clamp(120px,22vw,240px)',lineHeight:.8,textShadow:'0 0 80px rgba(220,38,38,.3)'}}>404</h1>
          <p className="font-condensed text-zinc-600 tracking-[.3em] text-sm mb-12">THIS VOID DOES NOT EXIST</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/"><Button variant="primary" size="lg">RETURN HOME</Button></Link>
            <Link to="/shop"><Button variant="outline" size="lg">EXPLORE THE SHOP</Button></Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
