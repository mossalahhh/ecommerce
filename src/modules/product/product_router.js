import { Router } from "express";
import { isAusthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation_middleware.js";
import { fileUpload, validationFile } from "../../utils/multer.js";
import { catchError } from "../../utils/catchError.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  searchOnProduct,
  singleProduct,
  getCategoryProducts,
} from "./product_controller.js";
import {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "./product_validation.js";

const router = Router({ mergeParams: true });
router.post(
  "/",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).fields([
    { name: "defaultImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ]),
  isValid(createProductSchema),
  catchError(createProduct)
);

router.patch(
  "/:productId",
  isAusthenticated,
  isAuthorized("admin"),
  fileUpload(validationFile.images).fields([
    { name: "defaultImage", maxCount: 1 },
    { name: "subImages", maxCount: 4 },
  ]),
  isValid(updateProductSchema),
  catchError(updateProduct)
);

router.delete(
  "/:productId",
  isAusthenticated,
  isAuthorized("admin"),
  isValid(productIdSchema),
  catchError(deleteProduct)
);

router.get("/", catchError(getCategoryProducts));

router.get(
  "/single/:productId",
  isValid(productIdSchema),
  catchError(singleProduct)
);

router.get("/search", catchError(searchOnProduct));

export default router;
