/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_name_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");
