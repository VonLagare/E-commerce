import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  street: { type: String },
  district: { type: String, required: true },
  barangay: { type: String, required: true },
  municipality: { type: String, required: true },
  province: { type: String, required: true },
});

const shippingModel = mongoose.model("Shipping", shippingSchema);

export default shippingModel;
