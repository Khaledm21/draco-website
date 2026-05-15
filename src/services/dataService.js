// Core Compression Shirt Images
import compBlack1 from '@/assets/images/products/core-compression/core-compression-black/1.png'
import compBlack2 from '@/assets/images/products/core-compression/core-compression-black/2.png'
import compBlack3 from '@/assets/images/products/core-compression/core-compression-black/3.png'
import compBlack4 from '@/assets/images/products/core-compression/core-compression-black/4.png'

import compBlue1 from '@/assets/images/products/core-compression/core-compression-blue/1.png'
import compBlue2 from '@/assets/images/products/core-compression/core-compression-blue/2.png'
import compBlue3 from '@/assets/images/products/core-compression/core-compression-blue/3.png'
import compBlue4 from '@/assets/images/products/core-compression/core-compression-blue/4.png'

import compRed1 from '@/assets/images/products/core-compression/core-compression-red/1.png'
import compRed2 from '@/assets/images/products/core-compression/core-compression-red/2.png'
import compRed3 from '@/assets/images/products/core-compression/core-compression-red/3.png'
import compRed4 from '@/assets/images/products/core-compression/core-compression-red/4.png'

// Core Pants Images
import pantsBlack1 from '@/assets/images/products/core-pants/core-pants-black/1.png'
import pantsBlack2 from '@/assets/images/products/core-pants/core-pants-black/2.png'
import pantsBlack3 from '@/assets/images/products/core-pants/core-pants-black/3.png'
import pantsBlack4 from '@/assets/images/products/core-pants/core-pants-black/4.png'

import pantsGrey1 from '@/assets/images/products/core-pants/core-pants-Grey/1.png'
import pantsGrey2 from '@/assets/images/products/core-pants/core-pants-Grey/2.png'
import pantsGrey3 from '@/assets/images/products/core-pants/core-pants-Grey/3.png'
import pantsGrey4 from '@/assets/images/products/core-pants/core-pants-Grey/4.png'

// Core Tank Top Images
import tankBlack1 from '@/assets/images/products/core-tank-top/core-tank-top-black/1.png'
import tankBlack2 from '@/assets/images/products/core-tank-top/core-tank-top-black/2.png'
import tankBlack3 from '@/assets/images/products/core-tank-top/core-tank-top-black/3.png'
import tankBlack4 from '@/assets/images/products/core-tank-top/core-tank-top-black/4.png'

import tankGray1 from '@/assets/images/products/core-tank-top/core-tank-top-gray/1.png'
import tankGray2 from '@/assets/images/products/core-tank-top/core-tank-top-gray/2.png'
import tankGray3 from '@/assets/images/products/core-tank-top/core-tank-top-gray/3.png'
import tankGray4 from '@/assets/images/products/core-tank-top/core-tank-top-gray/4.png'

import tankWhite1 from '@/assets/images/products/core-tank-top/core-tank-top-white/1.png'
import tankWhite2 from '@/assets/images/products/core-tank-top/core-tank-top-white/2.png'
import tankWhite3 from '@/assets/images/products/core-tank-top/core-tank-top-white/3.png'
import tankWhite4 from '@/assets/images/products/core-tank-top/core-tank-top-white/4.png'

