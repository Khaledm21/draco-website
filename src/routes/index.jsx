import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from '@/pages/HomePage'
import ShopPage from '@/pages/ShopPage'
import ProductPage from '@/pages/ProductPage'
import CollectionsPage from '@/pages/CollectionsPage'
import LookbookPage from '@/pages/LookbookPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import CartPage from '@/pages/CartPage'
import WishlistPage from '@/pages/WishlistPage'
import NotFoundPage from '@/pages/NotFoundPage'
export default function AppRoutes(){
  const location=useLocation()
  return(
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<HomePage/>}/>
        <Route path="/shop"            element={<ShopPage/>}/>
        <Route path="/product/:slug"   element={<ProductPage/>}/>
        <Route path="/collections"     element={<CollectionsPage/>}/>
        <Route path="/collections/:slug" element={<CollectionsPage/>}/>
        <Route path="/lookbook"        element={<LookbookPage/>}/>
        <Route path="/about"           element={<AboutPage/>}/>
        <Route path="/contact"         element={<ContactPage/>}/>
        <Route path="/cart"            element={<CartPage/>}/>
        <Route path="/wishlist"        element={<WishlistPage/>}/>
        <Route path="*"               element={<NotFoundPage/>}/>
      </Routes>
    </AnimatePresence>
  )
}
