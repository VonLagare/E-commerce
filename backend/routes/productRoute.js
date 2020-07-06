import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.json(products);
});

router.get("/test", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};

  if (endIndex < (await Product.find({}).countDocuments().exec())) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    result.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    // Find all products and limit to the given limit then skip base on start index
    result.result = await Product.find({}).limit(limit).skip(startIndex).exec();

    const paginatedResult = result;
    res.status(200).json(paginatedResult);
  } catch (error) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/addproduct", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    enterprise: req.body.enterprise,
  });

  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "New product created", data: newProduct });
  }
  return res.status(500).send({ msg: "Error in creating product" });
});

router.put("/updateproduct/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    {
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
    },
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ msg: "Error in updating product", data: error });
      } else {
        return res
          .status(200)
          .send({ msg: "Successful in updating product", data: result });
      }
    }
  );
});

router.delete("/deleteproduct/:id", async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndDelete({ _id: id }, (error, result) => {
    if (result) {
      console.log(result);
      return res.status(200).send({ msg: "Product deleted", data: result });
    } else {
      return res.status(404).send({ msg: "Delete failed", data: error });
    }
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id }, (error, result) => {
    if (error) {
      return res.status(404).send({ msg: "Product not found" });
    } else {
      return res.send(result);
    }
  });
});

export default router;
