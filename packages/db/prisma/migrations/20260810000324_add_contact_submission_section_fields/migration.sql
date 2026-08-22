/*
  Warnings:

  - Added the required column `sectionId` to the `ContactSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "brandingRequirements" TEXT,
ADD COLUMN     "eventDate" TEXT,
ADD COLUMN     "paperSpec" TEXT,
ADD COLUMN     "sectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ContactSubmission" ADD CONSTRAINT "ContactSubmission_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
