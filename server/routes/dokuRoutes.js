const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const router = express.Router();

router.get("/callback", async (req, res) => {

  try {

    console.log(req.query);

    const bookingId =
      parseInt(req.query.id);

    if (bookingId) {

      await prisma.booking.update({
        where: {
          id: bookingId,
        },

        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",
        },
      });

      console.log(
        `Booking ${bookingId} updated`
      );
    }

    res.send("Payment success");

  } catch (error) {

    console.log(error);

    res.status(500).send(
      "Callback failed"
    );
  }
});

module.exports = router;