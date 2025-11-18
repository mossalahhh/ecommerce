import { Router } from "express";
import { isValid } from "../../middleware/validation_middleware.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "./category_validation.js";
import { isAusthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { catchError } from "../../utils/catchError.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "./category_controller.js";
import subcategoryRouter from "../../modules/subCategory/subCategory_router.js";
import productRouter from "../../modules/product/product_router.js";

import { fileUpload, validationFile } from "../../utils/multer.js";
validationFile;
const router = Router();

router.use("/:categoryId/subcategory", subcategoryRouter);
router.use("/:categoryId/products", productRouter);

router.post(
  "/",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).single("category"),
  isValid(createCategorySchema),
  catchError(createCategory)
);

router.patch(
  "/:categoryId",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).single("category"),
  isValid(updateCategorySchema),
  catchError(updateCategory)
);

router.delete(
  "/:categoryId",
  isAusthenticated,
  isAuthorized("admin"),
  isValid(deleteCategorySchema),
  catchError(deleteCategory)
);

router.get("/", catchError(getAllCategories));

export default router;
