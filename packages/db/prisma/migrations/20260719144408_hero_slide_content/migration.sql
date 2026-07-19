/*
  Warnings:

  - You are about to drop the column `subcopy` on the `HeroSlide` table. All the data in the column will be lost.
  - Added the required column `eyebrow` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headingAccent` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HeroSlide" DROP COLUMN "subcopy",
ADD COLUMN     "eyebrow" TEXT NOT NULL,
ADD COLUMN     "headingAccent" TEXT NOT NULL,
ADD COLUMN     "intro" TEXT NOT NULL;
