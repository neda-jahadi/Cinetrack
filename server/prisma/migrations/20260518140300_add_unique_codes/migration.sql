/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Municipality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Region` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Municipality_code_key" ON "public"."Municipality"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Region_code_key" ON "public"."Region"("code");
