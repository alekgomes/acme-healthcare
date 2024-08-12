/*
  Warnings:

  - Added the required column `status` to the `PatientRegister` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatientRegister" ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);
