# DRACO — Luxury Streetwear

> Break Your Limits.

## Stack
- **React 18** + **Vite 5**
- **Tailwind CSS** — dark luxury theme
- **Framer Motion** — cinematic animations
- **Zustand** — cart / wishlist / UI state (persisted)
- **React Router v6** — client-side routing
- **Lucide React** — icons

## Quick Start
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run preview    # preview production build
```

## Project Structure
```
src/
├── assets/                 # fonts, images
├── components/
│   ├── common/             # Button, Badge, DragonLogo, SectionTitle, LoadingScreen, NoiseOverlay
│   ├── layout/             # Navbar, Footer, MobileMenu, CartDrawer, PageTransition, ScrollToTop
│   ├── shop/               # ProductCard, ProductGrid, ShopFilters
│   ├── product/            # ProductGallery, SizeSelector, RelatedProducts
│   ├── collections/        # CollectionCard
│   └── animations/         # FadeReveal, StaggerReveal, ParticleField, TextReveal
├── pages/                  # Home, Shop, Product, Collections, Lookbook, About, Contact, Cart, Wishlist, 404
├── routes/                 # AppRoutes with AnimatePresence
├── hooks/                  # useScrolled, useLockBodyScroll, useCountdown, useWindowSize, useKeyPress
├── services/               # dataService — products, collections, looks
├── store/                  # Zustand: useCartStore, useWishlistStore, useUIStore, useShopStore
├── utils/                  # cn, formatPrice, pageTransition variants
├── styles/                 # globals.css
├── App.jsx                 # Root shell
└── main.jsx
```

## Pages
| Route | Page |
|-------|------|
| `/` | Home — cinematic hero, featured drops, countdown |
| `/shop` | Shop — filterable grid |
| `/product/:slug` | Product Detail — gallery, size selector, tabs |
| `/collections` | Collections archive |
| `/lookbook` | SS2025 campaign |
| `/about` | Brand philosophy + manifesto |
| `/contact` | Contact form |
| `/cart` | Full cart page |
| `/wishlist` | Saved pieces |
| `*` | 404 |
