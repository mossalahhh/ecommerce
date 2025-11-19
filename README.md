
# 🛍️ E-commerce API - Full-Stack E-commerce Platform

[![Node.js](https://img.shields.io/badge/Node.js-22.17.0-green.svg)](https://nodejs.org/)
[![Express.js](https://img-shields.io/badge/Framework-Express.js-blue.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248.svg)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-ISC-orange)](LICENSE)

---

## 💡 Overview

This project is the Backend API for a robust e-commerce platform built using **Node.js, Express.js, and MongoDB**. It features a comprehensive system for managing users, products, shopping carts, orders, and coupons, focusing on security and modularity.

### 📁 Project Structure

The project is organized using a clear **Modules** architecture for maintainability:

ecommerce/ ├── node_modules/ ├── src/ │ ├── modules/ │ │ ├── auth/ # Authentication (Sign Up, Login, Confirmation) │ │ ├── brand/ # Brand Management │ │ ├── cart/ # Shopping Cart Management │ │ ├── category/ # Main Categories │ │ ├── coupon/ # Coupon Management │ │ ├── order/ # Order Processing │ │ ├── product/ # Products │ │ └── subCategory/ # Sub-Categories │ └── utils/ # Helper/Utility Functions (CORS, Cloudinary, Multer, etc.) ├── .env # Environment Variables ├── index.js # Server Entry Point ├── package.json └── README.md


---

## 🚀 Local Installation and Setup

### 1. Prerequisites

* **Node.js:** Version `22.17.0` or higher.
* **MongoDB Atlas:** For setting up the cloud database.
* **Git**

### 2. Clone and Install

```bash
git clone [https://github.com/mossalhhhn/ecommerce.git](https://github.com/mossalhhhn/ecommerce.git)
cd ecommerce
npm install
3. Environment Variables (.env)
Create a file named .env in the root directory and populate it with your configuration:

مقتطف الرمز

# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.dscmacg.mongodb.net/ecommerce_db

# Cloudinary Credentials (For image uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email Service Credentials
EMAIL_USER=
EMAIL_PASS=

# JWT Secret Key
TOKEN_SECRET=MY_SUPER_SECURE_TOKEN_KEY

# CORS Whitelist (For testing)
WHITELIST=["undefined", "null", "[http://127.0.0.1:5500](http://127.0.0.1:5500)"]
4. Run the Server
Bash

npm start
# Or for development with Nodemon
npm run dev
🔗 API Endpoints
The base URL for all requests is: http://localhost:3000/

Feature	Endpoint	Method	Authentication	Authorization
User Sign Up	/auth/register	POST	No	None
User Login	/auth/logIn	POST	No	None
Create Category	/category/	POST	Yes	Admin
Get All Categories	/category/	GET	No	None
Create SubCategory	/category/:categoryId/subcategory	POST	Yes	Admin
Create Product	/category/:categoryId/products	POST	Yes	Admin
Search Product	/product/search	GET	No	None
Add to Cart	/cart/	POST	Yes	None
View User Cart	/cart/	GET	Yes	None
Clear Cart	/cart/clear	PATCH	Yes	None
Create Order	/order/	POST	Yes	None
Cancel Order	/order/:invoiceId	PATCH	Yes	None
Create Coupon	/coupon/	POST	Yes	Admin

التصدير إلى "جداول بيانات Google"

🛡️ Security and Middleware
Custom CORS Middleware: Implements a custom whitelist check to ensure only specified origins (including local testing origins like http://127.0.0.1:5500) can access the API.

JWT Authentication: Uses jsonwebtoken for generating and verifying tokens via the isAusthenticated middleware.

Role-Based Authorization: The isAuthorized("admin") middleware restricts critical endpoints (like creating categories or products) to users with the admin role.

Input Validation (Joi): All incoming request bodies are validated against defined schemas using the Joi library and the isValid middleware.

File Handling: Uses Multer and Cloudinary for secure and efficient image upload and storage.

🤝 Contribution and License
License
This project is licensed under the ISC License.

Contributing
We welcome contributions! Please feel free to open an Issue for any bugs or propose improvements via Pull Requests.


Do you have any other questions about your project, or would you like me to help you with the next step, like setting up the `.gitignore` file?
