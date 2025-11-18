import Cart from "../../../Db/models/cart_model.js";
import Product from "../../../Db/models/product_model.js";

export const clearCart = async (userId) => {
  await Cart.findOneAndUpdate({ user: userId }, { products: [] });
};

export const updateStock = async (products, placeOrder) => {
  //place order is boolean value
  for (const product of products) {
    if (placeOrder) {
      await Product.findOneAndUpdate(product.productId, {
        $inc: {
          availableItems: -product.quantity,
          soldItems: product.quantity,
        },
      });
    }
    if (!placeOrder) {
      await Product.findOneAndUpdate(product.productId, {
        $inc: {
          availableItems: product.quantity,
          soldItems: -product.quantity,
        },
      });
    }
  }
};
