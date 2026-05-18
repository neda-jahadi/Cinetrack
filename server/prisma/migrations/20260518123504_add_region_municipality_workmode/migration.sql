/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - Added the required column `municipalityId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipalityId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."WorkMode" AS ENUM ('ONSITE', 'HYBRID', 'REMOTE');

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "municipalityId" INTEGER NOT NULL,
ADD COLUMN     "regionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "location",
ADD COLUMN     "municipalityId" INTEGER NOT NULL,
ADD COLUMN     "regionId" INTEGER NOT NULL,
ADD COLUMN     "wordMode" "public"."WorkMode" NOT NULL DEFAULT 'ONSITE';

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Municipality" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Municipality" ADD CONSTRAINT "Municipality_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "public"."Municipality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "public"."Municipality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
