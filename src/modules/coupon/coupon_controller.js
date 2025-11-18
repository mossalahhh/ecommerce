import Coupon from "../../../Db/models/coupon_model.js";
import voucher_codes from "voucher-code-generator";

export const createCoupon = async (req, res, next) => {
  const code = voucher_codes.generate({ length: 5 });

  const newCoupon = await Coupon.create({
    //[0] because voucher codes return array
    name: code[0],
    discount: req.body.discount,
    expiredAt: new Date(req.body.expiredAt).getTime(),
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json({ success: true, message: "Coupon created Successfully", newCoupon });
};

export const updateCoupon = async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.params.code,
    expiredAt: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new Error("Coupon does Not Exist"));
  }

  coupon.discount = req.body.discount ? req.body.discount : coupon.discount;
  coupon.expiredAt = req.body.expiredAt
    ? new Date(req.body.expiredAt).getTime()
    : coupon.expiredAt;

  await coupon.save();

  return res.json({ success: true, message: "coupon updated successfully" });
};

export const deleteCoupon = async (req, res, next) => {
  const coupon = await Coupon.findOne({ name: req.params.code });

  if (req.user._id.toString() !== coupon.createdBy.toString()) {
    return next(new Error("You're not Authorized", { cause: 401 }));
  }

  if (!coupon) {
    return next(new Error("invalid code"));
  }
  await Coupon.findOneAndDelete({ name: req.params.code });
  return res.json({ success: true, message: "Coupon Deleted Successfully" });
};

export const allCoupons = async (req, res, next) => {
  const coupons = await Coupon.find();
  return res.json({ success: true, coupons });
};
