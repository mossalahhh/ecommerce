import Category from "../../../Db/models/category_model.js";
import cloudinary from "../../utils/cloudinary.js";
import subCategory from "../../../Db/models/subCategory_model.js";
import slugify from "slugify";
import mongoose, { Types } from "mongoose";

export const createSubCategory = async (req, res, next) => {
  const isCategory = await Category.findById(req.params.categoryId);
  if (!isCategory) {
    return next(new Error("invalid Category id"));
  }

  if (!req.file) {
    return next(new Error("Image File Is required"));
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.FOLDER_NAME}/subCategory` }
  );
  
  const brandIdsArray = req.body.brandId || [];

  const newSubCategory = await subCategory.create({
    name: req.body.name,
    slug: slugify(req.body.name),
    image: { url: secure_url, id: public_id },
    createdBy: req.user._id,
    categoryId: req.params.categoryId,
    brands: brandIdsArray,
  });

  return res.status(201).json({ success: true, results: newSubCategory });
};

export const updateSubCategory = async (req, res, next) => {
  const isCategory = await Category.findById(req.params.categoryId);

  if (!isCategory) {
    return next(new Error("invalid Category id"));
  }

  const isSubCategory = await subCategory.findOne({
    _id: req.params.subCategoryId,
    categoryId: req.params.categoryId,
  });

  if (!isSubCategory) {
    return next(new Error("invalid Sub Category id"));
  }
  //لو ادمن تاني غير اللي عمل ال subcategory حاول يعدل او يحذف مش هينفع
  if (req.user._id.toString() !== isSubCategory.createdBy.toString()) {
    return next(new Error("You're not Authorized"));
  }

  isSubCategory.name = req.body.name ? req.body.name : isSubCategory.name;
  isSubCategory.slug = req.body.name
    ? slugify(req.body.name)
    : isSubCategory.slug;

  await isSubCategory.save();

  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      public_id: isSubCategory.image.id,
    });
    isSubCategory.image.url = secure_url;
    await isSubCategory.save();
  }

  return res.json({
    success: true,
    message: "Sub Category Updated Successfully",
  });
};

export const deleteSubCategory = async (req, res, next) => {
  const isCategory = await Category.findById(req.params.categoryId);

  if (!isCategory) {
    return next(new Error("invalid Category id"));
  }

  if (req.user._id.toString() !== removeSubCategory.createdBy.toString()) {
    return next(new Error("You're not Authorized"));
  }

  const removeSubCategory = await subCategory.findOneAndDelete({
    _id: req.params.subCategoryId,
    categoryId: req.params.categoryId,
  });

  if (!removeSubCategory) {
    return next(new Error(" invalid Sub Category id"));
  }

  const deleteImage = await cloudinary.uploader.destroy(
    removeSubCategory.image.id
  );

  console.log(deleteImage);

  return res.json({
    success: true,
    message: "SubCategory Deleted Successfully",
  });
};

export const getAllSubCategory = async (req, res, next) => {
  const isCategory = await Category.findById(req.params.categoryId);

  if (!isCategory) {
    return next(new Error("invalid Category id"));
  }

  const subCategories = await subCategory
    .find({ categoryId: req.params.categoryId })
    .populate({ path: "categoryId", select: "name image slug -_id" });

  if (!subCategories) {
    return next(new Error("invalid Sub Category id"));
  }

  return res.json({ success: true, subCategories });
};
