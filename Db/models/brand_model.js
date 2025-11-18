import mongoose, { Schema, Types, model } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  createdBy: {
    type: Types.ObjectId,
    required: true,
  },
  Category: {
    type: Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

const Brand = mongoose.models.Brand || model("Brand", brandSchema);

export default Brand;
