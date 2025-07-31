/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PlacementTestAttempt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlacementTestAttempt" DROP COLUMN "createdAt",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
