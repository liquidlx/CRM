/*
  Warnings:

  - You are about to drop the column `usersId` on the `Stores` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stores" DROP CONSTRAINT "Stores_usersId_fkey";

-- AlterTable
ALTER TABLE "Stores" DROP COLUMN "usersId";

-- CreateTable
CREATE TABLE "_StoresToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StoresToUsers_AB_unique" ON "_StoresToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_StoresToUsers_B_index" ON "_StoresToUsers"("B");

-- AddForeignKey
ALTER TABLE "_StoresToUsers" ADD FOREIGN KEY ("A") REFERENCES "Stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoresToUsers" ADD FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
