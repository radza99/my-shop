import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react'
import QuantityStepper from './QuantityStepper'
import { formatPrice } from '../utils/format'

export default function CartDrawer({
  open,
  onClose,
  items,
  onQuantityChange,
  onRemove,
  onCheckout,
}) {
  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0)
  const count = items.reduce((total, item) => total + item.qty, 0)

  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        role="presentation"
        className={`absolute inset-0 bg-stone-950/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="ตะกร้าสินค้า"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-5">
          <div>
            <h2 className="text-lg font-bold text-stone-900">ตะกร้าของคุณ</h2>
            <p className="text-xs text-stone-500">{count} ชิ้นในตะกร้า</p>
          </div>
          <button
            type="button"
            aria-label="ปิดตะกร้า"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <ShoppingBag className="h-9 w-9" />
            </span>
            <h3 className="mt-5 font-semibold text-stone-800">ตะกร้ายังว่าง</h3>
            <p className="mt-1 text-sm leading-relaxed text-stone-500">
              เลือกสินค้าที่คุณชอบ แล้วเพิ่มลงตะกร้าได้เลย
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              เริ่มเลือกซื้อ
            </button>
          </div>
        ) : (
          <>
            <div className="no-scrollbar flex-1 space-y-1 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-stone-100 py-4 first:pt-0 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-stone-900">
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-400">{item.category}</p>
                      </div>
                      <button
                        type="button"
                        aria-label={`ลบ ${item.name} ออกจากตะกร้า`}
                        onClick={() => onRemove(item.id)}
                        className="shrink-0 rounded-lg p-1.5 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <QuantityStepper
                        compact
                        value={item.qty}
                        onChange={(next) => onQuantityChange(item.id, next)}
                      />
                      <span className="text-sm font-bold text-teal-800">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 bg-stone-50 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">รวมทั้งหมด</span>
                <span className="text-2xl font-bold text-stone-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                {subtotal >= 2000
                  ? 'คุณได้รับสิทธิ์ส่งฟรีแล้ว'
                  : `เพิ่มอีก ${formatPrice(2000 - subtotal)} เพื่อรับสิทธิ์ส่งฟรี`}
              </p>
              <button
                type="button"
                onClick={onCheckout}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 text-sm font-semibold text-white transition hover:bg-teal-800 active:scale-[0.99]"
              >
                ชำระเงิน
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
