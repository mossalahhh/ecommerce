import Product from "../../../Db/models/product_model.js";
import { nanoid } from "nanoid";
import cloudinary from "../../utils/cloudinary.js";
import subCategory from "../../../Db/models/subCategory_model.js";
import Category from "../../../Db/models/category_model.js";
import Brand from "../../../Db/models/brand_model.js";

import slugify from "slugify";

export const createProduct = async (req, res, next) => {
  const cloudFolder = nanoid();

  const isCategory = await Category.findById(req.body.categoryId);
  if (!isCategory) return next(new Error("Invalid Category ID"));

  const isSubCategory = await subCategory.findById(req.body.subCategoryId);
  if (!isSubCategory) return next(new Error("Invalid Sub Category ID"));

  const isBrand = await Brand.findById(req.body.brandId);
  if (!isBrand) return next(new Error("Invalid Brand ID"));

  if (!req.files) {
    return next(new Error("File Image is Required"));
  }

  const images = [];

  for (const file of req.files.subImages) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: `${process.env.FOLDER_NAME}/product/${cloudFolder}`,
      }
    );
    images.push({ id: public_id, url: secure_url });
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.defaultImage[0].path,
    {
      folder: `${process.env.FOLDER_NAME}/product/${cloudFolder}`,
    }
  );

  const newProduct = await Product.create({
    ...req.body,
    slug: slugify(req.body.name),
    cloudFolder,
    createdBy: req.user._id,
    images,
    defaultImage: { id: public_id, url: secure_url },
  });

  return res
    .status(201)
    .json({ success: true, message: "Product added Successfully", newProduct });
};

export const updateProduct = async (req, res, next) => {
  const isProduct = await Product.findById(req.params.productId);

  if (!isProduct) {
    return next(new Error("Invalid Product Id"));
  }

  if (req.user._id.toString() !== isProduct.createdBy.toString()) {
    return next(new Error("You're Not Authorized"));
  }

  isProduct.name = req.body.name ? req.body.name : isProduct.name;
  isProduct.slug = req.body.name ? slugify(req.body.name) : isProduct.slug;

  isProduct.description = req.body.description
    ? req.body.description
    : isProduct.description;

  isProduct.price = req.body.price ? req.body.price : isProduct.price;
  isProduct.discount = req.body.discount
    ? req.body.discount
    : isProduct.discount;

  if (req.files) {
    if (req.files.subImages) {
      const newImages = [];

      const arrayImage = isProduct.images;
      const oldIds = arrayImage.map((imageObj) => imageObj.id);

      const results = await cloudinary.api.delete_resources(oldIds);
      console.log(results);

      for (const file of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          {
            folder: `${process.env.FOLDER_NAME}/product/${isProduct.cloudFolder}`,
          }
        );
        newImages.push({ id: public_id, url: secure_url });
      }
      isProduct.images = newImages;
    }

    if (req.files.defaultImage) {
      const results = await cloudinary.api.delete_resources([
        isProduct.defaultImage.id,
      ]);
      console.log(results);

      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.files.defaultImage[0].path,
        {
          folder: `${process.env.FOLDER_NAME}/product/${isProduct.cloudFolder}`,
        }
      );
      isProduct.defaultImage = { id: public_id, url: secure_url };
    }
    await isProduct.save();
  }

  await isProduct.save();

  return res.json({
    success: true,
    message: "Product updated successfully",
    product: isProduct,
  });
};

export const deleteProduct = async (req, res, next) => {
  const isProduct = await Product.findById(req.params.productId);

  if (!isProduct) {
    return next(new Error("Invalid Product Id"));
  }

  //   const isCategory = await
  if (req.user._id.toString() !== isProduct.createdBy.toString()) {
    return next(new Error("You're Not Authorized"));
  }

  const imageArray = isProduct.images;
  const ids = imageArray.map((imageObj) => imageObj.id);
  console.log(ids);
  ids.push(isProduct.defaultImage.id);

  const results = await cloudinary.api.delete_resources(ids);
  console.log(results);
  await cloudinary.api.delete_folder(
    `${process.env.FOLDER_NAME}/product/${isProduct.cloudFolder}`
  );
  await Product.findByIdAndDelete(req.params.productId);

  return res.json({ success: true, message: "Product Deleted Successfully" });
};

export const searchOnProduct = async (req, res, next) => {
  // const { filters } = req.query;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

  let searchQuery = {};
  if (req.query.keyword) {
    searchQuery.$or = [
      { name: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
  }

  const finalQuery = { ...filters, ...searchQuery };

  const product = await Product.find(finalQuery)
    .paginate(req.query.page)
    .customSelect(req.query.fields)
    .sort(req.query.sort);

  return res.json({ success: true, product });
};

export const singleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return next(new Error("Invalid Product Id"));

  return res.json({ success: true, product });
};

export const getCategoryProducts = async (req, res, next) => {
  const isCategory = await Category.findById(req.params.categoryId);
  console.log(req.params.categoryId);
  if (!isCategory)
    return next(new Error("Inavlid Category Id", { cause: 404 }));

  const product = await Product.find({ categoryId: req.params.categoryId });

  return res.json({ success: true, results: product });
};
