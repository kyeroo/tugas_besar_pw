const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const locations = [
    {
      name: "Jakarta",
      slug: "jakarta",
      province: "DKI Jakarta",
    },
    {
      name: "Bandung",
      slug: "bandung",
      province: "Jawa Barat",
    },
    {
      name: "Surabaya",
      slug: "surabaya",
      province: "Jawa Timur",
    },
    {
      name: "Yogyakarta",
      slug: "yogyakarta",
      province: "DI Yogyakarta",
    },
    {
      name: "Bali",
      slug: "bali",
      province: "Bali",
    },
    {
      name: "Medan",
      slug: "medan",
      province: "Sumatera Utara",
    },
    {
      name: "Makassar",
      slug: "makassar",
      province: "Sulawesi Selatan",
    },
    {
      name: "Semarang",
      slug: "semarang",
      province: "Jawa Tengah",
    },
    {
      name: "Malang",
      slug: "malang",
      province: "Jawa Timur",
    },
    {
      name: "Palembang",
      slug: "palembang",
      province: "Sumatera Selatan",
    },
  ];

  const jakarta = await prisma.location.findFirst({
  where: { slug: "jakarta" },
});

const bandung = await prisma.location.findFirst({
  where: { slug: "bandung" },
});

await prisma.vehicle.createMany({
  data: [
    {
      name: "Toyota Supra",
      brand: "Toyota",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      pricePerDay: 850000,
      transmission: "Automatic",
      seats: 2,
      locationId: jakarta.id,
    },

    {
      name: "BMW M4",
      brand: "BMW",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
      pricePerDay: 1200000,
      transmission: "Automatic",
      seats: 4,
      locationId: bandung.id,
    },

    {
      name: "Mercedes AMG",
      brand: "Mercedes",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
      pricePerDay: 1500000,
      transmission: "Automatic",
      seats: 4,
      locationId: jakarta.id,
    },
  ],
});

  await prisma.location.createMany({
    data: locations,
    skipDuplicates: true,
  });

  console.log("Locations seeded!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });