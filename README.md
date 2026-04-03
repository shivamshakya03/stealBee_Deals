# stealBee Deals — Affiliate E-Commerce Platform

A production-grade full-stack affiliate e-commerce platform built for a real client. Live and actively serving users with zero downtime. Features a Telegram Bot as a lightweight CMS, PostgreSQL database, real-time analytics, and a fully responsive React frontend.

**Live:** https://stealbeedeals.com

---

## 🏗 Architecture Overview

Three independent systems working together:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Telegram Bot (CMS)                                │
│   Client sends product → Bot parses & inserts       │
│   directly into PostgreSQL (Supabase)               │
│                                                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Backend API (Node.js / Express.js)                │
│   REST APIs → Products, Categories, Analytics       │
│   Visitor tracking → Unique users + daily stats     │
│   Telegram webhook integrated (production)          │
│                                                     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Frontend (React.js + Redux Toolkit)               │
│   Category pages, product listing, analytics        │
│   Mobile responsive, memoized state, click tracking │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🤖 Telegram Bot CMS
- Client adds products by sending a formatted message to the bot
- Bot automatically parses product name, price, store, tag, affiliate link, and image
- Auto-calculates discount percentage: `((old_price - current_price) / old_price) * 100`
- Supports image via Telegram photo upload or direct image URL
- Inserts directly into Supabase PostgreSQL — no admin panel needed
- Environment-aware: webhook mode in production, polling in local dev

### 🛍 Product Platform
- Products from Amazon, Flipkart, Meesho, and custom categories
- Steal Deals section — products with 70%+ discount automatically filtered
- Top 10 most discounted products on homepage
- Category-based filtering via dynamic routes `/products/:categoryName`
- Product click tracking — every affiliate link click increments `total_clicks` in DB

### 📊 Analytics & Visitor Tracking
- UUID v4 based unique visitor identification (stored in localStorage)
- Daily unique visitor tracking — separate table for unique users per day
- Daily visit count tracking — total visits per day with auto-refresh every 60 seconds
- Two separate analytics tables: `daily_visitors` (unique) and `daily_visits` (total)

### ⚡ Frontend Performance
- Redux Toolkit with `createAsyncThunk` — consistent loading/error state for all API calls
- Memoized selectors using `createSelector` — prevents unnecessary re-renders
- Mobile-responsive with `UseIsMobile` hook — different component rendering for mobile vs desktop
- Scroll restoration and ScrollToTop on every route change
- Axios service layer (`productService.js`) — clean separation of API logic from components

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux Toolkit, React Router DOM, Axios |
| State Management | Redux Toolkit (createAsyncThunk + createSlice + createSelector) |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Bot | Telegraf.js (Telegram Bot API) |
| Analytics | UUID v4, Supabase real-time queries |
| Config | dotenv (environment-aware) |
| Deployment | Render.com |

---

## 📁 Project Structure

```
stealBee_Deals/
│
├── backend/
│   ├── config/
│   │   └── supabaseClient.js        # Supabase connection
│   ├── controller/
│   │   ├── productController.js     # Product CRUD + category logic
│   │   └── visitorController.js     # Visitor + visit tracking
│   ├── models/
│   │   └── clickLogModel.js         # Click log schema
│   ├── routes/
│   │   ├── productRoutes.js         # /api/products routes
│   │   └── visitorsRoutes.js        # /api/visitors routes
│   └── server.js                    # Express app + webhook setup
│
├── telegram-bot/
│   ├── bot.js                       # Bot logic + Supabase insert
│   └── supabaseClient.js            # Bot's Supabase connection
│
└── frontend/
    ├── src/
    │   ├── features/products/
    │   │   ├── productSlice.js      # Redux slice + async thunks
    │   │   └── productSelectors.js  # Memoized selectors
    │   ├── services/
    │   │   ├── apiClient.js         # Axios base config
    │   │   └── productService.js    # All API calls
    │   ├── store/
    │   │   └── store.js             # Redux store config
    │   ├── pages/                   # Route-level page components
    │   ├── ui/                      # Reusable UI components
    │   └── App.jsx                  # Routes + visitor tracking
    └── config/
        └── supabaseClient.js        # Frontend Supabase client
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/categories/:category` | Get by category |
| GET | `/api/products/topten-discounts` | Top 10 discounted |
| POST | `/api/products/:id/click` | Track affiliate click |
| POST | `/api/visitors/track` | Track unique visitor |
| GET | `/api/visitors/stats` | Unique visitors per day |
| POST | `/api/visitors/dailyperdaytrack` | Track daily visit |
| GET | `/api/visitors/dailyperdaystats` | Daily visit stats |

---

## 🗄 Database Schema (Supabase / PostgreSQL)

### products
| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| product_name | text | Product title |
| description | text | Product description |
| image_url | text | Product image |
| current_price | numeric | Current selling price |
| old_price | numeric | Original price |
| discount_percent | integer | Auto-calculated by bot |
| store_name | text | Amazon / Flipkart / Meesho |
| tag | text | Category tag |
| affiliate_link | text | Tracked affiliate URL |
| total_clicks | integer | Click count |
| istrending | boolean | Trending flag |
| created_at | timestamp | Auto-generated |

### daily_visitors
| Column | Type | Description |
|---|---|---|
| visit_date | date | Date of visit |
| user_identifier | uuid | Unique user UUID |

### daily_visits
| Column | Type | Description |
|---|---|---|
| visit_date | date | Date |
| total_visited_users | integer | Total visits that day |

---

## 🔑 Key Technical Decisions

- **Telegram Bot as CMS** — eliminates need for a separate admin panel. Client manages all product content directly via Telegram messages. Discount percentage is auto-calculated from prices.
- **Environment-aware bot** — uses webhook in production (Render), polling in local development — no code changes needed between environments.
- **Redux async thunk pattern** — all API calls have consistent `pending/fulfilled/rejected` states, making loading and error handling uniform across the entire frontend.
- **createSelector memoization** — prevents unnecessary component re-renders when unrelated state changes, improving frontend performance.
- **UUID-based visitor tracking** — unique visitors identified without requiring login, UUID stored in localStorage and tracked per day in PostgreSQL.
- **Two visitor tables** — `daily_visitors` tracks unique users (deduplicates per day), `daily_visits` tracks total page visits (increments every visit).
- **Modular backend** — routes, controllers, models all separated for maintainability and scalability.

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+
- Supabase account (free tier works)
- Telegram Bot Token (from @BotFather)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` in root:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
PORT=5000
NODE_ENV=development
```

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` in frontend:
```
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

### Telegram Bot (local dev)
Bot starts automatically in polling mode when `NODE_ENV=development`.
Send a product message in this format:
```
product_name: iPhone 15
description: Latest Apple iPhone
current_price: 69999
old_price: 89999
store_name: Amazon
tag: electronics
affiliated_link: https://amzn.to/example
istrending: true
```

---

## 🔄 Deployment & CI/CD

- Deployed on **Render.com**
- GitHub connected to Render — push to `main` triggers automatic deployment
- **3-branch Git workflow:**
  - `develop` → active development
  - `qa` → testing and validation  
  - `main` → production (auto-deploys on push)
- Telegram webhook automatically set on server start in production

---

## 📈 Live Stats

- Zero downtime since launch
- Actively used by real client and customers daily
- Visitor analytics tracked and monitored in real-time
