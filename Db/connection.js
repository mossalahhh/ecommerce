import mongoose from "mongoose";

export const connectDb = async () => {
  return await mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("Db Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
