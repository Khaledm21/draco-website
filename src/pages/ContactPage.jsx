import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import Footer from '@/components/layout/Footer'
import DragonLogo from '@/components/common/DragonLogo'
import Button from '@/components/common/Button'
import FadeReveal from '@/components/animations/FadeReveal'

const CONTACTS=[
  ['PRESS & MEDIA','press@draco.world'],
  ['WHOLESALE','trade@draco.world'],
  ['GENERAL','contact@draco.world'],
]

export default function ContactPage(){
  const [form,setForm]=useState({name:'',email:'',subject:'',msg:''})
  const [sent,setSent]=useState(false)
  const [loading,setLoading]=useState(false)
  const set=k=>e=>setForm(p=>({...p,[k]:e.target.value}))
  const send=async()=>{
    if(!form.name||!form.email) return
    setLoading(true)
    await new Promise(r=>setTimeout(r,1200))
    setLoading(false)
    setSent(true)
  }
  return(
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-[70px]">
        <div className="border-b border-brand-border" style={{padding:'clamp(40px,5vw,70px) 0'}}>
          <div className="container-draco">
            <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <p className="font-condensed text-[11px] tracking-[.42em] text-brand-red mb-3">— REACH OUT</p>
              <h1 className="font-display tracking-wider" style={{fontSize:'clamp(52px,10vw,110px)'}}>CONTACT</h1>
            </motion.div>
          </div>
        </div>
        <div className="container-draco" style={{padding:'clamp(48px,6vw,80px) clamp(20px,4vw,56px)'}}>
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-20 max-w-6xl mx-auto">
            <FadeReveal direction="left">
              <p className="text-zinc-500 leading-relaxed mb-12 max-w-sm">For press inquiries, wholesale, collaborations, or general questions — reach out. We respond to those who are serious.</p>
              {CONTACTS.map(([l,v])=>(
                <div key={l} className="mb-8">
                  <p className="font-condensed text-[10px] tracking-[.38em] text-zinc-800 mb-1.5">{l}</p>
                  <a href={`mailto:${v}`} className="font-condensed text-sm tracking-wider text-zinc-400 hover:text-brand-red transition-colors">{v}</a>
                </div>
              ))}
              <div className="rule-red opacity-50 my-10"/>
              <p className="font-condensed text-[10px] tracking-[.38em] text-zinc-800 mb-3">FLAGSHIP STUDIO</p>
              <p className="font-condensed text-sm text-zinc-600 leading-relaxed tracking-wider">Tokyo, Japan<br/>Open by appointment only</p>
            </FadeReveal>
            <FadeReveal direction="right" delay={.1}>
              <AnimatePresence mode="wait">
                {sent?(
                  <motion.div key="done" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} className="flex flex-col items-center justify-center gap-7 text-center py-20">
                    <motion.div initial={{scale:0,rotate:-180}} animate={{scale:1,rotate:0}} transition={{type:'spring',stiffness:220}}>
                      <DragonLogo size={68} glow/>
                    </motion.div>
                    <div>
                      <p className="font-display text-4xl tracking-wider mb-2">MESSAGE SENT</p>
                      <p className="font-condensed text-xs text-zinc-600 tracking-widest">We'll be in touch.</p>
                    </div>
                    <button onClick={()=>setSent(false)} className="font-condensed text-xs tracking-widest text-brand-red hover:text-red-400 transition-colors mt-2">SEND ANOTHER</button>
                  </motion.div>
                ):(
                  <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-condensed text-[10px] tracking-[.32em] text-zinc-700 block mb-2">YOUR NAME</label>
                        <input className="draco-input" type="text" value={form.name} onChange={set('name')} placeholder="FULL NAME"/>
                      </div>
                      <div>
                        <label className="font-condensed text-[10px] tracking-[.32em] text-zinc-700 block mb-2">EMAIL</label>
                        <input className="draco-input" type="email" value={form.email} onChange={set('email')} placeholder="YOUR@EMAIL.COM"/>
                      </div>
                    </div>
                    <div>
                      <label className="font-condensed text-[10px] tracking-[.32em] text-zinc-700 block mb-2">SUBJECT</label>
                      <select className="draco-input" value={form.subject} onChange={set('subject')}>
                        <option value="">SELECT INQUIRY TYPE</option>
                        <option>GENERAL INQUIRY</option>
                        <option>PRESS & MEDIA</option>
                        <option>WHOLESALE</option>
                        <option>COLLABORATION</option>
                        <option>RETURNS</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-condensed text-[10px] tracking-[.32em] text-zinc-700 block mb-2">MESSAGE</label>
                      <textarea className="draco-input" rows={6} value={form.msg} onChange={set('msg')} placeholder="YOUR MESSAGE..." style={{resize:'none'}}/>
                    </div>
                    <Button variant="primary" size="lg" fullWidth onClick={send} loading={loading}>
                      {loading?'SENDING...':'SEND MESSAGE'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeReveal>
          </div>
        </div>
        <Footer/>
      </div>
    </PageTransition>
  )
}
