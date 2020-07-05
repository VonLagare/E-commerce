import express from "express";
import Order from "../models/orderModel";

const router = express.Router();

// customer Routes

router.get("/getpendingorders/:userId", async (req, res) => {
  const id = req.params.userId;
  const orders = await Order.find({ buyer: id, status: "pending" });
  res.send(orders[0]);
});

router.post("/placeorder", async (req, res) => {
  let exist = false;

  // Check if the order exist if not add the order else do not permit to add
  await Order.exists(
    { buyer: req.body.userId, status: "pending" },
    async (err, response) => {
      if (response) {
        return res.status(404).send({
          msg: "Cannot place order, You currently have a pending order",
        });
      } else {
        // if order do not exist
        const order = new Order({
          buyer: req.body.userId,
          status: "pending",
          products: req.body.cartItems,
        });
        await order.save((err, doc) => {
          if (err) {
            return res
              .status(500)
              .send({ msg: "Error in creating order", err });
          }
          return res.status(201).send({ msg: "Order created", order: doc });
        });
      }
    }
  );
});

// deletes an order form the database
router.delete("/cancelpendingorder/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const orders = await Order.findByIdAndDelete(
    { _id: orderId },
    (err, response) => {
      if (err) {
        res.status(404).send({ msg: "Failed to delete order" });
      }
      res.status(200).send({ msg: "Order Deleted" });
    }
  );
});

// Seller Routes

router.get("/customerpendingorders/:enterprise", async (req, res) => {
  const enterprise = req.params.enterprise;
  const orders = await Order.find({
    status: "pending",
    "products.enterprise": enterprise,
  }).populate("buyer");

  res.send(orders);
});

// Get all ongoing orders from the customers
router.get("/customerongoingorders/:enterprise", async (req, res) => {
  const enterprise = req.params.enterprise;
  const orders = await Order.find({
    status: "ongoing",
    "products.enterprise": enterprise,
  }).populate("buyer");

  res.send(orders);
});

//Gets all completed orders from customers
router.get("/customercompletedorders/:enterprise", async (req, res) => {
  const enterprise = req.params.enterprise;
  const orders = await Order.find({
    status: "completed",
    "products.enterprise": enterprise,
  }).populate("buyer");

  res.send(orders);
});

//Gets all cancelled orders from customers
router.get("/customercancelledorders/:enterprise", async (req, res) => {
  const enterprise = req.params.enterprise;
  const orders = await Order.find({
    status: "cancelled",
    "products.enterprise": enterprise,
  }).populate("buyer");

  res.send(orders);
});

//accept a pending order and update status from pendding to ongoing
router.post("/acceptpendingorder", async (req, res) => {
  const orderId = req.body.orderId;

  await Order.findByIdAndUpdate(
    { _id: orderId },
    {
      //change the status from pending to ongoing
      status: "ongoing",
    },
    (error, response) => {
      if (error) {
        return res.status(404).send({ msg: "Order cannot be accepted", error });
      } else {
        return res.status(200).send({ msg: "Order accepeted" });
      }
    }
  );
});

//completes an ongoing order and update status from ongoing to completed
router.post("/completengoingorder", async (req, res) => {
  const orderId = req.body.orderId;

  await Order.findByIdAndUpdate(
    { _id: orderId },
    {
      //change the status from ongoing to completed
      status: "completed",
    },
    (error, response) => {
      if (error) {
        return res
          .status(404)
          .send({ msg: "Order cannot be completed", error });
      } else {
        return res.status(200).send({ msg: "Order completed" });
      }
    }
  );
});

export default router;
