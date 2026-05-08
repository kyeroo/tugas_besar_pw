const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json(locations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;