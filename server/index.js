
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Backend Rental Kendaraan Running',
  })
})

const PORT = process.env.PORT || 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany()
    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const locationRoutes = require("./routes/locationRoutes");
app.use("/api/locations", locationRoutes);
app.get('/locations', async (req, res) => {
  try {
    const locations = await prisma.location.findMany()
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

const vehicleRoutes = require("./routes/vehicleRoutes");
app.use("/api/vehicles", vehicleRoutes);
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany()
    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.use(express.json());
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/booking", bookingRoutes);

const dokuRoutes = require("./routes/dokuRoutes");

app.use("/api/doku", dokuRoutes);

