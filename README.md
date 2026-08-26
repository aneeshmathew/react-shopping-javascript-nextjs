# ShopNext

A Next.js e-commerce app with authentication, a Redux-powered shopping cart, product search, category and price/rating filtering, and product browsing via the [DummyJSON API](https://dummyjson.com).

## Features

- **Product browsing** — full catalog pulled from DummyJSON, with server-rendered product grid and detail pages
- **Typeahead search** — debounced live suggestions (title, thumbnail, price) as you type, plus a full search-results view
- **Category filter** — dropdown of all real product categories (not a fixed/hardcoded list)
- **Price range filter** — filter the catalog between a min and max price
- **Star rating filter** — filter to products rated 1★ and up through 4★ and up
- All filters (search, category, price, rating) combine and live in the URL as query params, so results are shareable and bookmarkable
- **Cart** — Redux-powered, persisted to `localStorage`, protected behind login
- **Auth** — credentials-based sign-in via NextAuth v5

## Stack

- **Next.js 16** (App Router) — JavaScript
- **Redux Toolkit** + **React Redux** — client-side cart state with `localStorage` persistence
- **NextAuth v5** — credentials-based authentication (JWT sessions)
- **Tailwind CSS v4** — styling
- **[DummyJSON](https://dummyjson.com)** — product data (catalog, search, categories)

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

## Project structure

```
src/
├── app/                                  # Route entry points (thin server components)
│   ├── api/auth/[...nextauth]/route.js   # NextAuth route handler
│   ├── cart/page.jsx                     # Cart page (auth protected)
│   ├── login/page.jsx                    # Login page
│   ├── products/[id]/page.jsx            # Product detail page
│   ├── page.jsx                          # Home / product listing (reads category, q, price, rating from the URL)
│   └── layout.jsx                        # Root layout
│
├── components/
│   ├── server/                           # Server components (no "use client")
│   │   ├── api/
│   │   │   ├── auth.js                   # NextAuth config (handlers, auth, signIn, signOut)
│   │   │   └── products.js               # DummyJSON API client (getProducts, getProduct, getCategories)
│   │   ├── auth/
│   │   │   └── LoginView.jsx             # Login page layout wrapping LoginForm
│   │   └── product/
│   │       ├── ProductsView.jsx          # Home page layout (heading + search + filters + list)
│   │       ├── ProductList.jsx           # Fetches and renders the filtered product grid
│   │       ├── ProductCard.jsx           # Single product card
│   │       └── ProductDetail.jsx         # Full product detail view
│   │
│   └── client/                           # Client components ("use client")
│       ├── auth/
│       │   └── LoginForm.jsx             # Email/password sign-in form
│       ├── cart/
│       │   ├── CartView.jsx              # Full cart page UI
│       │   ├── CartSidebar.jsx           # Slide-out cart drawer
│       │   └── AddToCartButton.jsx       # Add to cart button with feedback
│       ├── nav/
│       │   └── NavBar.jsx                # Top navigation with cart badge
│       ├── product/
│       │   ├── SearchBar.jsx             # Typeahead product search (debounced suggestions dropdown)
│       │   └── ProductFilters.jsx        # Category dropdown + price range + star rating filters
│       └── providers/
│           ├── AppProviders.jsx          # Composes Redux + NextAuth providers
│           └── StoreProvider.jsx         # Initialises Redux store for the React tree
│
├── lib/
│   └── formatCategoryLabel.js            # Turns a category slug ("home-decoration") into a display label ("Home Decoration")
│
├── store/
│   ├── cartSlice.js                      # Cart state, actions (addItem, removeItem, etc.) and selectors
│   └── store.js                          # Redux store config + localStorage persistence
│
└── middleware.js                         # Redirects unauthenticated users away from /cart
```

## Key patterns

- **Every `page.jsx` is a server component** — it only handles data fetching, auth checks, and `notFound()` guards, then delegates all rendering to a component in `components/`.
- **Server/client split in `components/`** — `server/` contains components with no interactivity; `client/` contains components marked `"use client"`.
- **API utilities live in `components/server/api/`** — keeping data-fetching functions alongside the server components that use them.
- **Search, category, price, and rating filters are URL-driven** — `SearchBar` and `ProductFilters` update the URL's query params (`q`, `category`, `minPrice`, `maxPrice`, `minRating`); `page.jsx` reads them and passes them down to `getProducts()`, so the whole flow re-renders server-side on every filter change with no client-side data-fetching state to manage.
- **Redux store is scoped to the client tree** — initialised once in `StoreProvider` using a `useRef` to avoid re-creation on re-renders, with automatic `localStorage` sync.