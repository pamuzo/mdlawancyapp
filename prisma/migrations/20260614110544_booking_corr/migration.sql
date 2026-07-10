/*
  Warnings:

  - You are about to drop the column `deposite` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `deposit` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "deposite",
ADD COLUMN     "deposit" DECIMAL(12,2) NOT NULL;
