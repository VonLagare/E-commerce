import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dateOrdered: { type: Date, required: true, default: Date.now },
  dateDelivered: { type: Date },
  status: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      brand: { type: String, required: true },
      price: { type: Number, default: 0, required: true },
      category: { type: String, required: true },
      enterprise: { type: String, ref: "enterprise" },
      qty: { type: Number, default: 0, required: true },
    },
  ],
});

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;
