const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const { slug } = req.query;

    const vehicles = await prisma.vehicle.findMany({
      where: slug
        ? {
            location: {
              slug: slug,
            },
          }
        : {},

      include: {
        location: true,
      },
    });

    res.json(vehicles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/:slug", async (req, res) => {
  try {

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        slug: req.params.slug,
      },

      include: {
        location: true,
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.json(vehicle);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;