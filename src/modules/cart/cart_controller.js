import Cart from "../../../Db/models/cart_model.js";
import Product from "../../../Db/models/product_model.js";

export const addToCart = async (req, res, next) => {
  const quantity = req.body.quantity || 1;

  const isProduct = await Product.findById(req.body.productId);
  if (!isProduct) {
    return next(new Error("Invalid Product Id", { cause: 404 }));
  }

  if (!isProduct.stock(quantity)) {
    // check on stock
    return next(
      new Error(
        `Sorry Only ${isProduct.availableItems} Items are left in Stock`
      )
    );
  }

  const isProductInCart = await Cart.findOne({
    user: req.user._id,
    "products.productId": req.body.productId,
  });

  if (isProductInCart) {
    for (let productObj of isProductInCart.products) {
      if (productObj.productId.toString() === req.body.productId.toString()) {
        const newQuantity = productObj.quantity + quantity;

        if (newQuantity > isProduct.availableItems) {
          return next(
            new Error(
              `Sorry, only ${isProduct.availableItems} items are left in stock`
            )
          );
        }
        productObj.quantity = newQuantity;
        break;
      }
    }
    await isProductInCart.save();

    return res.json({
      success: true,
      message: "Product Added To Cart Successfully",
      newProductInCart: isProductInCart,
    });
  }

  const newProductInCart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $push: {
        products: {
          productId: req.body.productId,
          quantity,
        },
      },
    },
    { new: true }
  );

  return res.json({
    success: true,
    message: "Product Added To Cart Successfully",
    newProductInCart,
  });
};

export const userCart = async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "products.productId",
    "name defaultImage.url price discount finalprice"
  );

  return res.json({ success: true, cart });
};

export const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const isProduct = await Product.findById(productId);
  if (!isProduct) {
    return next(new Error("Invalid Product id"));
  }

  if (!isProduct.stock(quantity)) {
    return next(
      new Error(
        `Sorry Only ${isProduct.availableItems} Items are left in Stock`
      )
    );
  }

  const updateProduct = await Cart.findOneAndUpdate(
    {
      user: req.user._id,
      "products.productId": productId,
    },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );

  return res.json({ success: true, updateProduct });
};

export const rmProductFromCart = async (req, res, next) => {
  const isProduct = await Product.findById(req.params.productId);

  if (!isProduct) {
    return next(new Error("Invalid Product Id", { cause: 404 }));
  }

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { products: { productId: req.params.productId } } },
    { new: true }
  );

  return res.json({
    success: true,
    message: "product deleted successfully",
    cart,
  });
};

export const clearCart = async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $set: { products: [] } },
    { new: true }
  );

  return res.json({
    success: true,
    message: "Cart Cleared Successfully",
    cart,
  });
};
