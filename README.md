# UrbanStep E-Commerce - Full Stack MERN Integration

Welcome to **UrbanStep**, a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce website for selling shoes, clothing, and accessories.

This project connects your existing React frontend to a Node.js REST API backend connected to a MongoDB database (`ecommerceDB`).

---

## 📁 Project Architecture & Folder Structure

```
E-commerce/
├── backend/                  # Node.js + Express.js + MongoDB Backend
│   ├── config/
│   │   └── db.js             # Mongoose MongoDB database connection
│   ├── controllers/
│   │   ├── adminController.js # Admin dashboard & global orders
│   │   ├── authController.js  # User registration, login & JWT auth
│   │   ├── cartController.js  # User shopping cart operations
│   │   ├── orderController.js # Checkout, stock reduction & order history
│   │   └── productController.js# Product catalog, filters, search & CRUD
│   ├── middleware/
│   │   ├── adminMiddleware.js # Restricts access to admin roles
│   │   ├── authMiddleware.js  # JWT Bearer token protection
│   │   └── errorMiddleware.js # Global 404 and Express error handlers
│   ├── models/
│   │   ├── Cart.js           # Mongoose Cart model ('carts' collection)
│   │   ├── Order.js          # Mongoose Order model ('orders' collection)
│   │   ├── Product.js        # Mongoose Product model ('products' collection)
│   │   └── User.js           # Mongoose User model ('users' collection)
│   ├── routes/
│   │   ├── adminRoutes.js    # /api/admin endpoints
│   │   ├── authRoutes.js     # /api/auth endpoints
│   │   ├── cartRoutes.js     # /api/cart endpoints
│   │   ├── orderRoutes.js    # /api/orders endpoints
│   │   └── productRoutes.js  # /api/products endpoints
│   ├── utils/
│   │   ├── generateToken.js  # JWT signing utility
│   │   └── seed.js           # Database seeding script for sample products & users
│   ├── .env                  # Environment variables (secret)
│   ├── .env.example          # Sample template for environment variables
│   ├── .gitignore            # Git ignore configuration
│   ├── package.json          # Node.js backend dependencies
│   └── server.js             # Express application entry point
│
└── frontend/                 # Vite + React.js Frontend
    ├── src/
    │   ├── components/       # Navbar, Footer, ProductCard, SearchBar, Toast
    │   ├── context/          # AuthContext (JWT state), CartContext
    │   ├── pages/            # Home, Shop, ProductDetails, Cart, Checkout, Login, Register, Orders
    │   └── services/
    │       └── api.js        # Central API module for backend requests
    ├── .env                  # Frontend env (VITE_API_URL=http://localhost:5000/api)
    ├── package.json
    └── vite.config.js
```

---

## 🗄️ MongoDB Database Setup (`ecommerceDB`)

The backend connects to MongoDB using the explicit collection names:
- `products`: Product catalog, categories (Shoes, Clothes), variants, stock, images.
- `users`: Registered customers & administrators with bcrypt hashed passwords.
- `carts`: Registered user shopping carts.
- `orders`: Confirmed customer orders with price snapshots and shipping details.

### Local MongoDB Connection String (Default)
```
mongodb://127.0.0.1:27017/ecommerceDB
```

---

## 🚀 Quick Start Guide

### 1. Install Backend Dependencies
Open your terminal in the `backend` folder and run:
```bash
cd backend
npm install
```

### 2. Configure Environment Variables (`backend/.env`)
Create or edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerceDB
JWT_SECRET=urbanstep_secret_jwt_key_2026_super_secure
CLIENT_URL=http://localhost:5173
```

### 3. Seed MongoDB Database (Sample Shoes, Clothes & Users)
To populate your MongoDB database with sample shoes, clothes, and default accounts, run:
```bash
node utils/seed.js
```

#### Pre-configured Seed Accounts:
- **Customer Account**:
  - **Email**: `customer@urbanstep.com`
  - **Password**: `customer123`
- **Admin Account**:
  - **Email**: `admin@urbanstep.com`
  - **Password**: `admin123`

### 4. Start the Node.js Backend Server
```bash
npm run dev   # Or npm start
```
*Your REST API will run at `http://localhost:5000/api`.*

