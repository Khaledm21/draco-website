import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import DragonLogo from '@/components/common/DragonLogo'
import Button from '@/components/common/Button'
import FadeReveal from '@/components/animations/FadeReveal'

const PILLARS=[
  {n:'01',title:'CRAFT',desc:'We work exclusively with premium mills in Japan, Italy, and Portugal. Every seam is a decision. Every fabric is an obsession.'},
  {n:'02',title:'IDENTITY',desc:'DRACO isn\'t a brand you wear — it\'s an identity you claim. Our pieces are for those who know exactly who they are.'},
  {n:'03',title:'REBELLION',desc:'We exist in direct opposition to the ordinary. Every drop is a challenge to the established order of fashion culture.'},
  {n:'04',title:'LEGACY',desc:'We design for permanence — not seasons, not trends. DRACO pieces outlast movements. They age into mythology.'},
]

const MANIFESTO=[
  'We don\'t follow trends. We don\'t chase seasons. We don\'t apologize for the darkness that defines us.',
  'DRACO exists at the intersection of luxury and rebellion — where premium craftsmanship meets uncompromising vision.',
  'The dragon doesn\'t ask permission to exist. Neither do we.',
  'Every piece we create is an act of defiance. A statement that you refuse to be average, ordinary, or forgotten.',
]

export default function AboutPage(){
  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-brand-border" style={{padding:'clamp(60px,10vw,130px) 0'}}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[.03]"><DragonLogo size={560}/></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20"/>
          <div className="container-draco max-w-3xl relative">
            <FadeReveal>
              <p className="font-condensed text-[11px] tracking-[.4em] text-brand-red mb-5">— THE DOCTRINE</p>
              <h1 className="font-display tracking-wider leading-none mb-8" style={{fontSize:'clamp(64px,12vw,130px)'}}>OUR<br/>PHILOSOPHY</h1>
              <p className="text-zinc-400 leading-relaxed max-w-xl" style={{fontSize:'clamp(15px,2vw,17px)'}}>
                DRACO was forged in the belief that luxury isn't about price tags. It's about intention, craft, and the courage to exist on your own terms.
              </p>
            </FadeReveal>
          </div>
        </div>

        {/* Manifesto */}
        <div className="container-draco max-w-3xl" style={{padding:'clamp(60px,8vw,100px) clamp(20px,4vw,56px)'}}>
          <FadeReveal><p className="font-condensed text-[11px] tracking-[.4em] text-zinc-800 mb-12">— MANIFESTO</p></FadeReveal>
          {MANIFESTO.map((text,i)=>(
            <FadeReveal key={i} delay={i*.1} direction="left">
              <p className="text-zinc-300 leading-relaxed mb-8" style={{fontSize:'clamp(16px,2.2vw,20px)'}}>{text}</p>
            </FadeReveal>
          ))}
          <FadeReveal delay={.4} direction="left">
            <p className="font-condensed tracking-[.2em] font-semibold text-brand-red" style={{fontSize:'clamp(16px,2.2vw,20px)'}}>
              BREAK YOUR LIMITS IS NOT A SLOGAN. IT IS A COMMAND.
            </p>
          </FadeReveal>
        </div>

        {/* Pillars */}
        <div className="border-t border-brand-border" style={{padding:'clamp(60px,8vw,100px) 0'}}>
          <div className="container-draco">
            <FadeReveal><p className="font-condensed text-[11px] tracking-[.4em] text-brand-red mb-14">— CORE VALUES</p></FadeReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{background:'#111'}}>
              {PILLARS.map((p,i)=>(
                <FadeReveal key={i} delay={i*.1}>
                  <div className="bg-brand-dark p-9 group h-full">
                    <div className="font-display text-7xl text-zinc-900 group-hover:text-red-900 transition-colors mb-7">{p.n}</div>
                    <h3 className="font-display text-2xl tracking-wider group-hover:text-brand-red transition-colors mb-5">{p.title}</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-brand-border text-center" style={{padding:'clamp(60px,8vw,100px) 0'}}>
          <FadeReveal>
            <DragonLogo size={55} glow className="mx-auto mb-8 opacity-60"/>
            <h3 className="font-display text-4xl md:text-6xl tracking-wider mb-6">READY TO WEAR<br/>YOUR TRUTH?</h3>
            <motion.div whileHover={{scale:1.04,boxShadow:'0 0 36px rgba(220,38,38,.38)'}} whileTap={{scale:.96}} className="inline-block">
              <Link to="/shop" className="inline-block px-12 py-4 bg-brand-red hover:bg-red-700 font-condensed tracking-[.3em] text-sm text-white transition-colors">
                SHOP THE COLLECTION
              </Link>
            </motion.div>
          </FadeReveal>
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
