import multer, { diskStorage } from "multer";

export const validationFile = {
  images: [
    "image/apng",
    "image/avif",
    "image/bmp",
    "image/vnd.microsoft.icon",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ],
};

export const fileUpload = (filterArray) => {
  const fileFilter = (req, file, cb) => {
    if (!filterArray.includes(file.mimetype)) {
      return cb(new Error("Invalid Image type"), false);
    }
    return cb(null, true);
  };
  return multer({ storage: diskStorage({}), fileFilter });
};
