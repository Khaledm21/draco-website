import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartStore = create(persist((set,get)=>({
  items:[], isOpen:false,
  get count(){ return get().items.reduce((s,i)=>s+i.qty,0) },
  get subtotal(){ return get().items.reduce((s,i)=>s+i.price*i.qty,0) },
  openCart:()=>set({isOpen:true}),
  closeCart:()=>set({isOpen:false}),
  addItem:(product,size)=>{
    const key=`${product.id}-${size}`
    const ex=get().items.find(i=>i.key===key)
    if(ex) set({items:get().items.map(i=>i.key===key?{...i,qty:i.qty+1}:i)})
    else set({items:[...get().items,{key,id:product.id,slug:product.slug,name:product.name,price:product.price,size,images:product.images,bg:product.bg,tag:product.tag,qty:1}]})
    set({isOpen:true})
  },
  removeItem:(key)=>set(s=>({items:s.items.filter(i=>i.key!==key)})),
  updateQty:(key,delta)=>set(s=>({items:s.items.map(i=>i.key===key?{...i,qty:Math.max(0,i.qty+delta)}:i).filter(i=>i.qty>0)})),
  clearCart:()=>set({items:[]}),
}),{ name:'draco-cart', storage:createJSONStorage(()=>localStorage), partialize:s=>({items:s.items}) }))

export const useWishlistStore = create(persist((set,get)=>({
  items:[],
  get count(){ return get().items.length },
  isWished:(id)=>get().items.some(i=>i.id===id),
  toggle:(product)=>{
    const ex=get().items.find(i=>i.id===product.id)
    if(ex) set({items:get().items.filter(i=>i.id!==product.id)})
    else set({items:[...get().items,{id:product.id,slug:product.slug,name:product.name,price:product.price,images:product.images,bg:product.bg,tag:product.tag}]})
  },
  remove:(id)=>set(s=>({items:s.items.filter(i=>i.id!==id)})),
  clearWishlist:()=>set({items:[]}),
}),{ name:'draco-wishlist', storage:createJSONStorage(()=>localStorage) }))

export const useUIStore = create((set)=>({
  isLoading:true, setLoading:(v)=>set({isLoading:v}),
  mobileNavOpen:false,
  openMobileNav:()=>set({mobileNavOpen:true}),
  closeMobileNav:()=>set({mobileNavOpen:false}),
  toast:null,
  showToast:(message,type='success')=>{ set({toast:{message,type,id:Date.now()}}); setTimeout(()=>set({toast:null}),3000) },
}))

export const useShopStore = create((set)=>({
  activeCategory:'all', activeSort:'featured',
  setCategory:(cat)=>set({activeCategory:cat}),
  setSort:(sort)=>set({activeSort:sort}),
  resetFilters:()=>set({activeCategory:'all',activeSort:'featured'}),
}))
