-- CreateEnum
CREATE TYPE "ImageSide" AS ENUM ('left', 'right');

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL DEFAULT 'About Us',
    "heading" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutStat" (
    "id" TEXT NOT NULL,
    "aboutContentId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AboutStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutImage" (
    "id" TEXT NOT NULL,
    "aboutContentId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "side" "ImageSide" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AboutImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AboutStat" ADD CONSTRAINT "AboutStat_aboutContentId_fkey" FOREIGN KEY ("aboutContentId") REFERENCES "AboutContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutImage" ADD CONSTRAINT "AboutImage_aboutContentId_fkey" FOREIGN KEY ("aboutContentId") REFERENCES "AboutContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
