# 🛍️ E-commerce API - Full-Stack E-commerce Platform

[![Node.js](https://img.shields.io/badge/Node.js-22.17.0-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-blue.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248.svg)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-ISC-orange)](LICENSE)

---

# E-Commerce Backend API

A production-ready Node.js backend for an e-commerce platform built using **Express**, **MongoDB (Mongoose)**, **Stripe**, **Cloudinary**, and **JWT Authentication**. The system supports full order processing, cart management, payments, invoices, and email notifications.

---

## 🚀 Features

* **User Authentication (JWT)** – Register, login, and protected routes
* **Product Management** – CRUD operations for products
* **Cart System** – Add, update, and remove items
* **Coupon Support** – Discount handling & validation
* **Order System** – Place orders, cancel orders, and update stock automatically
* **Payment Integration** – Stripe Checkout for VISA payments
* **Invoice Generation** – Auto PDF invoice using `pdfkit`
* **Cloudinary Uploads** – Upload generated invoice PDFs
* **Email Notifications** – Sends invoice via email
* **Secure Deployment** – Vercel serverless functions with `/tmp` file handling

---

## 🧩 Technologies Used

* **Node.js / Express**
* **MongoDB + Mongoose**
* **Stripe Payments**
* **Cloudinary Uploader**
* **Nodemailer**
* **PDFKit**
* **JWT Authentication**
* **Vercel Serverless Deployment**

---


## 💳 Stripe Payment Example

Checkout session gets created when payment type = **Visa**.

![Stripe Checkout](path_to_stripe_image)

---

## 🧾 Invoice Example

Generated PDF is stored temporarily in:

```
/tmp/orderId.pdf
```

And uploaded to Cloudinary.

![Invoice Example](path_to_invoice_image)

---

## 📬 Email Notification

The system sends the invoice PDF to the user's email:

```
sendEmail({ to, subject, attachments: [...] })
```

---

## 🏗 Deployment (Vercel)

A `vercel.json` file is required:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

---

## 🧪 Running the Project

```
npm install
npm start
```

---

## 🗂️ Project Structure

ecommerce/
├── node_modules/
├── src/
│ ├── modules/
│ │ ├── auth/ # 🔑 Authentication (Sign Up, Login, Confirmation)
│ │ ├── brand/ # 🏷️ Brand Management
│ │ ├── cart/ # 🛒 Shopping Cart
│ │ ├── category/ # 📂 Main Categories
│ │ ├── coupon/ # 🎟️ Coupon Management
│ │ ├── order/ # 📦 Order Processing
│ │ ├── product/ # 🛍️ Products
│ │ └── subCategory/ # 📁 Sub-Categories
│ └── utils/ # 🛠️ Helpers (CORS, Cloudinary, Multer, etc.)
├── .env # 🔐 Environment Variables
├── index.js # 🚀 Server Entry Point
├── package.json
└── README.md

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites

* **Node.js:** v22.17.0 or higher  
* **MongoDB Atlas:** Cloud Database  
* **Git**

### 2️⃣ Clone & Install

```bash
git clone https://github.com/mossalhhhn/ecommerce.git
cd ecommerce
npm install

3️⃣ Environment Variables (.env)
| Variable                | Description                     | Example                                                             |
| ----------------------- | ------------------------------- | ------------------------------------------------------------------- |
| `MONGO_URI`             | MongoDB Atlas Connection String | `mongodb+srv://<USER>:<PASSWORD>@cluster0.mongodb.net/ecommerce_db` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name           | `mycloud`                                                           |
| `CLOUDINARY_API_KEY`    | Cloudinary API Key              | `1234567890`                                                        |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret           | `mysecret`                                                          |
| `EMAIL_USER`            | Email Service User              | `example@gmail.com`                                                 |
| `EMAIL_PASS`            | Email Service Password          | `emailpassword`                                                     |
| `TOKEN_SECRET`          | JWT Secret Key                  | `MY_SUPER_SECURE_TOKEN_KEY`                                         |
| `WHITELIST`             | CORS Whitelisted Origins        | `["undefined","null","http://127.0.0.1:5500"]`                      |

4️⃣ Run the Server
# Start server
npm start

# For development (auto reload with Nodemon)
npm run dev

🔗 API Endpoints

Base URL: http://localhost:3000
| Feature            | Endpoint                            | Method | Auth | Role  |
| ------------------ | ----------------------------------- | ------ | ---- | ----- |
| Sign Up            | `/auth/register`                    | POST   | ❌    | None  |
| Login              | `/auth/logIn`                       | POST   | ❌    | None  |
| Create Category    | `/category/`                        | POST   | ✅    | Admin |
| Get Categories     | `/category/`                        | GET    | ❌    | None  |
| Create SubCategory | `/category/:categoryId/subcategory` | POST   | ✅    | Admin |
| Create Product     | `/category/:categoryId/products`    | POST   | ✅    | Admin |
| Search Product     | `/product/search`                   | GET    | ❌    | None  |
| Add to Cart        | `/cart/`                            | POST   | ✅    | None  |
| View Cart          | `/cart/`                            | GET    | ✅    | None  |
| Clear Cart         | `/cart/clear`                       | PATCH  | ✅    | None  |
| Create Order       | `/order/`                           | POST   | ✅    | None  |
| Cancel Order       | `/order/:invoiceId`                 | PATCH  | ✅    | None  |
| Create Coupon      | `/coupon/`                          | POST   | ✅    | Admin |

🛡️ Security & Middleware

🌐 CORS Middleware: يسمح فقط للأصول المسموح بها.

🔑 JWT Authentication: حماية المسارات باستخدام jsonwebtoken.

👑 Role-Based Authorization: isAuthorized("admin") للتحكم في المسارات الحساسة.

✅ Input Validation: Joi للتحقق من صحة البيانات الواردة.

📸 File Uploads: Multer + Cloudinary لإدارة وتحميل الصور بأمان.

🧑‍💻 Author

Built by Mohamed Salah.

Feel free to open issues or contribute! ✨
