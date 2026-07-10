-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "businessAddress" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(6),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "otherNumber" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "reputation" INTEGER NOT NULL DEFAULT 0;
