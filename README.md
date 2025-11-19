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

## 📁 Folder Structure (updated)

src/
├── Db/
│ ├── models/
│ │ ├── user_model.js
│ │ ├── product_model.js
│ │ ├── brand_model.js
│ │ ├── category_model.js
│ │ ├── subCategory_model.js
│ │ ├── cart_model.js
│ │ ├── order_model.js
│ │ └── coupon_model.js
│ └── connection.js
├── modules/
│ ├── auth/
│ │ ├── auth_controller.js
│ │ ├── auth_validation.js
│ │ └── auth_router.js
│ ├── product/
│ │ ├── product_controller.js
│ │ ├── product_validation.js
│ │ └── product_router.js
│ ├── brand/
│ │ ├── brand_controller.js
│ │ └── brand_router.js
│ ├── category/
│ │ ├── category_controller.js
│ │ └── category_router.js
│ ├── subCategory/
│ │ ├── subCategory_controller.js
│ │ └── subCategory_router.js
│ ├── cart/
│ │ ├── cart_controller.js
│ │ └── cart_router.js
│ ├── coupon/
│ │ ├── coupon_controller.js
│ │ └── coupon_router.js
│ └── order/
│ ├── order_controller.js
│ ├── order_service.js
│ └── order_router.js
├── utils/
│ ├── cloudinary.js
│ ├── sendEmail.js
│ ├── generate_invoice.js
│ ├── multer.js
│ ├── catchError.js
│ ├── html_templates/
│ │ └── invoice_template.html
│ └── validation_helpers.js
├── middlewares/
│ ├── authentication.js
│ ├── authorization.js
│ └── validation_middleware.js
└── server.js

yaml
Copy code

> ملاحظات:
> * `modules/*` يحتوي على الـ controllers، validations، وrouters لكل نطاق.
> * `utils/multer.js` مسؤول عن إعداد multer (multer storage, field limits, validation).
> * `utils/generate_invoice.js` يستخدم `pdfkit` لإنشاء ملف PDF مؤقت في `/tmp` (Vercel-compatible).
> * `utils/catchError.js` middleware بسيط لالتقاط الأخطاء وإرسال JSON error responses.

---

## 🔑 Environment Variables

Create a `.env` file:

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

pgsql
Copy code

---

## 📦 Dependencies

The project uses these packages (add to `package.json`):

```json
{
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cloudinary": "^2.7.0",
    "crypto": "^1.0.1",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "joi": "^18.0.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.0",
    "morgan": "^1.10.1",
    "multer": "^2.0.2",
    "nanoid": "^5.1.6",
    "nodemailer": "^7.0.6",
    "pdfkit": "^0.17.2",
    "randomstring": "^1.3.1",
    "slugify": "^1.6.6",
    "stripe": "^19.3.1",
    "voucher-code-generator": "^1.3.0"
  }
}
📘 API Documentation (summary)
Note: routes below are examples; your actual routes use the routers/middlewares described in the codebase.

Authentication (Auth)
POST /auth/register — register (validation + send activation code)

GET /auth/confirmation/:activationCode — confirm email

POST /auth/logIn — login (returns JWT)

PATCH /auth/forgetCode — request reset code

PATCH /auth/resetPassword — reset password

Brand
POST /brand/ — create brand (admin, multer single brand)

PATCH /brand/:brandId — update brand (admin, upload)

DELETE /brand/:brandId — delete brand

GET /brand/ — list brands

Category
POST /category/ — create category (admin, multer single category)

PATCH /category/:categoryId — update category

DELETE /category/:categoryId — delete category

GET /category/ — list categories

SubCategory (merged params)
POST /category/:categoryId/subcategory/ — create subcategory (admin)

PATCH /category/:categoryId/subcategory/:subCategoryId — update

DELETE /category/:categoryId/subcategory/:subCategoryId — delete

GET /category/:categoryId/subcategory/ — list

Product (merged params)
POST /category/:categoryId/product/ — create product (admin, fields: defaultImage, subImages)

PATCH /category/:categoryId/product/:productId — update product

DELETE /category/:categoryId/product/:productId — delete product

Cart
POST /cart/ — add to cart

GET /cart/ — get user cart

PATCH /cart/ — update quantities

PATCH /cart/clear — clear cart

PATCH /cart/:productId — remove single product

Coupon
POST /coupon/ — create coupon (admin)

PATCH /coupon/:code — update coupon

DELETE /coupon/:code — delete coupon

GET /coupon/ — list coupons

Order
POST /order/ — create order (validation, invoice generation, cloudinary upload, email, stripe checkout session for Visa)

PATCH /order/:invoiceId — cancel order

💳 Stripe Payment Example
Checkout session gets created when payment === "Visa" in order flow. The checkout redirect URL returned from Stripe is sent under results: session.url.


(Local path above — your deployment pipeline should serve/transform the file path into an accessible URL.)

🧾 Invoice Example
Generated PDF is stored temporarily on serverless environment at:

bash
Copy code
/tmp/{orderId}.pdf
It then gets uploaded to Cloudinary and attached to the order record.


📬 Email Notification
The system sends the invoice PDF to the user's email via utils/sendEmail.js:

js
Copy code
sendEmail({
  to: user.email,
  subject: "Your Invoice",
  attachments: [{ path: pdfPath, contentType: "application/pdf" }]
});
🏗 Deployment (Vercel)
A vercel.json file for serverless Node functions:

json
Copy code
{
  "version": 2,
  "builds": [
    { "src": "src/server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "(.*)", "dest": "src/server.js" }
  ]
}
Notes for Vercel:

Use /tmp for temporary file creation (e.g., invoice PDF).

Cloudinary upload should accept local file path /tmp/{orderId}.pdf.

Ensure environment variables are set in Vercel project settings.

🧪 Running the Project (local)
bash
Copy code
npm install
cp .env.example .env
# fill .env values
npm start
🧑‍💻 Author
Built by Mo Salah.

Feel free to open issues or contribute! ✨
