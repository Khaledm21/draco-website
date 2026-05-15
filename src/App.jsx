import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar'
import MobileMenu from '@/components/layout/MobileMenu'
import CartDrawer from '@/components/layout/CartDrawer'
import ScrollToTop from '@/components/layout/ScrollToTop'
import NoiseOverlay from '@/components/common/NoiseOverlay'
import LoadingScreen from '@/components/common/LoadingScreen'
import AppRoutes from '@/routes'
import { useUIStore } from '@/store'

function AppShell(){
  const isLoading=useUIStore(s=>s.isLoading)
  const setLoading=useUIStore(s=>s.setLoading)
  const onDone=useCallback(()=>setLoading(false),[setLoading])

  return(
    <>
      <NoiseOverlay/>
      <AnimatePresence>
        {isLoading&&<LoadingScreen key="loader" onComplete={onDone}/>}
      </AnimatePresence>
      {!isLoading&&(
        <>
          <ScrollToTop/>
          <Navbar/>
          <MobileMenu/>
          <CartDrawer/>
          <main>
            <AppRoutes/>
          </main>
        </>
      )}
    </>
  )
}

export default function App(){
  return(
    <BrowserRouter>
      <AppShell/>
    </BrowserRouter>
  )
}
