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

## 📁 Folder Structure

```
src/
 ├── Db/
 │    ├── models/
 │    └── connection.js
 ├── modules/
 │    ├── order/
 │    │     ├── order_controller.js
 │    │     └── order_service.js
 │    ├── cart/
 │    ├── product/
 │    ├── coupon/
 │    └── auth/
 ├── utils/
 │    ├── sendEmail.js
 │    ├── generate_invoice.js
 │    └── cloudinary.js
 └── server.js
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
MONGO_URI=
STRIPE_KEY=
SUCCESS_URL=
CANCEL_URL=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
FOLDER_NAME=ecommerce
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

---

# 📘 API Documentation

## 🛒 Cart APIs

### **Add To Cart**

```
POST /cart/add
```

**Body:**

```json
{
  "productId": "...",
  "quantity": 2
}
```

### **Get Cart**

```
GET /cart
```

### **Remove From Cart**

```
DELETE /cart/remove/:productId
```

---

## 🎟 Coupon APIs

### **Apply Coupon**

```
POST /coupon/apply
```

```json
{
  "name": "SUMMER20"
}
```

---

## 📦 Order APIs

### **Create Order**

```
POST /order
```

**Body:**

```json
{
  "payment": "Visa || Cash",
  "address": "Cairo, Egypt",
  "phone": "0100000000",
  "coupon": "SUMMER20"
}
```

### **Cancel Order**

```
PATCH /order/cancel/:invoiceId
```

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

## 🧑‍💻 Author

Built by **Mo Salah**.

Feel free to open issues or contribute! ✨
