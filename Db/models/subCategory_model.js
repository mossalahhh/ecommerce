import mongoose, { model, Schema, Types } from "mongoose";

const subCategorySchema = new Schema({
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
  brands: [
    {
      type: Types.ObjectId,
      required: true,
      ref: "Brand",
    },
  ],
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "Category",
  },
});

const subCategory =
  mongoose.models.subCategory || model("subCategory", subCategorySchema);

export default subCategory;