export const PRODUCTS = [
  { 
    id: 1, 
    slug: 'core-compression-shirt', 
    name: 'CORE COMPRESSION SHIRT', 
    price: 450, 
    category: 'tops', 
    tag: 'NEW', 
    inStock: true,
    sizes: [
      { label: 'M (65kg-75kg)', available: true },
      { label: 'L (75kg-85kg)', available: true },
      { label: 'XL (85kg-95kg)', available: true }
    ],
    colors: ['#000', '#0000FF', '#FF0000'], 
    colorNames: ['Void Black', 'Electric Blue', 'Dragon Red'],
    images: [compRed1, compRed2, compRed3, compRed4],
    colorImages: {
      '#000': [compBlack1, compBlack2, compBlack3, compBlack4],
      '#0000FF': [compBlue1, compBlue2, compBlue3, compBlue4],
      '#FF0000': [compRed1, compRed2, compRed3, compRed4]
    },
    bg: 'linear-gradient(135deg,#111 0%,#000 100%)',
    description: 'High-performance compression fabric designed for maximum muscle support and recovery.',
    longDescription: 'The Core Compression Shirt is the ultimate base layer for high-intensity training. Engineered with multi-directional stretch fabric that moves with your body, providing targeted compression to key muscle groups.',
    specs: [['MATERIAL', 'Technical Compression Poly-Spandex'], ['FIT', 'Compression / Skin-tight'], ['WEIGHT', '220GSM'], ['TECH', 'Moisture-wicking / Anti-microbial'], ['CARE', 'Cold wash · Air dry']],
    featured: true, 
    new: true, 
    wishlistCount: 156 
  },
  { 
    id: 2, 
    slug: 'core-tank-top', 
    name: 'CORE TANK TOP', 
    price: 380, 
    category: 'tops', 
    tag: 'ESSENTIAL', 
    inStock: true,
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true }
    ],
    colors: ['#000', '#808080', '#FFFFFF'], 
    colorNames: ['Void Black', 'Stealth Gray', 'Pure White'],
    images: [tankWhite1, tankWhite2, tankWhite3, tankWhite4], 
    colorImages: {
      '#000': [tankBlack2, tankBlack1, tankBlack3, tankBlack4],
      '#808080': [tankGray2, tankGray1, tankGray3, tankGray4],
      '#FFFFFF': [tankWhite2, tankWhite1, tankWhite3, tankWhite4]
    },
    bg: 'linear-gradient(135deg,#1a1a1a 0%,#0a0a0a 100%)',
    description: 'Premium lightweight tank designed for unrestricted movement.',
    longDescription: 'The Core Tank Top is engineered for the modern athlete. Featuring a relaxed yet structured fit, it provides the perfect balance between style and performance during intense workouts.',
    specs: [['MATERIAL', 'Performance Poly-Blend'], ['FIT', 'Athletic Fit'], ['WEIGHT', '160GSM'], ['TECH', 'Breathable Mesh / Quick-dry'], ['CARE', 'Machine wash cold']],
    featured: true, 
    new: true, 
    wishlistCount: 245 
  },
  { 
    id: 3, 
    slug: 'black-core-flow-pants', 
    name: 'CORE FLOW PANTS', 
    price: 650, 
    category: 'bottoms', 
    tag: 'PREMIUM', 
    inStock: true,
    sizes: [
      { label: '28', available: true },
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: true },
      { label: '36', available: true }
    ],
    colors: ['#000', '#4A4A4A'], 
    colorNames: ['Void Black', 'Ash Grey'],
    images: [pantsGrey2, pantsGrey1, pantsGrey3, pantsGrey4],
    colorImages: {
      '#000': [pantsBlack2, pantsBlack1, pantsBlack3, pantsBlack4],
      '#4A4A4A': [pantsGrey2, pantsGrey1, pantsGrey3, pantsGrey4]
    },
    bg: 'linear-gradient(135deg,#0d0d0d 0%,#000 100%)',
    description: 'Technical flow pants with an adjustable silhouette.',
    longDescription: 'Combining street aesthetics with athletic performance, the Core Flow Pants feature a tapered design with articulated knees for maximum mobility. Built from durable, lightweight fabric that resists the elements.',
    specs: [['MATERIAL', 'Technical Stretch Nylon'], ['FIT', 'Tapered / Relaxed'], ['WEIGHT', '280GSM'], ['TECH', 'DWR Coating / 4-Way Stretch'], ['CARE', 'Cold wash · Hang dry']],
    featured: true, 
    new: true, 
    wishlistCount: 512 
  },
]

export const COLLECTIONS = [
  { id: 1, slug: 'core-collection', name: 'CORE COLLECTION', subtitle: 'Essentials for Performance', itemCount: 3, accent: '#dc2626',
    bg: 'linear-gradient(135deg,#0a0000 0%,#000 100%)',
    description: 'The foundation of DRACO. High-performance gear designed for those who demand more from their training. Minimalist design, maximum output.' },
]

export const LOOKS = [
  { id: 1, title: 'CORE I',    num: '001', sub: 'The Foundation',    bg: 'from-zinc-950 to-black' },
  { id: 2, title: 'FLOW',      num: '002', sub: 'Movement Unbound',  bg: 'from-neutral-900 to-black' },
]

export const CATEGORIES = ['all', 'tops', 'bottoms']
export const SORT_OPTIONS = [
  { value: 'featured', label: 'FEATURED' },
  { value: 'newest', label: 'NEWEST' },
  { value: 'price-asc', label: 'PRICE: LOW → HIGH' },
  { value: 'price-desc', label: 'PRICE: HIGH → LOW' },
]
export const NAV_LINKS = [
  { label: 'SHOP', path: '/shop' },
  { label: 'COLLECTIONS', path: '/collections' },
  { label: 'PHILOSOPHY', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
]

export const getProductBySlug = (slug) => PRODUCTS.find(p => p.slug === slug) || null
export const getRelatedProducts = (product, count = 3) => PRODUCTS.filter(p => p.id !== product.id).slice(0, count)
export const filterProducts = ({ category = 'all', sort = 'featured' }) => {
  let r = [...PRODUCTS]
  if (category !== 'all') r = r.filter(p => p.category === category)
  if (sort === 'newest') r.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
  else if (sort === 'price-asc') r.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') r.sort((a, b) => b.price - a.price)
  else r.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  return r
}
