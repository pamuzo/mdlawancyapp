/*
  Warnings:

  - You are about to drop the column `payment` on the `Debts` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Debts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Debts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debts" DROP COLUMN "payment",
ADD COLUMN     "amount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL;
