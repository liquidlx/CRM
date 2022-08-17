-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Sellers" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Stores" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
