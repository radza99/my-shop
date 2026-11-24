import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  SearchX,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartDrawer from './components/CartDrawer'
import OrderConfirmation from './components/OrderConfirmation'
import { categories, products } from './data/products'

const footerYear = new Date().getFullYear()

function createOrderId() {
  const date = new Date()
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('')
  const suffix = Math.floor(Math.random() * 9000) + 1000
  return `MD-${stamp}-${suffix}`
}

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('ทั้งหมด')
  const [cart, setCart] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [toast, setToast] = useState('')

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'ทั้งหมด' || product.category === category
      const matchesKeyword =
        !keyword ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(keyword)
      return matchesCategory && matchesKeyword
    })
  }, [query, category])

  const cartItems = useMemo(
    () =>
      cart.flatMap(({ id, qty }) => {
        const product = products.find((item) => item.id === id)
        return product ? [{ ...product, qty }] : []
      }),
    [cart],
  )

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0)

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const overlayOpen = Boolean(selectedProduct || cartOpen || order)
    document.body.style.overflow = overlayOpen ? 'hidden' : ''

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (order) setOrder(null)
      else if (selectedProduct) setSelectedProduct(null)
      else if (cartOpen) setCartOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProduct, cartOpen, order])

  const addToCart = (product, qty = 1) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id)
      if (existing) {
        return previous.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [...previous, { id: product.id, qty }]
    })
    setToast(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`)
  }

  const changeQuantity = (id, nextQty) => {
    if (nextQty <= 0) {
      setCart((previous) => previous.filter((item) => item.id !== id))
      return
    }
    setCart((previous) =>
      previous.map((item) => (item.id === id ? { ...item, qty: nextQty } : item)),
    )
  }

  const removeItem = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id))
  }

  const checkout = () => {
    if (cartItems.length === 0) return
    setOrder({
      id: createOrderId(),
      date: new Date(),
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.qty, 0),
    })
    setCart([])
    setCartOpen(false)
  }

  const resetFilters = () => {
    setQuery('')
    setCategory('ทั้งหมด')
  }

  return (
    <div id="top" className="min-h-screen bg-[#f7f7f5] font-sans">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <section className="overflow-hidden border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800">
              <Sparkles className="h-3.5 w-3.5" />
              ร้านค้าออนไลน์ · ส่งทั่วประเทศ
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl">
              ของดีทุกวัน
              <br />
              <span className="text-teal-700">ในราคาที่ชอบ</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-stone-600">
              คัดสรรสินค้าคุณภาพสำหรับทุกวัน ของใช้ ของขวัญ และไอเทมรักๆ
              ที่ทำให้ชีวิตดูดีขึ้น โดยไม่ต้องควักกระเป๋าหนัก
            </p>
            <a
              href="#products"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              เลือกซื้อสินค้า
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-teal-700" /> ส่งฟรีเกิน ฿2,000
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-700" /> รับประกัน 7 วัน
              </span>
            </div>
          </div>

          <div className="relative hidden h-72 md:block">
            <img
              src={products[0].image}
              alt="หูฟังไร้สายแนะนำ"
              className="absolute left-6 top-0 h-56 w-56 rounded-3xl object-cover shadow-xl"
            />
            <img
              src={products[6].image}
              alt="ชุดเทียนหอมแนะนำ"
              className="absolute right-2 top-14 h-44 w-44 rounded-3xl object-cover shadow-xl"
            />
            <div className="absolute bottom-3 left-28 flex items-center gap-3 rounded-2xl border border-stone-100 bg-white px-4 py-3 shadow-xl">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <Check className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-stone-900">
                  สินค้าคัดสรรแล้ว
                </span>
                <span className="block text-[11px] text-stone-500">
                  พร้อมส่งทุกวัน
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <main
        id="products"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              สินค้าแนะนำ
            </p>
            <h2 className="mt-1 text-2xl font-bold text-stone-900 sm:text-3xl">
              {category === 'ทั้งหมด' ? 'เลือกของดีให้ตัวคุณ' : category}
            </h2>
          </div>
          <p className="text-sm text-stone-500">
            พบ {filteredProducts.length} สินค้า
            {query && (
              <span>
                {' '}
                สำหรับคำค้นหา <span className="font-medium text-stone-800">“{query}”</span>
              </span>
            )}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setSelectedProduct}
                onAdd={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="mt-7 flex flex-col items-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <SearchX className="h-8 w-8" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-stone-800">
              ไม่พบสินค้าที่คุณค้นหา
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่นดูนะ
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              แสดงสินค้าทั้งหมด
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            <span className="font-bold text-stone-900">มุมดี</span> · ของดีทุกวัน ในราคาที่ชอบ
          </p>
          <p>© {footerYear} Good Corner. สาธิตร้านค้าออนไลน์</p>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onQuantityChange={changeQuantity}
        onRemove={removeItem}
        onCheckout={checkout}
      />

      {order && (
        <OrderConfirmation
          order={order}
          onClose={() => setOrder(null)}
          onContinue={() => {
            setOrder(null)
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-xl"
        >
          <Check className="h-4 w-4 text-teal-300" />
          {toast}
        </div>
      )}
    </div>
  )
}
