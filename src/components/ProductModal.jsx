import { useState } from 'react'
import { ShoppingBag, Star, Truck, X } from 'lucide-react'
import QuantityStepper from './QuantityStepper'
import { formatPrice } from '../utils/format'

export default function ProductModal({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`รายละเอียด ${product.name}`}
        onClick={(event) => event.stopPropagation()}
        className="relative my-auto grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
      >
        <button
          type="button"
          aria-label="ปิดหน้าต่างรายละเอียด"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-sm transition hover:bg-white hover:text-stone-900"
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover md:h-full md:min-h-[480px]"
        />

        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
            {product.category}
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-stone-900">
            {product.name}
          </h2>

          <div className="mt-3 flex items-center gap-1.5 text-sm text-stone-500">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-stone-800">{product.rating}</span>
            <span>· รีวิวจากผู้ซื้อจริง</span>
          </div>

          <p className="mt-5 text-sm leading-7 text-stone-600">
            {product.description}
          </p>

          <ul className="mt-5 space-y-2 text-sm text-stone-600">
            <li className="flex gap-2">
              <span className="text-teal-700">✓</span> สินค้าคุณภาพ จัดส่งอย่างปลอดภัย
            </li>
            <li className="flex gap-2">
              <span className="text-teal-700">✓</span> รับประกันความพึงพอใจ 7 วัน
            </li>
          </ul>

          <div className="mt-auto pt-6">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="pb-1 text-base text-stone-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <button
                type="button"
                onClick={() => {
                  onAdd(product, quantity)
                  onClose()
                }}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" />
                เพิ่มลงตะกร้า
              </button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-stone-500">
              <Truck className="h-4 w-4 text-teal-700" />
              ส่งฟรีเมื่อสั่งซื้อเกิน ฿2,000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
