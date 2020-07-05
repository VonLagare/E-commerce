import express from "express";
import Shipping from "../models/shippingModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Shipping.find({ userId });
  res.send(products);
});

export default router;
