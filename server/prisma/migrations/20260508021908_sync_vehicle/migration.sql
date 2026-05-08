/*
  Warnings:

  - You are about to drop the column `price` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "price",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "locationId" INTEGER,
ADD COLUMN     "pricePerDay" INTEGER,
ADD COLUMN     "seats" INTEGER,
ADD COLUMN     "transmission" TEXT;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
