import slugify from "slugify";
import Category from "../../../Db/models/category_model.js";
import cloudinary from "../../utils/cloudinary.js";
import subCategory from "../../../Db/models/subCategory_model.js";
export const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const createdBy = req.user._id;
  //check if file exists
  if (!req.file) {
    return next(new Error("File Image Is Required"));
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_NAME}/category`,
    }
  );

  const category = await Category.create({
    name,
    createdBy,
    image: { url: secure_url, id: public_id },
    slug: slugify(name),
  });

  return res.status(201).json({ success: true, results: category });
};

export const updateCategory = async (req, res, next) => {
  const isCategory = await Category.findById(req.params.categoryId);

  if (!isCategory) {
    return next(new Error("Invalid Category Id"));
  }

  if (req.user._id.toString() !== isCategory.createdBy.toString()) {
    return next(new Error("You're not Authorized"));
  }
  
  isCategory.name = req.body.name ? req.body.name : isCategory.name;
  isCategory.slug = req.body.name ? slugify(req.body.name) : isCategory.slug;

  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      public_id: isCategory.image.id,
    });
    isCategory.image.url = secure_url;
    await isCategory.save();
  }

  await isCategory.save();

  return res.json({ success: true });
};

export const deleteCategory = async (req, res, next) => {
  if (req.user._id.toString() !== isCategory.createdBy.toString()) {
    return next(new Error("You're not Authorized"));
  }

  const isCategory = await Category.findByIdAndDelete(req.params.categoryId);

  if (!isCategory) {
    return next(new Error("Invalid Category Id"));
  }

  await subCategory.deleteMany({ categoryId: req.params.categoryId });

  const results = await cloudinary.uploader.destroy(isCategory.image.id);

  console.log(results);

  return res.json({ success: true, message: "Category Deleted Successfully" });
};

export const getAllCategories = async (req, res, next) => {
  const allCategories = await Category.find({}).populate({
    path: "subCategories",
    select: "name slug image -_id",
  });

  if (!allCategories.length) {
    return next(new Error("Category Section Is Empty"));
  }

  return res.json({ success: true, allCategories });
};
