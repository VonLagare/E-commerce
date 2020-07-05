import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, required: true },
  description: { type: String, required: true },
  enterprise: { type: String, ref: "enterprise" },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
