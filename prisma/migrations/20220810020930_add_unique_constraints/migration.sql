/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customers_email_unique_constraint" ON "Customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_cpf_unique_constraint" ON "Customers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_unique_constraint" ON "Users"("email");