---

### 5. Start the React Frontend
In a new terminal window, navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
*Your React website will run at `http://localhost:5173`.*

---

## 📡 REST API Endpoint Reference

### 🛍️ Products (`/api/products`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Fetch all active products (supports `category`, `gender`, `brand`, `search`, `sortBy`) |
| `GET` | `/api/products/:id` | Public | Fetch single product by MongoDB ObjectId |
| `GET` | `/api/products/slug/:slug` | Public | Fetch single product by unique slug |
| `POST` | `/api/admin/products` | Admin | Create a new product |
| `PATCH` | `/api/admin/products/:id` | Admin | Update product details |
| `DELETE` | `/api/admin/products/:id` | Admin | Soft delete product (`isActive = false`) |

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register customer account, hash password & return JWT |
| `POST` | `/api/auth/login` | Public | Authenticate user credentials & return JWT |
| `GET` | `/api/auth/me` | Private | Retrieve currently authenticated user profile |

### 🛒 Cart (`/api/cart`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Private | Fetch user cart with live price calculations |
| `POST` | `/api/cart/add` | Private | Add variant item to cart with stock validation |
| `PATCH` | `/api/cart/update` | Private | Update variant item quantity |
| `DELETE` | `/api/cart/remove/:sku` | Private | Remove variant item by SKU |
| `DELETE` | `/api/cart/clear` | Private | Empty cart |

### 📦 Orders (`/api/orders`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Private | Create order, validate stock, snapshot prices, reduce inventory & clear cart |
| `GET` | `/api/orders/my-orders` | Private | Return customer order history |
| `GET` | `/api/orders/:id` | Private | Fetch specific order by ID |
| `PATCH` | `/api/admin/orders/:id/status` | Admin | Update order status (`processing`, `shipped`, `delivered`, `cancelled`) |

### 📊 Admin (`/api/admin`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/dashboard` | Admin | Total products, total users, total orders, total revenue |
| `GET` | `/api/admin/orders` | Admin | View all system orders for management |

---

## 📮 Postman API Request Examples

### 1. Register User
- **URL**: `POST http://localhost:5000/api/auth/register`
- **Body** (`JSON`):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secretpassword123",
  "phone": "+1 (555) 321-9876"
}
```

### 2. User Login
- **URL**: `POST http://localhost:5000/api/auth/login`
- **Body** (`JSON`):
```json
{
  "email": "customer@urbanstep.com",
  "password": "customer123"
}
```

### 3. Add to Cart (Requires Bearer Token header)
- **URL**: `POST http://localhost:5000/api/cart/add`
- **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
- **Body** (`JSON`):
```json
{
  "productId": "<MONGODB_PRODUCT_ID>",
  "sku": "air-pulse-retro-uk7-blk",
  "quantity": 1,
  "size": "UK 7",
  "color": "Black/Red"
}
```

### 4. Create Order
- **URL**: `POST http://localhost:5000/api/orders`
- **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
- **Body** (`JSON`):
```json
{
  "shippingAddress": {
    "fullName": "Alex Rivera",
    "street": "742 Evergreen Terrace",
    "city": "Springfield",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "cod"
}
```

---

## 🛠️ Troubleshooting & Common Errors

### 1. MongoDB Connection Error (`ECONNREFUSED 127.0.0.1:27017`)
- Ensure MongoDB service is running on your machine.
- If using MongoDB Atlas, update `MONGO_URI` in `backend/.env`:
  ```env
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerceDB?retryWrites=true&w=majority
  ```

### 2. CORS Error (`Access to fetch at ... blocked by CORS policy`)
- Verify that `CLIENT_URL` in `backend/.env` matches your React dev server origin (`http://localhost:5173`).

---

## ✨ Features Implemented
- ✅ Real MongoDB Database integration with Mongoose ODM
- ✅ Full REST API architecture with express middleware
- ✅ Password hashing using `bcryptjs`
- ✅ JWT Authentication & Authorization
- ✅ Complete storefront product browsing, search, and category filtering from database
- ✅ Order placement with server-side price calculation and atomic stock deduction
- ✅ Customer account registration, login, and order history view
- ✅ Admin management endpoints for orders, dashboard stats, and products
