-- CreateTable
CREATE TABLE "MoneyAdded" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoneyAdded_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MoneyAdded" ADD CONSTRAINT "MoneyAdded_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
