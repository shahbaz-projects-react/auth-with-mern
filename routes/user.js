const router = require("express").Router();
let User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route POST users/register
// @desc Register user
// @access Public

// router.route("/register").post((req, res) => {
//Reduced
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const newUser = new User({ name, email, password });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() => res.json("New User Added"))
            .catch((err) =>
              res.status(400).json("Caught Error while adding" + err)
            );
        });
      });
    }
  });
});

// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email })
    .then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      console.log("User is found ");
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              // expiresIn: 31556926 // 1 year in seconds
              expiresIn: 2592000, // 30 days in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    })
    .catch((err) => res.status(400).json("Caught Error while login" + err));
});

module.exports = router;
