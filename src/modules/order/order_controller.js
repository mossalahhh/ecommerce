import Order from "../../../Db/models/order_model.js";
import Cart from "../../../Db/models/cart_model.js";
import Product from "../../../Db/models/product_model.js";
import Coupon from "../../../Db/models/coupon_model.js";
import { createInvoice } from "../../utils/generate_invoice.js";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../../../src/utils/cloudinary.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { clearCart, updateStock } from "./order_service.js";
import fs from "fs/promises";
import Stripe from "stripe";
//file url to path to make directory like path not url
const __direname = path.dirname(fileURLToPath(import.meta.url));

export const createOrder = async (req, res, next) => {
  //data
  const { payment, address, phone, coupon } = req.body;

  let checkCoupon;

  if (coupon) {
    checkCoupon = await Coupon.findOne({
      name: coupon,
      expiredAt: { $gt: Date.now() },
    });

    if (!checkCoupon) {
      return next(new Error("Invalid or expired coupon"));
    }
  }

  //check cart &&products

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new Error("invalid user id"));
  const products = cart.products;
  if (products.length < 1) {
    return next(new Error("Empty Cart"));
  }

  //check products in cart
  let orderProducts = [];
  let orderPrice = 0;
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById(products[i].productId);
    if (!product)
      return next(new Error(`product${products[i].productId} not Found`));

    //check stock
    if (!product.stock(products[i].quantity)) {
      return next(
        new Error(
          `${product.name}out of stock ,Only ${product.availableItems} are left in stock`
        )
      );
    }

    orderProducts.push({
      productId: product._id,
      quantity: products[i].quantity,
      name: product.name,
      itemPrice: product.finalPrice,
      totalPrice: products[i].quantity * product.finalPrice,
    });

    orderPrice += products[i].quantity * product.finalPrice;
  }
  //create order
  const user = req.user;
  const order = await Order.create({
    user: user._id,
    products: orderProducts,
    payment,
    address,
    phone,
    coupon: {
      id: checkCoupon?._id,
      name: checkCoupon?.name,
      discount: checkCoupon?.discount,
    },
    price: orderPrice,
  });

  //generate invoice
  const invoice = {
    shipping: {
      name: user.userName,
      address: order.address,
      country: "Egypt",
    },
    items: order.products,
    //before discount
    subtotal: order.price,
    paid: order.finalPrice,
    invoice_nr: order._id,
  };

  const pdfPath = path.join(
    __direname,
    `../../../invoice_temp/${invoice._id}.pdf`
  );

  createInvoice(invoice, pdfPath);

  //upload on cloudinary
  const { secure_url, public_id } = await cloudinary.uploader.upload(pdfPath, {
    folder: `${process.env.FOLDER_NAME}/order/invoice/${user._id}`,
  });

  order.invoice = { id: public_id, url: secure_url };
  await order.save();

  const isSent = await sendEmail({
    to: user.email,
    subject: "Your Invoice",
    attachments: [
      {
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  });

  if (isSent) {
    //update stock
    updateStock(order.products, true);
    //clearCart
    clearCart(user._id);
  }

  //remove temporary pdf from file system
  await fs.unlink(pdfPath);
  //stripe payment
  if (payment === "Visa") {
    const stripe = new Stripe(process.env.STRIPE_KEY);

    let existCoupon;
    if (order.coupon.name !== undefined) {
      existCoupon = await stripe.coupons.create({
        percent_off: order.coupon.discount,
        duration: "once",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
      line_items: order.products.map((product) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.itemPrice * 100,
          },
          quantity: product.quantity,
        };
      }),
      discounts: existCoupon ? [{ coupon: existCoupon.id }] : [],
    });
    return res.json({
      success: true,
      results: session.url,
      messaga: "check your invoice in your email",
    });
  }

  return res.json({
    success: true,
    message: "check your invoice in your email",
  });
};

export const cancelOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.invoiceId);

  if (order.status === "shipped" || order.status === "delivered") {
    return next(new Error("You Can Not Cancel This Order"));
  }

  order.status = "canceled";
  await order.save();

  const isSent = await sendEmail({
    to: req.user.email,
    subject: "Order Canceled",
    html: `<p>Your order has been canceled successfully</p>`,
  });

  if (isSent) {
    updateStock(order.products, false);
  }

  return res.json({
    success: true,
    message: "Order canceled successfully",
  });
};
