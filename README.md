# E-Commerce RESTful API

A **Node.js-based RESTful API** for an e-commerce platform designed to handle user authentication, product and category management, orders, and payment processing with Stripe. The API uses **MongoDB** for database management and integrates with **Cloudinary** for efficient image storage.

---

## 🚀 Features

- **🔐 User Authentication:** Secure login and registration with session handling and cookie parsing.
- **🛍️ Product Management:** CRUD operations for products via dedicated API endpoints.
- **📦 Category Management:** Manage product categories seamlessly.
- **📦 Order Management:** Full order lifecycle management with Stripe payment integration.
- **🖼️ Image Uploads:** Cloudinary integration for reliable image storage and management.
- **🛡️ Security:** Enhanced security with data sanitization, CORS, Helmet, and more.

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Processing:** Stripe API
- **Image Storage:** Cloudinary
- **Authentication:** Passport.js (if implemented)
- **Environment Config:** dotenv
- **Security:** cookie-parser, cors, helmet, express-mongo-sanitize

---

## ⚙️ Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/DhruvGajera9022/E-Commerce-NodeJs.git
   cd E-Commerce-NodeJs
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server:**
   ```bash
   npm start
   ```

---

## 📦 API Endpoints

### 1️⃣ Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### 2️⃣ Product Management
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

### 3️⃣ Category Management
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create a new category (Admin only)
- `PUT /api/categories/:id` - Update category details
- `DELETE /api/categories/:id` - Remove a category

### 4️⃣ Order Management
- `POST /api/orders` - Create a new order
- `GET /api/orders/:userId` - Get orders for a specific user
- `PUT /api/orders/:id` - Update an order (Admin only)
- `DELETE /api/orders/:id` - Delete an order (Admin only)

### 5️⃣ Payment (Stripe)
- `POST /api/payment` - Process payment securely

---

## 🔐 Security Features

- **Data Sanitization:** Protect against NoSQL injection with `express-mongo-sanitize`.
- **CORS:** Secure cross-origin requests with `cors`.
- **HTTP Headers:** Enhanced HTTP security using `helmet`.
- **JWT Authentication:** Secure routes with JSON Web Tokens.

---

## 🧪 Testing

You can test the API using **Postman** or **cURL**:

- Import the provided Postman collection (if available).
- Test routes by providing necessary headers and body data.

---

## 🙋‍♂️ Contact

For questions or support:
- **GitHub:** [DhruvGajera9022](https://github.com/DhruvGajera9022)
- **Email:** dhruvgajera05@example.com

---

> **Note:** Replace placeholder values in `.env` and contact sections with actual information as needed.

