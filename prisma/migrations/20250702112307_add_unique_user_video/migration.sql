/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `VideoView` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VideoView_userId_videoId_key" ON "VideoView"("userId", "videoId");
