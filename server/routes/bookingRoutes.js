const express = require("express");
const prisma = require("../lib/prisma");
const authMiddleware = require("../middleware/authMiddleware");

const { createInvoice } = require("../services/dokuService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        vehicle: true,
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        vehicle: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch booking",
    });
  }
});

router.get("/:id/pay", async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const invoice = await createInvoice(booking);

    await prisma.booking.update({
        where: {
            id: booking.id,
        },

        data: {
            dokuInvoiceId:
            invoice.response.order
                .invoice_number,

            paymentMethod: "DOKU",

            paymentUrl:
            invoice.response.payment.url,
        },
        });

    res.json(invoice);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Payment failed",
      details: error.response?.data || error.message,
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {

  try {

    const {
      vehicleId,
      startDate,
      endDate,
    } = req.body;

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    // hitung hari
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;

    const totalDays =
      Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalPrice =
      totalDays * vehicle.pricePerDay;

    const booking = await prisma.booking.create({
      data: {

        startDate: new Date(startDate),
        endDate: new Date(endDate),

        totalPrice,

        vehicleId,

        userId: req.user.id,
      },
    });

    res.json(booking);

  } catch (error) {

  console.error(
    "PAYMENT ERROR:",
    error.response?.data || error.message
  );

  res.status(500).json({

    error:
      error.response?.data ||
      error.message,

  });
}
});

router.put("/:id/confirm", async (req, res) => {

  const booking =
    await prisma.booking.update({
      where: {
        id: parseInt(req.params.id),
      },

      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
      },
    });

  res.json(booking);
});

module.exports = router;