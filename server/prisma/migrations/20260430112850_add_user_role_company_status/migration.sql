/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'COMPANY', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."CompanyStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "status" "public"."CompanyStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "public"."WatchlistItem" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "public"."Company"("userId");

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
