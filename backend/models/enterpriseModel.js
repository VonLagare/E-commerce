import mongoose from "mongoose";

const Schema = mongoose.Schema;

const enterpriseSchema = new mongoose.Schema({
  enterpriseName: { type: String, required: true },
  numProducts: { type: Number },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const enterpriseModel = mongoose.model("Enterprise", enterpriseSchema);

export default enterpriseModel;
