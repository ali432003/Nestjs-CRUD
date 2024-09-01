/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Manager_password_key" ON "Manager"("password");
