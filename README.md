🛍️ E-commerce API - Full-Stack E-commerce Platform💡 OverviewThis project is the Backend API for a robust e-commerce platform built using Node.js, Express.js, and MongoDB. It features a comprehensive system for managing users, products, shopping carts, orders, and coupons, focusing on security and modularity.📁 Project StructureThe project is organized using a clear Modules architecture for maintainability:ecommerce/
├── node_modules/
├── src/
│   ├── modules/
│   │   ├── auth/         # Authentication (Sign Up, Login, Confirmation)
│   │   ├── brand/        # Brand Management
│   │   ├── cart/         # Shopping Cart Management
│   │   ├── category/     # Main Categories
│   │   ├── coupon/       # Coupon Management
│   │   ├── order/        # Order Processing
│   │   ├── product/      # Products
│   │   └── subCategory/  # Sub-Categories
│   └── utils/          # Helper/Utility Functions (CORS, Cloudinary, Multer, etc.)
├── .env                  # Environment Variables
├── index.js              # Server Entry Point
├── package.json
└── README.md
🚀 Local Installation and Setup1. PrerequisitesNode.js: Version 22.17.0 or higher.MongoDB Atlas: For setting up the cloud database.Git2. Clone and InstallBashgit clone https://github.com/mossalhhhn/ecommerce.git
cd ecommerce
npm install
3. Environment Variables (.env)Create a file named .env in the root directory and populate it with your configuration:مقتطف الرمز# MongoDB Atlas Connection String
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
WHITELIST=["undefined", "null", "http://127.0.0.1:5500"]
4. Run the ServerBashnpm start
# Or for development with Nodemon
npm run dev
🔗 API EndpointsThe base URL for all requests is: http://localhost:3000/FeatureEndpointMethodAuthenticationAuthorizationUser Sign Up/auth/registerPOSTNoNoneUser Login/auth/logInPOSTNoNoneCreate Category/category/POSTYesAdminGet All Categories/category/GETNoNoneCreate SubCategory/category/:categoryId/subcategoryPOSTYesAdminCreate Product/category/:categoryId/productsPOSTYesAdminSearch Product/product/searchGETNoNoneAdd to Cart/cart/POSTYesNoneView User Cart/cart/GETYesNoneClear Cart/cart/clearPATCHYesNoneCreate Order/order/POSTYesNoneCancel Order/order/:invoiceIdPATCHYesNoneCreate Coupon/coupon/POSTYesAdmin🛡️ Security and MiddlewareCustom CORS Middleware: Implements a custom whitelist check to ensure only specified origins (including local testing origins like http://127.0.0.1:5500) can access the API.JWT Authentication: Uses jsonwebtoken for generating and verifying tokens via the isAusthenticated middleware.Role-Based Authorization: The isAuthorized("admin") middleware restricts critical endpoints (like creating categories or products) to users with the admin role.Input Validation (Joi): All incoming request bodies are validated against defined schemas using the Joi library and the isValid middleware.File Handling: Uses Multer and Cloudinary for secure and efficient image upload and storage.🤝 Contribution and LicenseLicenseThis project is licensed under the ISC License.ContributingWe welcome contributions! Please feel free to open an Issue for any bugs or propose improvements via Pull Requests.
