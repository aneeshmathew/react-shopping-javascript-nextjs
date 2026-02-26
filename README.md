# ShopNext

A Next.js e-commerce app with authentication, a Redux-powered shopping cart, and product browsing via the [FakeStore API](https://fakestoreapi.com).

## Stack

- **Next.js 16** (App Router) — JavaScript
- **Redux Toolkit** + **React Redux** — client-side cart state with localStorage persistence
- **NextAuth v5** — credentials-based authentication (JWT sessions)
- **Tailwind CSS v4** — styling

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
AUTH_SECRET=your-secret-key-min-32-chars
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo credentials

| Email | Password |
|---|---|
| demo@example.com | password123 |
| jane@example.com | password123 |

## Project structure

```
src/
├── app/                        # Next.js App Router routes (thin server entry points)
│   ├── api/auth/[...nextauth]/ # NextAuth route handler
│   ├── cart/                   # Cart page (requires auth)
│   ├── login/                  # Login page
│   ├── products/[id]/          # Product detail page
│   └── page.jsx                # Home / product listing
├── components/
│   ├── server/                 # Server components (no "use client")
│   │   ├── api/                # Server-side data fetching services
│   │   ├── auth/               # Auth UI (LoginView)
│   │   └── product/            # Product UI (ProductCard, ProductList, etc.)
│   └── client/                 # Client components ("use client")
│       ├── cart/               # Cart UI (CartView, CartSidebar, AddToCartButton)
│       ├── auth/               # Login form
│       ├── nav/                # NavBar
│       ├── product/            # CategoryFilter
│       └── providers/          # Redux + NextAuth providers
└── store/                      # Redux
    ├── cartSlice.js            # Cart state, actions, selectors
    └── store.js                # Store assembly + localStorage persistence
```
