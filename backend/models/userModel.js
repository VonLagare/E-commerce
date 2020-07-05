import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "customer" },
  enterprise: { type: String },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
