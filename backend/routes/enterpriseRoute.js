import express from "express";
import { isAuth, isAdmin } from "../util";
import Enterprise from "../models/enterpriseModel";

const router = express.Router();

router.get("/", async (req, res) => {
  const enterprises = await Enterprise.find({});
  res.send(enterprises);
});

router.post("/addenterprise", async (req, res) => {
  const enterprise = new Enterprise({
    enterpriseName: req.body.enterpriseName,
  });

  const newEnterprise = await enterprise.save();
  if (newEnterprise) {
    return res
      .status(201)
      .send({ msg: "New enterprise created", data: newEnterprise });
  }
  return res.status(500).send({ msg: "Error in creating enterprise" });
});

router.put("/updateenterprise/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Enterprise.findByIdAndUpdate(
    { _id: id },
    {
      enterpriseName: req.body.enterpriseName,
    },
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ msg: "Error in updating enterprise", data: error });
      } else {
        return res
          .status(200)
          .send({ msg: "Successful in updating enterprise", data: result });
      }
    }
  );
});

router.delete("/deleteenterprise/:id", async (req, res) => {
  const id = req.params.id;

  await Enterprise.findByIdAndDelete({ _id: id }, (error, result) => {
    if (result) {
      return res.status(200).send({ msg: "Enterprise deleted", data: result });
    } else {
      return res.status(404).send({ msg: "Delete failed", data: error });
    }
  });
});

export default router;
