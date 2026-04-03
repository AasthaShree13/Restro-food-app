# 🍔 Restro Food Backend API

A scalable REST API for a multi-restaurant food ordering system built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.

Supports multiple user roles including **Client, Vendor, Admin, and Driver** with secure JWT-based authentication and role-based access control.

---

## 📌 Key Features

- 🔐 JWT Authentication & Authorization
- 🔑 Password encryption using bcrypt
- 👥 Multi-role system (Client, Vendor, Admin, Driver)
- 🏪 Multi-restaurant architecture
- 🍽️ Food & category management
- 🧾 Order management with restaurant-level isolation
- 🔄 Cascading delete for data consistency
- ⚙️ MVC-based backend structure

---

## 👥 User Roles & Capabilities

### 👤 Client

- Browse food, categories, and restaurants (no auth required)
- Filter food by category or restaurant
- Search food, category, and restaurant by ID
- Place orders (authentication required)

---

### 🏪 Vendor (Restaurant Staff)

- Register with a valid `restaurantId`
- Create, update, and delete food items
- View orders of their restaurant only
- Update order status (restricted to their restaurant)

---

### 🧑‍💼 Admin

- Create and delete restaurants
- Manage categories
- Perform cascading deletes:
  - Removes related vendors
  - Removes related food items

---

### 🚚 Driver

- Reserved for future delivery functionality

---

## 🔐 Authentication

- Register/Login → No token required
- Protected routes → Require JWT

Authorization header format:
Authorization: Bearer <your_jwt_token>

- Middleware attaches logged-in user ID:
  req.body.id = decodedUserId

---

## 🌐 Base URL

http://localhost:<PORT>/api/v1

---

## 📡 API Endpoints

### 🔑 Auth — `/auth`

- POST `/register` → Register user
- POST `/login` → Login and get JWT

---

### 👤 User — `/user`

- GET `/getUser` → Get profile
- PUT `/updateUser` → Update profile
- POST `/updatePassword` → Change password
- POST `/resetPassword` → Reset password
- DELETE `/deleteUser` → Delete account

---

### 🏪 Restaurant — `/restro`

- POST `/createRestro` → Create restaurant (Admin only)
- GET `/getAll` → Get all restaurants
- GET `/get/:id` → Get restaurant by ID
- DELETE `/deleteRestro/:id` → Delete restaurant (Admin only)

---

### 📂 Category — `/category`

- POST `/create` → Create category (Admin only)
- GET `/getAll` → Get all categories
- PUT `/update/:id` → Update category (Admin only)
- DELETE `/delete/:id` → Delete category (Admin only)

---

### 🍽️ Food — `/food`

- POST `/create` → Create food (Vendor only)
- GET `/getAll` → Get all food
- GET `/get/:id` → Get food by ID
- GET `/getByRestro/:id` → Food by restaurant
- GET `/getByCat/:id` → Food by category
- PUT `/update/:id` → Update food (Vendor only)
- DELETE `/delete/:id` → Delete food (Vendor only)

---

### 🧾 Orders — `/food`

- POST `/placeOrder` → Place order (User)
- GET `/getAllOrders` → Get vendor-specific orders
- PUT `/changeOrderStatus/:id` → Update order status (Vendor only)

---

## 🛒 Order Logic

- User sends:
  {
  "cart": ["foodId1", "foodId2"],
  "payment": {}
  }

### ✔ Validations:

- All food items must belong to the same restaurant
- Restaurant is derived from food items (secure backend logic)

---

## ⚙️ Setup & Installation

### 1. Install dependencies

npm install

---

### 2. Create `.env`

MONGO_URL=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
Port=8080

⚠️ Uses process.env.Port (capital P)

---

### 3. Run server

npm run server

---

## 📁 Project Structure

config/ # Database connection  
controllers/ # Business logic  
models/ # Schemas  
routes/ # API routes  
middleware/ # Auth & role checks  
server.js # Entry point

---

## 🔐 Security Features

- JWT authentication
- Password encryption using bcrypt
- Role-based authorization
- Protected routes
- Scoped data access

---

## 🔄 Data Integrity

- Deleting a restaurant (Admin only):
  - Automatically deletes all related vendors
  - Automatically deletes all food items

- Ensures clean and consistent database state

---

## 🧪 Test Endpoint

GET /api/v1/test/test-user

---

## 🛠️ Scripts

- npm run server → Run with nodemon

---

## 🚀 Future Improvements

- Payment integration
- Delivery system (Driver role)
- API documentation (Swagger)
- Deployment (Render/AWS)

---

## 👩‍💻 Author

Aastha Shree
