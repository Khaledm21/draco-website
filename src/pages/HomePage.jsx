import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, ArrowUpRight, Play, Volume2, VolumeX } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import DragonLogo from '@/components/common/DragonLogo'
import Button from '@/components/common/Button'
import SectionTitle from '@/components/common/SectionTitle'
import FadeReveal from '@/components/animations/FadeReveal'
import ParticleField from '@/components/animations/ParticleField'
import ProductCard from '@/components/shop/ProductCard'
import { PRODUCTS } from '@/services/dataService'
import { useCountdown } from '@/hooks'

// Import generated editorial images
import heroImg from '@/assets/images/editorial_hero.png'
import textureImg from '@/assets/images/editorial_texture.png'
import portraitImg from '@/assets/images/editorial_portrait.png'

const DROP_DATE = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString()

function Hero() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={containerRef} className="relative h-[100svh] min-h-[750px] flex items-center justify-center overflow-hidden bg-black pt-[60px]">
      {/* Background Media / Image */}
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img src={heroImg} alt="DRACO Cinematic Hero" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-20" />
      </motion.div>

      {/* Atmospheric FX */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
        <div className="absolute inset-0 bg-red-glow-radial animate-ambient" />
        <div className="film-grain opacity-[0.04]" />
      </div>

      <motion.div style={{ opacity }} className="relative z-30 text-center px-6 max-w-5xl pt-10 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 inline-block"
        >
          <DragonLogo size={160} glow animate className="mx-auto" />
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-subheading text-brand-red font-bold"
          >
            NOT MADE FOR EVERYONE. NEVER WAS.
          </motion.p>
        </div>

        <div className="relative">
          {['BREAK', 'YOUR', 'LIMITS'].map((word, i) => (
            <div key={word} className="overflow-hidden leading-[0.82]">
              <motion.h1
                initial={{ y: '105%', rotateX: 45, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  delay: 0.7 + i * 0.15,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={word === 'LIMITS' ? 'text-hero limits-box' : 'text-hero'}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            variant="primary" 
            size="lg" 
            className="min-w-[240px]"
            onClick={() => navigate('/shop')}
          >
            EXPLORE THE VOID <ArrowUpRight size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="min-w-[240px]"
            onClick={() => navigate('/collections')}
          >
            VIEW MANIFESTO
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-brand-red to-transparent"
        />
      </motion.div>
    </section>
  )
}

function Manifesto() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-20%" })

  return (
    <section ref={ref} className="section-pad bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="container-draco relative z-10">
        <div className="max-w-4xl">
          <FadeReveal>
            <p className="text-subheading text-zinc-600 mb-8">— THE PHILOSOPHY</p>
          </FadeReveal>
          <div className="space-y-4">
            {["WE DON'T BUILD", "CLOTHING.", "WE FORGE", "ARMOR FOR THE", "FEARLESS."].map((line, i) => (
              <div key={line} className={`manifesto-line ${isInView ? 'revealed' : ''}`}>
                <span className="manifesto-line-inner" style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
                  {line}
                </span>
              </div>
            ))}
          </div>
          <FadeReveal delay={0.8}>
            <p className="mt-12 text-zinc-500 font-condensed text-xl max-w-xl leading-relaxed">
              DRACO exists at the intersection of aggressive minimalism and technical luxury. 
              Each piece is a statement of intent. A refusal to conform. A commitment to the void.
            </p>
            <Link to="/about" className="inline-flex items-center gap-4 mt-10 text-brand-red font-display text-2xl tracking-widest hover:text-white transition-colors group">
              READ THE DOCTRINE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </FadeReveal>
        </div>
      </div>
      
      {/* Decorative large texture element */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-1/2 hidden lg:block pointer-events-none"
      >
        <img src={textureImg} alt="Texture" className="w-full grayscale brightness-50" />
      </motion.div>
    </section>
  )
}

function FeaturedDrop() {
  const featured = PRODUCTS.slice(0, 3)
  
  return (
    <section className="section-pad border-t border-white/[0.03] bg-[#050505]">
      <div className="container-draco">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <FadeReveal>
              <p className="text-subheading text-brand-red mb-4">— CURRENT DROP</p>
              <h2 className="text-display">SELECTED PIECES</h2>
            </FadeReveal>
          </div>
          <FadeReveal direction="left">
            <Link to="/shop" className="group flex items-center gap-4 font-condensed text-sm tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
              VIEW FULL ARCHIVE <div className="w-10 h-[1px] bg-zinc-800 group-hover:bg-brand-red transition-colors" />
            </Link>
          </FadeReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-px bg-white/[0.03] border border-white/[0.03]">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TheMovement() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={portraitImg} alt="The Movement" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
      </div>
      
      <div className="container-draco relative z-20">
        <div className="max-w-2xl">
          <FadeReveal direction="right">
            <p className="text-subheading text-brand-red mb-6">— JOIN THE MOVEMENT</p>
            <h2 className="text-display mb-8">BEYOND THE <br /> VISIBLE SPECTRUM</h2>
            <p className="text-zinc-400 font-condensed text-lg mb-10 leading-relaxed">
              We are a collective of individuals who move differently. 
              Those who find comfort in the shadows and strength in the silence. 
              The Bloodline is growing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md">JOIN THE BLOODLINE</Button>
              <Button variant="outline" size="md">FOLLOW @DRACO</Button>
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  )
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(DROP_DATE)
  
  return (
    <section className="section-pad border-y border-white/[0.03] bg-black">
      <div className="container-draco text-center">
        <FadeReveal>
          <p className="text-subheading text-zinc-500 mb-6">— INCOMING TRANSMISSION</p>
          <h2 className="text-display mb-16">DROP 002: BLOODLINE</h2>
          
          <div className="flex justify-center gap-4 sm:gap-12 mb-16">
            {[
              { label: 'DAYS', value: days },
              { label: 'HOURS', value: hours },
              { label: 'MINUTES', value: minutes },
              { label: 'SECONDS', value: seconds },
            ].map((item) => (
              <div key={item.label} className="w-20 sm:w-32">
                <div className="text-hero text-white !text-[clamp(40px,8vw,100px)] mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-subheading !text-[9px] text-zinc-700">{item.label}</div>
              </div>
            ))}
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="ENTER YOUR COORDINATES (EMAIL)" 
                className="draco-input text-center !pr-32"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-brand-red text-white font-condensed text-[10px] tracking-widest hover:bg-white hover:text-black transition-colors">
                NOTIFY ME
              </button>
            </div>
            <p className="mt-4 text-zinc-800 font-condensed text-[9px] tracking-widest">
              BY REGISTERING YOU AGREE TO THE DRACO PROTOCOL.
            </p>
          </div>
        </FadeReveal>
      </div>
    </section>
  )
}

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <PageTransition>
      <div className="relative">
        <Hero />
        
        {/* Cinematic Ticker */}
        <div className="border-y border-white/[0.03] py-6 bg-black overflow-hidden relative z-20">
          <div className="animate-ticker flex whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                <span className="font-display text-4xl text-zinc-900 tracking-tighter opacity-50">BREAK LIMITS</span>
                <DragonLogo size={24} className="opacity-20 grayscale" />
                <span className="font-display text-4xl text-zinc-900 tracking-tighter opacity-50">FORGED IN DARKNESS</span>
                <DragonLogo size={24} className="opacity-20 grayscale" />
                <span className="font-display text-4xl text-zinc-900 tracking-tighter opacity-50">VOID ARMOR</span>
                <DragonLogo size={24} className="opacity-20 grayscale" />
              </div>
            ))}
          </div>
        </div>

        <Manifesto />
        <FeaturedDrop />
        <TheMovement />
        <CountdownSection />
        
        {/* Vision Section */}
        <section className="section-pad bg-black">
          <div className="container-draco grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <FadeReveal>
              <div className="relative aspect-[4/5] overflow-hidden group">
                <img src={textureImg} alt="Vision" className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay" />
                <div className="absolute inset-0 border border-white/10 m-4" />
              </div>
            </FadeReveal>
            <FadeReveal direction="left" delay={0.2}>
              <p className="text-subheading text-brand-red mb-6">— THE VISION</p>
              <h2 className="text-display mb-10">FUTURE ARTIFACTS</h2>
              <p className="text-zinc-500 font-condensed text-xl leading-relaxed mb-8">
                We don't follow trends. We observe them from the shadows and create what's next. 
                DRACO is an evolving ecosystem of design, technology, and human potential.
              </p>
              <div className="space-y-6">
                {[
                  { title: "AGGRESSIVE MINIMALISM", desc: "Removing the unnecessary until only the soul remains." },
                  { title: "TECHNICAL LUXURY", desc: "High-performance materials meeting artisanal craftsmanship." },
                  { title: "DARK FUTURISM", desc: "A silhouette designed for the cities of tomorrow." }
                ].map((item, i) => (
                  <div key={i} className="border-l border-zinc-800 pl-6 py-2">
                    <h4 className="font-display text-xl text-white mb-2">{item.title}</h4>
                    <p className="font-condensed text-sm text-zinc-600 tracking-wider uppercase">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeReveal>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  )
}
