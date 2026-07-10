-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "overpaid" DECIMAL(12,2) NOT NULL DEFAULT 0,
ALTER COLUMN "deliveryDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "deliveryDate" SET DATA TYPE TIMESTAMP(6);

-- CreateTable
CREATE TABLE "Debts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "payment" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Debts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Debts" ADD CONSTRAINT "Debts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
