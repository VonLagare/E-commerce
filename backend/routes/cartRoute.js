import express from "express";
import Shipping from "../models/shippingModel";
import Cart from "../models/cartModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

// Get all items in cart
router.get("/getcartitems/:userId", async (req, res) => {
  const userId = req.params.userId;
  const cartItems = await Cart.find({ buyer: userId, status: "inCart" });

  res.status(200).send(cartItems[0]);
});

// add item to orders collection with inCart status
router.post("/addtocart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const product = req.body.product;
  // Check if the order exist if not add the order else do not permit to add
  await Cart.exists(
    { buyer: userId, status: "inCart" },
    async (err, response) => {
      // if the product exist update the array of product of the specified user
      if (response) {
        await Cart.updateOne(
          { buyer: userId, status: "inCart" },
          { $addToSet: { products: [product] } },
          (error, result) => {
            if (error) {
              res
                .status(404)
                .send({ msg: "Error occured while adding the product" });
            } else {
              res.status(200).send({ msg: "Product added to cart" });
            }
          }
        );
      } else {
        // if order do not exist
        const order = new Cart({
          buyer: userId,
          status: "inCart",
          products: product,
        });
        await order.save((err, doc) => {
          if (err) {
            return res
              .status(500)
              .send({ msg: "Error in adding product to cart", err });
          }
          return res
            .status(201)
            .send({ msg: "Product added to cart", order: doc });
        });
      }
    }
  );
});

router.post("/saveshipping", async (req, res) => {
  const details = new Shipping({
    street: req.body.street,
    district: req.body.district,
    barangay: req.body.barangay,
    municipality: req.body.municipality,
    province: req.body.province,
  });

  const newShipping = await details.save();
  if (newShipping) {
    return res
      .status(201)
      .send({ msg: "Shipping details created", data: newShipping });
  }
  console.log(req.body);
  return res.status(500).send({ msg: "Error in adding shipping details" });
});

router.put("/updateproduct/:id", isAuth, isAdmin, async (req, res) => {
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

router.delete("/deleteproduct/:id", isAuth, isAdmin, async (req, res) => {
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

export default router;
