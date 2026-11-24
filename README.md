# 🛍️ มุมดี (Good Corner) — E-Commerce Storefront

> ร้านค้าออนไลน์ที่สะอาดตา อ่านง่าย และใช้งานจริงได้ทันที สร้างด้วย **React + Vite + Tailwind CSS** รองรับการค้นหาสินค้าแบบ real-time, กรองหมวดหมู่, ดูรายละเอียดสินค้า, จัดการตะกร้า และสรุปคำสั่งซื้อจำลอง

<p align="center">
  <img src="https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19.3" />
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8.3" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4.3" />
  <img src="https://img.shields.io/badge/Lucide_React-1.79-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React 1.79" />
</p>

---

## ✨ Key Features

- 🔎 **Real-time Search** — ค้นหาสินค้าทันทีจากชื่อ หมวดหมู่ และคำอธิบาย พร้อมปุ่มล้างการค้นหา
- 🏷️ **Category Filter** — กรองสินค้าตามหมวดหมู่ได้ทั้งหมด 6 กลุ่ม ด้วยปุ่มที่เลื่อนได้บนมือถือ
- 🧾 **Responsive Product Grid** — การ์ดสินค้าตัวอย่าง 8 รายการ แสดงแบบ 1–2 คอลัมน์บนมือถือ และ 4 คอลัมน์บนจอใหญ่
- 🪟 **Product Detail Modal** — คลิกการ์ดเพื่อเปิด Popup ดูรูปใหญ่ รายละเอียด เรตติ้ง ราคา และเลือกจำนวนก่อนใส่ตะกร้า
- 🛒 **Slide-over Cart Drawer** — ตะกร้าเลื่อนออกจากด้านขวา ปรับ/ลดจำนวน, ลบสินค้า, คำนวณยอดรวม และแจ้งสิทธิ์ส่งฟรีอัตโนมัติ
- ✅ **Order Confirmation** — กด **ชำระเงิน** เพื่อดูหน้าต่างสรุปคำสั่งซื้อจำลอง พร้อมเลขคำสั่งซื้อ วันที่ และรายการสินค้า
- ⌨️ **UX Details** — ปิด Modal ด้วย `Esc` หรือคลิกพื้นหลัง, ล็อกการเลื่อนหน้าเว็บขณะเปิดหน้าต่าง, และมี Toast แจ้งเมื่อเพิ่มสินค้า
- 🇹🇭 **Thai-first UI** — ทุกปุ่มและเมนูเป็นภาษาไทย ใช้ `Intl.NumberFormat` / `Intl.DateTimeFormat` แสดงราคาและวันที่แบบท้องถิ่น

---

## 🧰 Tech Stack

| ส่วน | เทคโนโลยี | หมายเหตุ |
| --- | --- | --- |
| UI Library | React 19 | ใช้ Hooks (`useState`, `useMemo`, `useEffect`) จัดการ state ทั้งหมด |
| Build Tool | Vite 8 | dev server เร็ว พร้อม HMR |
| Styling | Tailwind CSS 4 | ใช้ผ่าน `@tailwindcss/vite` และ `@theme` |
| Icons | Lucide React | ไอคอน Search, ShoppingBag, Star, Trash2 ฯลฯ |
| Lint | Oxlint | ตรวจคุณภาพโค้ดด้วย `npm run lint` |
| Font | IBM Plex Sans Thai | โหลดจาก Google Fonts รองรับภาษาไทย |
| Images | Unsplash | รูปสินค้าตัวอย่างโหลดจาก URL จริง |

---

## 📁 Project Structure

```text
my-shop/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx          # ตะกร้าแบบ Slide-over
│   │   ├── Navbar.jsx              # ชื่อร้าน ค้นหา กรองหมวดหมู่ ปุ่มตะกร้า
│   │   ├── OrderConfirmation.jsx   # หน้าต่างสรุปคำสั่งซื้อ
│   │   ├── ProductCard.jsx         # การ์ดสินค้า
│   │   ├── ProductModal.jsx        # รายละเอียดสินค้า + เลือกจำนวน
│   │   └── QuantityStepper.jsx     # ปุ่ม +/- ใช้ร่วมกัน
│   ├── data/
│   │   └── products.js             # รายการสินค้าและหมวดหมู่ตัวอย่าง
│   ├── utils/
│   │   └── format.js               # formatPrice / formatDate (th-TH)
│   ├── App.jsx                     # state หลัก, filter, cart, checkout
│   ├── index.css                   # Tailwind import + theme + base style
│   └── main.jsx                    # React entry point
├── .gitignore                      # ไม่ commit node_modules และ dist
├── .oxlintrc.json
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/radza99/my-shop.git
cd my-shop
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่ **http://localhost:5173** เพื่อเริ่มใช้งาน

### 📜 Scripts ที่มีอยู่

```bash
npm run dev      # เริ่ม dev server
npm run build    # สร้าง production build ในโฟลเดอร์ dist/
npm run preview  # พรีวิวไฟล์ที่ build แล้ว
npm run lint     # ตรวจโค้ดด้วย Oxlint
```

---

## 📝 หมายเหตุ

- ข้อมูลสินค้าเป็น **mock data** แก้ไขได้ที่ `src/data/products.js`
- ระบบชำระเงินเป็น **การจำลอง** ยังไม่ได้เชื่อมต่อ payment gateway หรือ backend จริง
- โฟลเดอร์ `node_modules/` และ `dist/` ถูก ignores ผ่าน `.gitignore` เรียบร้อยแล้ว
