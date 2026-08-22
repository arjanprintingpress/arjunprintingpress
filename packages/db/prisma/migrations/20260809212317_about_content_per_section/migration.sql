-- AlterTable
ALTER TABLE "AboutContent" ADD COLUMN "sectionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AboutContent_sectionId_key" ON "AboutContent"("sectionId");

-- AddForeignKey
ALTER TABLE "AboutContent" ADD CONSTRAINT "AboutContent_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
