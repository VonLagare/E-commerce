import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();

    if (newUser) {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid User Data." });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (signinUser) {
      res.send({
        _id: signinUser._id,
        firstName: signinUser.firstName,
        lastName: signinUser.lastName,
        email: signinUser.email,
        role: signinUser.role,
        enterprise: signinUser.enterprise,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid Email or Password." });
    }
  } catch (error) {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Von",
      email: "vonlagare3@gmail.com",
      password: "1234",
      role: "admin",
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.put("/update", async (req, res) => {
  const id = req.body.id;
  try {
    const user = User.findByIdAndUpdate(
      { _id: id },
      {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        enterprise: req.body.enterprise,
      },
      (error, result) => {
        if (error) {
          return res.status(400).send({ msg: error });
        } else {
          console.log(result);
          return res.send({ msg: "User updated successfully", data: result });
        }
      }
    );
  } catch (error) {
    return res.send({ msg: error.message });
  }
});

router.post("/adduser", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    enterprise: req.body.enterprise,
  });

  const newUser = await user.save((error, doc) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ msg: "Error in creating user" });
    } else {
      return res.status(201).send({ msg: "New user created", data: doc });
    }
  });
});

router.delete("/deleteuser/", async (req, res) => {
  const id = req.body.id;

  await User.findByIdAndDelete({ _id: id }, (error, result) => {
    if (error) {
      return res.status(404).send({ msg: "Delete failed", data: error });
    } else {
      return res.status(200).send({ msg: "User deleted", data: result });
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, (error, docs) => {
      if (error) {
        return res.status(400).send({ error: error });
      } else {
        return res.send(docs);
      }
    });
  } catch (error) {
    return res.status(400).send({ msg: error.msg });
  }
});

export default router;
