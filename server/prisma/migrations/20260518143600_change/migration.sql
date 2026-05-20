/*
  Warnings:

  - You are about to drop the column `wordMode` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "wordMode",
ADD COLUMN     "workMode" "public"."WorkMode" NOT NULL DEFAULT 'ONSITE';
