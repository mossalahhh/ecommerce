import { Router } from "express";
import { isAusthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { fileUpload, validationFile } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation_middleware.js";
import {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategory,
} from "./subCategory_controller.js";

import { catchError } from "../../utils/catchError.js";
import {
  creatSubCategorySchema,
  updateSubCategorySchema,
  daleteSubCategorySchema,
  getAllSubCategorySchema,
} from "./subCategory_validation.js";
const router = Router({ mergeParams: true });

router.post(
  "/",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).single("subcategory"),
  isValid(creatSubCategorySchema),
  catchError(createSubCategory)
);

router.patch(
  "/:subCategoryId",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).single("subcategory"),
  isValid(updateSubCategorySchema),
  catchError(updateSubCategory)
);

router.delete(
  "/:subCategoryId",
  isAusthenticated,
  isAuthorized("admin"),
  isValid(daleteSubCategorySchema),
  catchError(deleteSubCategory)
);

router.get(
  "/",
  isValid(getAllSubCategorySchema),
  catchError(getAllSubCategory)
);
export default router;
