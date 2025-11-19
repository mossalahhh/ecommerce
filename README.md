Overview
Relevant source files
Purpose and Scope
This document provides a high-level introduction to the e-commerce system, covering its business purpose, architectural structure, core modules, and technology stack. It is designed to orient new developers and provide a conceptual foundation for understanding the codebase.

For specific implementation details, refer to:

System setup and configuration: Getting Started
Detailed architecture patterns: Architecture Overview
Order processing implementation: Order Management System
Security implementation: Authentication & Security
System Purpose
This is a RESTful e-commerce backend system that provides complete online shopping functionality including user management, product catalog organization, shopping cart operations, order processing with payment integration, and invoice generation. The system implements a multi-tenant architecture where administrators manage product catalogs and regular users browse products, build shopping carts, and place orders.

Sources: 
README.md
1-2
 
index.js
1-13
 
package.json
1-37

Technology Stack
The system is built on Node.js with the following core technologies:

Category	Technology	Purpose
Runtime	Node.js 22.17.0	JavaScript runtime environment
Web Framework	Express 5.1.0	HTTP server and routing
Database	MongoDB + Mongoose 8.18.0	Document database with ODM
Authentication	jsonwebtoken 9.0.2	JWT-based stateless authentication
Password Security	bcryptjs 3.0.2	Password hashing with salt
Payment Processing	Stripe 19.3.1	Credit card payment gateway
File Storage	Cloudinary 2.7.0	Cloud-based image and PDF storage
Email Service	Nodemailer 7.0.6	SMTP email delivery
Document Generation	PDFKit 0.17.2	Invoice PDF creation
File Upload	Multer 2.0.2	Multipart form data handling
Validation	Joi 18.0.1	Request schema validation
Logging	Morgan 1.10.1	HTTP request logging
Utilities	slugify, nanoid, crypto	URL slugs, unique IDs, cryptography
Sources: 
package.json
18-36

Application Entry Point
The application bootstrap process follows this sequence:









Application Initialization

Environment Configuration: 
index.js
6
 loads environment variables from .env file using dotenv
Database Connection: 
index.js
10
 establishes MongoDB connection via connectDb() from Db/connection.js
Application Setup: 
index.js
9
 configures middleware and routes via appRouter() from src/appRouter.js
Server Start: 
index.js
12
 binds Express application to port specified in process.env.PORT
Sources: 
index.js
1-13

High-Level Architecture
The system follows a layered architecture pattern with clear separation of concerns:











































Architectural Layers

