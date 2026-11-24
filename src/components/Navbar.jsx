import { Search, ShoppingBag, Sparkles, X } from 'lucide-react'

export default function Navbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  cartCount,
  onCartClick,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-2 sm:gap-5">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-base font-bold tracking-tight">มุมดี</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
                Good Corner
              </span>
            </span>
          </a>

          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="ค้นหาสินค้า..."
              aria-label="ค้นหาสินค้า"
              className="h-10 w-full rounded-full border border-stone-200 bg-stone-100/80 pl-10 pr-10 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
            />
            {query && (
              <button
                type="button"
                aria-label="ล้างการค้นหา"
                onClick={() => onQueryChange('')}
                className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-200 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`เปิดตะกร้าสินค้า จำนวน ${cartCount} ชิ้น`}
            className="relative flex h-10 shrink-0 items-center gap-2 rounded-full border border-stone-200 bg-white px-3 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 sm:px-4"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">ตะกร้า</span>
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1 text-[11px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <nav
          aria-label="กรองหมวดหมู่สินค้า"
          className="no-scrollbar flex gap-2 overflow-x-auto pb-3"
        >
          {categories.map((item) => {
            const active = item === category
            return (
              <button
                key={item}
                type="button"
                onClick={() => onCategoryChange(item)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                {item}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
