import mongoose, { Types, model, Schema } from "mongoose";

const couponSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  expiredAt: Number,
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Coupon = mongoose.models.Coupon || model("Coupon", couponSchema);

export default Coupon;
