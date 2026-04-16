# 🛒 Yassify E-Commerce Platform

![Yassify Banner](https://i.ibb.co/fVyLVkzF/logo.png) <!-- Update with actual banner if available -->

<div align="center">
  <h3>Modern, Fast, and Robust E-Commerce Solution</h3>
  <p>Building the future of online grocery shopping with cutting-edge web technologies.</p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-Enabled-black?style=for-the-badge" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Auth-NextAuth.js-000000?style=for-the-badge&logo=next.js" alt="NextAuth" />
</div>

<br />

## 📖 Overview

**Yassify** is a premium online grocery store designed to provide a seamless, lightning-fast shopping experience. Built completely on the modern **Next.js App Router**, the project leverages the power of Server Components, robust Client State Management, and a beautifully crafted UI using **Tailwind CSS v4** and **shadcn/ui**.

The codebase is rigorously typed with **100% strict TypeScript** (Zero `any` types), ensuring high maintainability and developer experience.

---

## ✨ Key Features

### 🛍️ E-Commerce Core
- **Product Catalog**: Browse products by category, brand, or deals.
- **Dynamic Wishlist & Cart**: Add, update, and remove items with real-time global counter badges in the navigation bar using the `CartWishlistContext`.
- **Checkout Flow**: Secure and intuitive checkout process.
- **Order Tracking**: View past and current orders.

### 🛡️ Architecture & Reliability
- **Zero `any` TypeScript**: Fully typed request/response shapes, props, and states for bug-free development.
- **Comprehensive Error Boundaries**: Global, shop-level, and auth-level error boundaries seamlessly catch anomalies without crashing the app.
- **Refined Loading States**: Beautiful skeleton loaders matching actual component layouts for `Products`, `Categories`, `Brands`, `Orders`, and `Checkout` pages.

### 🚀 Performance & SEO
- **Server Components (RSC)**: Heavy data fetching relies on server-side rendering for optimal performance.
- **Professional SEO**: Dynamic `generateMetadata` implementation yielding robust Open Graph (OG) tags, Twitter Cards, Canonical URLs, and robots directives for every product and category.
- **Middleware Protected Routes**: Authentication via NextAuth (`proxy.ts` -> `middleware.ts`) secures private routes seamlessly.

### 🎨 Beautiful UI/UX
- **Shadcn UI & Tailwind CSS v4**: Accessible, flexible, and visually stunning components.
- **Swiper Integration**: Smooth, touch-friendly product carousels.
- **Dark Mode Support**: Context-aware theme styling integrated natively via `next-themes`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (v16 App Router)](https://nextjs.org/)
- **Core Library**: React 19
- **Authentication**: [NextAuth.js (v4)](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## 📂 Project Structure

```bash
src/
├── actions/         # Next.js Server Actions for Cart, Wishlist, Orders
├── app/             # App Router pages, layout, error, loading, and API routes
│   ├── (auth)/      # Authentication route group (SignIn, SignUp)
│   ├── (shop)/      # Main shopping routes (Products, Cart, Wishlist, Categories)
│   └── (static)/    # Static informational routes
├── components/      # React functional components
│   ├── forms/       # Complex form components
│   ├── layout/      # Navbar, Footer
│   ├── shared/      # Reusable UI parts (ProductCards, Skeletons, etc.)
│   └── ui/          # Base Shadcn UI components
├── lib/             # Utility functions
├── providers/       # Context Providers (Global State, Auth, Theme)
├── services/        # External API communication layers
└── types/           # Strict TypeScript interfaces & types
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `^20.0.0` or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_super_secret_key
   NEXT_PUBLIC_API_BASE_URL=https://ecommerce.routemisr.com
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Roadmap & Future Enhancements

We are continuously working to improve the platform. Upcoming features include:
- [ ] **Optimistic UI Updates**: Instant UI feedback pending server responses for Cart & Wishlist actions.
- [ ] **Advanced Filtering & Sorting**: Powerful client/server side search and filtering bar.
- [ ] **Real-Time Notifications Core**: A notification center panel for account updates.
- [ ] **Internationalization (i18n)**: Arabic and English multi-language support.
- [ ] **Progressive Web App (PWA)**: Enhanced mobile installation capability.

---

## 👨‍💻 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <i>Created by Kamal Mohamed </i>
</div>
