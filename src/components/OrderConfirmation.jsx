import { CheckCircle2, PackageCheck, X } from 'lucide-react'
import { formatDate, formatPrice } from '../utils/format'

export default function OrderConfirmation({ order, onClose, onContinue }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-stone-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="สรุปคำสั่งซื้อ"
        onClick={(event) => event.stopPropagation()}
        className="relative my-auto w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="ปิดหน้าต่างสรุปคำสั่งซื้อ"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-4 text-2xl font-bold text-stone-900">สั่งซื้อสำเร็จ!</h2>
        <p className="mt-1 text-sm text-stone-500">
          ขอบคุณที่เลือกช้อปปิ้งกับมุมดี เราจะจัดส่งสินค้าให้เร็วที่สุด
        </p>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <span className="text-xs text-stone-500">เลขคำสั่งซื้อ</span>
            <span className="font-semibold text-stone-900">{order.id}</span>
          </div>
          <div className="flex items-center justify-between border-b border-stone-200 py-3">
            <span className="text-xs text-stone-500">วันที่สั่งซื้อ</span>
            <span className="text-sm font-medium text-stone-800">
              {formatDate(order.date)}
            </span>
          </div>
          <div className="space-y-2 py-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex min-w-0 items-center gap-2 text-stone-600">
                  <PackageCheck className="h-4 w-4 shrink-0 text-teal-700" />
                  <span className="truncate">
                    {item.name} <span className="text-stone-400">×{item.qty}</span>
                  </span>
                </span>
                <span className="shrink-0 font-medium text-stone-800">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-stone-200 pt-3">
            <span className="text-sm font-semibold text-stone-800">ยอดชำระรวม</span>
            <span className="text-xl font-bold text-teal-800">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-xl border border-stone-200 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            ปิด
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="h-11 flex-1 rounded-xl bg-stone-900 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            เลือกซื้อต่อ
          </button>
        </div>
      </div>
    </div>
  )
}
