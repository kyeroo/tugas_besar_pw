/*
  Warnings:

  - A unique constraint covering the columns `[dokuInvoiceId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "dokuInvoiceId" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_dokuInvoiceId_key" ON "Booking"("dokuInvoiceId");