Layer	Responsibility	Key Files
Entry Point	Application bootstrap and server initialization	index.js
Router	Route registration and middleware orchestration	src/appRouter.js
Middleware	Cross-cutting concerns (auth, validation, logging)	src/middleware/*.js
Module Routers	Endpoint definitions and route-level middleware	src/modules/*/*.router.js
Controllers	Business logic implementation	src/modules/*/controller/*.js
Models	Data schema and database operations	Db/models/*.model.js
External Services	Third-party integrations	Stripe SDK, Cloudinary SDK, Nodemailer
Sources: 
index.js
1-13
 
package.json
18-36

Core Business Modules
The system implements seven business domain modules, each encapsulating a specific functional area:











Module Descriptions
1. Authentication Module (src/modules/auth/)

User registration with email verification
JWT-based login/logout
Password reset via email codes
Token persistence and revocation
For details: Authentication & Security
2. Brand Module (src/modules/brand/)

Brand CRUD operations (admin only)
Cloudinary image upload for brand logos
Slug generation for SEO-friendly URLs
For details: Brand Management
3. Category Module (src/modules/category/)

Two-level hierarchy: Category → SubCategory
Relationship management with brands and products
Image upload for category visuals
For details: Categories & Subcategories
4. Product Module (src/modules/product/)

Product information management
Multi-image upload (main + additional images)
Stock quantity tracking
Pricing and discount configuration
For details: Product Management
5. Cart Module (src/modules/cart/)

Add/update/remove items from user's cart
Quantity validation against stock
Per-user cart isolation (one cart per user)
For details: Shopping Cart System
6. Order Module (src/modules/order/) ⭐ CRITICAL SYSTEM

Order creation with cart validation
Stripe payment session creation
PDF invoice generation via PDFKit
Invoice upload to Cloudinary
Email notification with PDF attachment
Stock decrement upon successful order
Order cancellation with stock restoration
Importance Rating: 7.95/10 (highest in system)
For details: Order Management System
7. Coupon Module (src/modules/coupon/)

Discount coupon creation (admin only)
Expiration date management
Integration with order pricing
For details: Coupon System
Sources: 
package.json
18-36
 Diagram 1 from context

Request Processing Flow
All HTTP requests follow a standardized processing pipeline:































Middleware Pipeline Stages

Order	Middleware	File Path	Function
1	Request Logger	morgan package	Logs HTTP method, URL, status, response time
2	CORS Handler	cors package	Handles cross-origin requests
3	Body Parser	express.json()	Parses JSON request bodies
4	Router	src/appRouter.js	Routes requests to module routers
5	Authentication	src/middleware/authentication.js	Validates JWT tokens
6	Authorization	src/middleware/authorization.js	Checks user roles (admin vs user)
7	Validation	src/middleware/validation.js	Validates request schema with Joi
8	Controller	src/modules/*/controller/*.js	Executes business logic
Sources: 
index.js
1-13
 Diagram 3 from context

Data Model Architecture
The system uses MongoDB with Mongoose ODM for data persistence. The schema follows a relational-style design with document references:






















































































































































































Key Data Relationships

User-Centric Design: User entity is the central actor, referenced as createdBy in most administrative entities
Cart Isolation: Each user has exactly one Cart document (unique constraint on user field)
Product Organization: Three-level taxonomy - Category → SubCategory → Product, plus orthogonal Brand dimension
Order Denormalization: Order.products array stores product snapshots (name, price) at purchase time, not live references
Token Persistence: JWT tokens stored in Token collection for server-side revocation capability
For complete model schemas: Data Models Reference

Sources: Diagram 2 from context

External Service Integrations
The system integrates with four external services for extended functionality:

Service Integration Map














Service Details
Service	Package	Usage	Controllers
MongoDB	mongoose@8.18.0	Primary data persistence	All controllers
Stripe	stripe@19.3.1	Credit card payment processing	order.controller.js
Cloudinary	cloudinary@2.7.0	Image storage (brands, categories, products)
PDF storage (order invoices)	order.controller.js
brand.controller.js
category.controller.js
product.controller.js
SMTP	nodemailer@7.0.6	Email notifications (activation, password reset, order invoices)	order.controller.js
auth.controller.js
For integration implementation details: External Services Integration

Sources: 
package.json
18-36
 Diagram 1 from context

Security Architecture
The system implements a three-layer security model:

Security Layers








1. Authentication Layer - src/middleware/authentication.js

Extracts JWT from Authorization header
Verifies token signature with SECRET_KEY
Validates token exists in database and isValid: true
Loads user document from token payload
Attaches req.user for downstream use
2. Authorization Layer - src/middleware/authorization.js

Checks req.user.role against required role
Admin-only operations: brand, category, product, coupon management
User operations: cart, order placement
3. Validation Layer - src/middleware/validation.js

Validates request body/params/query against Joi schema
Each endpoint defines expected schema
Returns 400 error with detailed validation messages
For security implementation details: Authentication & Security

Sources: Diagram 5 from context

Key Design Patterns
1. Middleware Pipeline Pattern
Sequential request processing with early exit on errors. Each middleware stage can terminate the request or pass control to next stage.

2. Repository Pattern
Mongoose models act as repositories, abstracting database operations from business logic. Controllers interact with models, not direct database queries.

3. Service Layer Pattern
External service integrations (Stripe, Cloudinary, Email) are encapsulated in utility functions, isolating third-party dependencies.

4. Role-Based Access Control (RBAC)
Two role system: admin (full CRUD on catalog) and user (read catalog, manage own cart/orders).

5. JWT Stateless Authentication with Revocation
JWTs provide stateless authentication, but tokens are also persisted in database to enable server-side revocation via isValid flag.

6. Denormalized Order Pattern
Orders store product snapshots (name, price, image) at purchase time, preserving historical data even if products are later modified or deleted.

Sources: Diagrams 1, 3, 4, 5 from context

Module Directory Structure
The codebase follows a modular structure where each business domain is isolated:

src/modules/
├── auth/
│   ├── auth.router.js          # Route definitions
│   ├── controller/
│   │   ├── auth.controller.js  # Business logic
│   │   └── validation.js       # Joi schemas
│   └── auth.endPoints.js       # Endpoint constants
├── brand/
│   ├── brand.router.js
│   ├── controller/
│   │   ├── brand.controller.js
│   │   └── validation.js
│   └── brand.endPoints.js
├── category/
├── product/
├── cart/
├── order/                       # ⭐ Most critical module
└── coupon/
Each module contains:

Router (*.router.js): Express router with route-to-controller mapping
Controller (controller/*.controller.js): Business logic implementation
Validation (controller/validation.js): Joi schema definitions
Endpoints (*.endPoints.js): Route path constants for access control
Sources: Diagrams 1, 3 from context

System Capabilities Summary
Capability	Implementation Status	Key Modules
User Registration & Authentication	✅ Complete	auth
Email Verification	✅ Complete	auth
Password Reset	✅ Complete	auth
Product Catalog Management	✅ Complete	brand, category, product
Image Upload & Storage	✅ Complete	brand, category, product
Shopping Cart	✅ Complete	cart
Order Placement	✅ Complete	order
Stripe Payment Integration	✅ Complete	order
Invoice Generation (PDF)	✅ Complete	order
Invoice Email Delivery	✅ Complete	order
Order Cancellation	✅ Complete	order
Stock Management	✅ Complete	order, product
Discount Coupons	✅ Complete	coupon, order
Role-Based Access Control	✅ Complete	middleware/authorization.js
Request Validation	✅ Complete	middleware/validation.js
Sources: 
package.json
18-36
 Diagrams 1-5 from context

Next Steps
To begin working with this codebase:

Setup Development Environment: Installation & Dependencies
Configure Environment Variables: Configuration & Environment
Understand Request Flow: Request Processing Pipeline
Study Order Processing: Order Management System - the most critical system
Review Security Model: Authentication & Security
Explore Data Models: Data Models Reference
API Endpoint Reference: API Reference
