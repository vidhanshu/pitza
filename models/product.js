import mongoose from "mongoose";

const productScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    prices: {
      type: [Number],
      required: true,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      default: 1,
    },
    toppins: {
      type: [
        {
          text: {
            type: String,
            required: true,
            lowercase: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

//if Product model already exists use it, otherwise create a new one
export default mongoose.models.Product ||
  mongoose.model("Product", productScheme);
