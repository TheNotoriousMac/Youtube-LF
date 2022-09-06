const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { register } = require("../controllers/auth");

router.post(
  "/register",
  [
    check("username", "email is not valid").isEmail(),
    check("password", "password does not satisfy requirements").isLength({
      min: 3,
      max: 10,
    }),
  ],
  register
);
