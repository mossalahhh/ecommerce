import { Router } from "express";
import { isValid } from "../../middleware/validation_middleware.js";
import {
  createBrandSchema,
  deleteBrandSchema,
  updateBrandSchema,
} from "./brand_validation.js";
import { isAusthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { catchError } from "../../utils/catchError.js";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
} from "./brand_controller.js";

import { fileUpload, validationFile } from "../../utils/multer.js";
validationFile;
const router = Router();

router.post(
  "/",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).single("brand"),
  isValid(createBrandSchema),
  catchError(createBrand)
);

router.patch(
  "/:brandId",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).single("brand"),
  isValid(updateBrandSchema),
  catchError(updateBrand)
);

router.delete(
  "/:brandId",
  isAusthenticated,
  isAuthorized("admin"),
  isValid(deleteBrandSchema),
  catchError(deleteBrand)
);

router.get("/", catchError(getAllBrands));

export default router;
