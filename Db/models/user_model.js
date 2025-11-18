import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      min: 3,
      max: 15,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    phoneNum: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Offline",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    forgetCode: String,
    activationCode: String,
    profileImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dyiwhfw9j/image/upload/v1758131913/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69_cesm3j.jpg",
      },
      id: {
        type: String,
        default: "360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69_cesm3j",
      },
    },
    coverImage: [
      {
        url: {
          type: String,
        },
        id: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || model("User", userSchema);

export default User;
