-- CreateTable
CREATE TABLE "WhyChooseContent" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL DEFAULT 'Why Choose Us',
    "headingPrefix" TEXT NOT NULL DEFAULT 'Built on',
    "headingAccent" TEXT NOT NULL DEFAULT 'craft',
    "headingSuffix" TEXT NOT NULL DEFAULT ', run like a press.',
    "intro" TEXT NOT NULL DEFAULT 'Four decades-deep reasons businesses trust Arjun Printing Press with every run, from proof to delivery.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhyChooseContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhyChooseFeature" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'Award',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WhyChooseFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhyChooseContent_sectionId_key" ON "WhyChooseContent"("sectionId");

-- AddForeignKey
ALTER TABLE "WhyChooseContent" ADD CONSTRAINT "WhyChooseContent_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhyChooseFeature" ADD CONSTRAINT "WhyChooseFeature_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "WhyChooseContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
