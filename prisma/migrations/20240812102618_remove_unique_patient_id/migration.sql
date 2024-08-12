/*
  Warnings:

  - Made the column `description` on table `PatientRegister` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PatientRegister" ALTER COLUMN "description" SET NOT NULL;
