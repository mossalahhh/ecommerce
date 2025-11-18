import slugify from "slugify";
import Brand from "../../../Db/models/brand_model.js";
import cloudinary from "../../utils/cloudinary.js";

export const createBrand = async (req, res, next) => {
  const { name } = req.body;
  const createdBy = req.user._id;
  //check if file exists
  if (!req.file) {
    return next(new Error("File Image Is Required"));
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_NAME}/brands`,
    }
  );

  const brand = await Brand.create({
    name,
    createdBy,
    Category: req.body.categoryId,
    image: { url: secure_url, id: public_id },
    slug: slugify(name),
  });

  return res.status(201).json({ success: true, results: brand });
};

export const updateBrand = async (req, res, next) => {
  const isBrand = await Brand.findById(req.params.brandId);

  if (!isBrand) {
    return next(new Error("Invalid Brand Id"));
  }

  if (req.user._id.toString() !== isBrand.createdBy.toString()) {
    return next(new Error("You're not Authorized"));
  }

  isBrand.name = req.body.name ? req.body.name : isBrand.name;
  isBrand.slug = req.body.name ? slugify(req.body.name) : isBrand.slug;

  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      public_id: isBrand.image.id,
    });
    isBrand.image.url = secure_url;
    await isBrand.save();
  }

  await isBrand.save();

  return res.json({ success: true, message: "Brand Updated Successfully" });
};

export const deleteBrand = async (req, res, next) => {
  if (req.user._id.toString() !== isBrand.createdBy.toString()) {
    return next(new Error("You're not Authorized"));
  }

  const isBrand = await Brand.findByIdAndDelete(req.params.brandId);

  if (!isBrand) {
    return next(new Error("Invalid Brand Id"));
  }

  const results = await cloudinary.uploader.destroy(isBrand.image.id);

  console.log(results);

  return res.json({ success: true, message: "Brand Deleted Successfully" });
};

export const getAllBrands = async (req, res, next) => {
  const allBrands = await Brand.find({});

  if (!allBrands.length) {
    return next(new Error("Brand Section Is Empty"));
  }

  return res.json({ success: true, allCategories });
};
