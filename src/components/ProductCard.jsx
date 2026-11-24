import { ShoppingBag, Star } from 'lucide-react'
import { formatPrice } from '../utils/format'

const badgeStyles = {
  ขายดี: 'bg-amber-100 text-amber-800',
  ใหม่: 'bg-teal-100 text-teal-800',
  ลดราคา: 'bg-rose-100 text-rose-700',
}

export default function ProductCard({ product, onOpen, onAdd }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(product)
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`ดูรายละเอียด ${product.name}`}
      onClick={() => onOpen(product)}
      onKeyDown={handleKeyDown}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-teal-600/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badgeStyles[product.badge] ?? 'bg-white/90 text-stone-700'}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
          {product.category}
        </p>
        <h3 className="mt-1.5 line-clamp-1 font-semibold text-stone-900">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-500">
          {product.description}
        </p>

        <div className="mt-3 flex items-center gap-1 text-xs text-stone-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-stone-700">{product.rating}</span>
          <span>· รีวิวจากผู้ซื้อจริง</span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-lg font-bold text-stone-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="pb-0.5 text-sm text-stone-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onAdd(product)
          }}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-stone-900 text-sm font-medium text-white transition hover:bg-teal-700 active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" />
          เพิ่มลงตะกร้า
        </button>
      </div>
    </article>
  )
}
