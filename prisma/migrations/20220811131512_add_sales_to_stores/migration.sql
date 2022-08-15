/*
  Warnings:

  - Made the column `customersId` on table `Sales` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellersId` on table `Sales` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_customersId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_sellersId_fkey";

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "storesId" TEXT,
ALTER COLUMN "customersId" SET NOT NULL,
ALTER COLUMN "sellersId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_sellersId_fkey" FOREIGN KEY ("sellersId") REFERENCES "Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
