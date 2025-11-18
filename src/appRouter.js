import authRouter from "./modules/auth/auth_router.js";
import categoryRouter from "./modules/category/category_router.js";
import brandRouter from "./modules/brand/brand_router.js";
import productRouter from "./modules/product/product_router.js";
import couponRouter from "./modules/coupon/coupon_router.js";
import cartRouter from "./modules/cart/cart_router.js";
import orderRouter from "./modules/order/order_router.js";
import morgan from "morgan";

export const appRouter = (app, express) => {
  if (process.env.NODE_ENV === "dev") {
    app.use(morgan("common"));
  }

  //undefined for postman requests
  //null for fs 
  const whiteList = [undefined, "null", "http://127.0.0.1:5500"];
  app.use((req, res, next) => {
    //handle confirm Email api
    if (req.originalUrl.includes("/auth/confirmation")) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "Get");
      return next();
    }

    //handle requests from front-end
    if (!whiteList.includes(req.header("origin"))) {
      return next(new Error("Blocked By CORS"));
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    //to allow request for localHost
    res.setHeader("Access-Control-Allow-Private-Network", true);
    return next();
  });

  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/category", categoryRouter);
  app.use("/brand", brandRouter);
  app.use("/product", productRouter);
  app.use("/coupon", couponRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);

  app.use((req, res, next) => {
    return next(new Error("Page Not Found", { cause: 404 }));
  });

  app.use((error, req, res, next) => {
    const statusCode = error.cause || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  });
};
