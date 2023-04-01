const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const e = require("express");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "AbhishekIsGoodB$oi";
//Route 1: Verifing data entered using express-validator
router.post(
  "/createuser", //<- path for the api
  //validating email, name, email
  body("email", "Enter a valid email").isEmail(),
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body(
    "password",
    "Password is too short. Must be atleast 8 characters"
  ).isLength({ min: 8 }),

  //method to create an new user
  async (req, res) => {
    let success = false;
    //storing result from validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
      //if error present
      return res.status(400).json({ success, Message: error.array() });
    }
    try {
      //TO check if email is unique or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          Message: "An user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //if email is unique new user is created using this method
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //Response
      success = true;
      res.json({
        success,
        Message: "User has been created",
        data: user,
        authToken: authToken,
      });
    } catch (error) {
      console.error({ success, Message: error.message });
      res.status(500).json({
        success,
        Message: "Internal Server Error!!",
      });
    }
  }
);

//Route 2: Authenticating User. (Logging user in)
router.post(
  "/login",
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Please enter a password").exists(),
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success, Message: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ Message: "Invalid Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, Message: "Invalid Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(
        res.status(500).json({
          success,
          Message: "Internal Server Error!!",
        })
      );
    }
  }
);

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

//path to update user email and name
router.put("/updateuser/:id", async (req, res) => {
  const { name, email } = req.body;
  let success = false;
  try {
    //Creating a new user object
    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (email) {
      newUser.email = email;
    }

    //Find an user with the id provided
    let user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ Message: "User Not Found", success: success });
    }
    if (user._id.toString() != req.params.id) {
      return res
        .status(404)
        .json({ Message: "Invalid request", success: success });
    }

    //Now we can safely update the user
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    success = true;
    res.json({
      Message: "Profile has been successfully updated",
      success: success,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error", success: success });
  }
});

//Update password
router.put("/updatepassword/:id", async (req, res) => {
  const { opass, npass } = req.body;
  let success = false;
  try {
    const newUser = {};

    if (npass) {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(npass, salt);
      newUser.password = pass;
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ Message: "User not found", success: success });
    }
    if (user._id.toString() != req.params.id) {
      return res
        .status(500)
        .json({ Message: "Unauthorized", success: success });
    }

    //User found

    //Check if the old password is similar to the one in the db
    const pComp = await bcrypt.compare(opass, user.password);

    if (!pComp) {
      return res
        .status(500)
        .json({ Message: "Old Password Incorrect", success: success });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );

    success = true;

    res.status(200).json({ Message: "Password Updated", success });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error", success: success });
  }
});
module.exports = router;
