import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import shippingRoute from "./routes/shippingRoute";
import enterpriseRoute from "./routes/enterpriseRoute";
import orderRoute from "./routes/orderRoute";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/shipping", shippingRoute);
app.use("/api/enterprises", enterpriseRoute);
app.use("/api/orders", orderRoute);

app.listen(5000, () => console.log(`Server started at http://localhost:5000`));
