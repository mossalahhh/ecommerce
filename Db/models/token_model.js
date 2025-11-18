import mongoose, { Schema, model, Types } from "mongoose";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    agent: String,
    expiredAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.models.Token || model("Token", tokenSchema);

export default Token;
