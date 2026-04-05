# 💰 Finance Data Processing and Access Control Backend

A clean, modern REST API backend for a finance dashboard system built with **Node.js**, **Express**, and **MongoDB**.

---

## 🔗 Links

| | URL |
|---|---|
| 🐙 GitHub Repository | https://github.com/Sufalthakre18/finance-dashboard-backend |
| 🚀 Live API (Render) | https://finance-dashboard-backend-a6rt.onrender.com |
| 🏠 Health Check | https://finance-dashboard-backend-a6rt.onrender.com/ |

---

## 📌 Project Overview

This backend powers a finance dashboard system where different users interact with financial records based on their role. It supports:

- JWT-based authentication
- Role-based access control (Viewer / Analyst / Admin)
- Full CRUD for financial transactions
- Dashboard analytics and summary APIs
- Input validation, error handling, and rate limiting
- Soft delete, pagination, and advanced filtering

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcryptjs |
| Validation | express-validator |
| Security | Helmet, CORS, express-rate-limit |
| Environment | dotenv |

---

## 📁 Project Structure

```
finance-dashboard-backend/
├── src/
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js        # Register, login, profile
│   │   ├── user.controller.js        # User management (admin)
│   │   ├── transaction.controller.js # Financial records CRUD
│   │   └── dashboard.controller.js   # Analytics & summaries
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication
│   │   ├── roleCheck.js              # Role-based access control
│   │   └── errorHandler.js           # Global error handler
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   └── Transaction.js            # Transaction schema
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── transaction.routes.js
│   │   └── dashboard.routes.js
│   ├── validators/
│   │   └── validators.js             # All validation rules
│   ├── utils/
│   │   ├── validate.js               # Validation result handler
│   │   └── seeder.js                 # Database seed script
│   └── app.js                        # App entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sufalthakre18/finance-dashboard-backend.git
cd finance-dashboard-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 4. Seed demo data

```bash
node src/utils/seeder.js
```

This creates 3 demo users and 20 sample transactions:

| Role | Email | Password |
|---|---|---|
| Admin | admin@finance.com | admin123 |
| Analyst | analyst@finance.com | analyst123 |
| Viewer | viewer@finance.com | viewer123 |

### 5. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## 🔐 Roles & Permissions

| Action | Viewer | Analyst | Admin |
|---|:---:|:---:|:---:|
| Register / Login | ✅ | ✅ | ✅ |
| View own profile | ✅ | ✅ | ✅ |
| View transactions | ✅ | ✅ | ✅ |
| Create transactions | ❌ | ✅ | ✅ |
| Update transactions | ❌ | ❌ | ✅ |
| Delete transactions | ❌ | ❌ | ✅ |
| View dashboard summary | ✅ | ✅ | ✅ |
| View category totals | ✅ | ✅ | ✅ |
| View recent activity | ✅ | ✅ | ✅ |
| View monthly trends | ❌ | ✅ | ✅ |
| View weekly trends | ❌ | ✅ | ✅ |
| Manage users | ❌ | ❌ | ✅ |

---

## 📡 API Reference

**Base URL (Production):** `https://finance-dashboard-backend-a6rt.onrender.com`

**Base URL (Local):** `http://localhost:5000`

All protected routes require:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔑 Auth Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get JWT token |
| GET | `/api/auth/me` | All roles | Get logged-in user profile |

---

### 👤 User Endpoints (Admin Only)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List all users (paginated) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a new user |
| PATCH | `/api/users/:id/role` | Update user role |
| PATCH | `/api/users/:id/status` | Activate or deactivate user |

---

### 💰 Transaction Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/transactions` | All roles | List all transactions |
| GET | `/api/transactions/:id` | All roles | Get single transaction |
| POST | `/api/transactions` | Analyst, Admin | Create transaction |
| PUT | `/api/transactions/:id` | Admin | Update transaction |
| DELETE | `/api/transactions/:id` | Admin | Soft delete transaction |

**Supported query filters for `GET /api/transactions`:**

| Param | Example | Description |
|---|---|---|
| `type` | income | Filter by income or expense |
| `category` | Salary | Partial match search |
| `startDate` | 2024-01-01 | Date range start |
| `endDate` | 2024-12-31 | Date range end |
| `minAmount` | 100 | Minimum amount |
| `maxAmount` | 5000 | Maximum amount |
| `page` | 1 | Page number |
| `limit` | 10 | Records per page |
| `sortBy` | date | Sort field |
| `sortOrder` | desc | asc or desc |

---

### 📊 Dashboard Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/dashboard/summary` | All roles | Total income, expenses, net balance |
| GET | `/api/dashboard/category-totals` | All roles | Breakdown by category |
| GET | `/api/dashboard/recent` | All roles | Recent transactions |
| GET | `/api/dashboard/monthly-trends` | Analyst, Admin | Monthly income vs expense |
| GET | `/api/dashboard/weekly-trends` | Analyst, Admin | Daily totals for last 7 days |

---

## 🧪 Quick Test (Postman)

1. **Login** → `POST /api/auth/login` with `admin@finance.com` / `admin123`
2. Copy the token from response
3. Add header `Authorization: Bearer <token>` to all further requests
4. **Test summary** → `GET /api/dashboard/summary`
5. **Create transaction** → `POST /api/transactions`
6. **Test access control** → Login as viewer, try `POST /api/transactions` → should get `403`

---

## ✨ Features Implemented

| Feature | Status |
|---|---|
| User & Role Management | ✅ |
| JWT Authentication | ✅ |
| Financial Records CRUD | ✅ |
| Advanced Filtering & Search | ✅ |
| Pagination | ✅ |
| Dashboard Summary APIs | ✅ |
| Category-wise Totals | ✅ |
| Monthly & Weekly Trends | ✅ |
| Role-Based Access Control | ✅ |
| Input Validation | ✅ |
| Global Error Handling | ✅ |
| Soft Delete | ✅ |
| Rate Limiting | ✅ |
| Security Headers (Helmet) | ✅ |
| Database Seeder | ✅ |
| MongoDB Indexes | ✅ |

---

## 🧠 Assumptions Made

1. **Self-registration defaults to Viewer role** — Admins can upgrade roles later via the user management API.
2. **Soft delete only** — Transactions are never permanently removed to preserve audit history.
3. **Admins cannot modify their own role or status** — Prevents accidental self-lockout.
4. **Analysts can create but not edit/delete** — Only admins can correct records for data integrity.
5. **Mongoose 7+ async hooks** — Pre-save hooks don't use the `next` callback; they rely on the returned Promise.

---

## 📄 License

MIT — free to use and modify.