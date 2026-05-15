export const cn = (...c) => c.filter(Boolean).join(' ')
export const formatPrice = (p) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0}).format(p)
export const sleep = (ms) => new Promise(r => setTimeout(r,ms))
export const scrollToTop = () => window.scrollTo({top:0,behavior:'smooth'})
export const lockBody = () => { document.body.style.overflow='hidden'; document.body.style.paddingRight=`${window.innerWidth-document.documentElement.clientWidth}px`; }
export const unlockBody = () => { document.body.style.overflow=''; document.body.style.paddingRight=''; }
export const pageTransition = {
  initial:{opacity:0,y:20},
  animate:{opacity:1,y:0,transition:{duration:.42,ease:[.4,0,.2,1]}},
  exit:{opacity:0,y:-10,transition:{duration:.28,ease:[.4,0,.2,1]}},
}
