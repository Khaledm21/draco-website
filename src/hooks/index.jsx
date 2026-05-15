import { useState, useEffect, useRef, useCallback } from 'react'

export function useScrolled(threshold=60){
  const [s,set]=useState(false)
  useEffect(()=>{
    const fn=()=>set(window.scrollY>threshold)
    window.addEventListener('scroll',fn,{passive:true}); fn()
    return ()=>window.removeEventListener('scroll',fn)
  },[threshold])
  return s
}

export function useLockBodyScroll(lock){
  useEffect(()=>{
    if(!lock){document.body.style.overflow='';document.body.style.paddingRight='';return}
    const w=window.innerWidth-document.documentElement.clientWidth
    document.body.style.overflow='hidden'
    document.body.style.paddingRight=`${w}px`
    return ()=>{document.body.style.overflow='';document.body.style.paddingRight=''}
  },[lock])
}

export function useCountdown(targetDate){
  const calc=useCallback(()=>{
    const diff=new Date(targetDate)-Date.now()
    if(diff<=0) return {days:0,hours:0,minutes:0,seconds:0}
    return {
      days:Math.floor(diff/86400000),
      hours:Math.floor((diff%86400000)/3600000),
      minutes:Math.floor((diff%3600000)/60000),
      seconds:Math.floor((diff%60000)/1000),
    }
  },[targetDate])
  const [t,set]=useState(calc)
  useEffect(()=>{const i=setInterval(()=>set(calc()),1000);return()=>clearInterval(i)},[calc])
  return t
}

export function useKeyPress(key,cb){
  useEffect(()=>{
    const fn=(e)=>{if(e.key===key)cb(e)}
    window.addEventListener('keydown',fn)
    return ()=>window.removeEventListener('keydown',fn)
  },[key,cb])
}

export function useWindowSize(){
  const [s,set]=useState({width:0,height:0})
  useEffect(()=>{
    const fn=()=>set({width:window.innerWidth,height:window.innerHeight})
    fn(); window.addEventListener('resize',fn)
    return ()=>window.removeEventListener('resize',fn)
  },[])
  return s
}
