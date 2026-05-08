const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../lib/prisma");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // cek email
    const existingUser =
      await prisma.user.findUnique({
        where: { email },
      });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already used",
      });
    }

    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // create user
    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

    res.json({
      message: "Register success",
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Register failed",
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    // cari user
    const user =
      await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // cek password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },

      "SECRET_KEY",

      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login success",
      token,
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

module.exports = router;