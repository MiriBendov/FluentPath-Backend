-- CreateTable
CREATE TABLE "PlacementTestAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "startingLevel" "Level" NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlacementTestAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlacementTestAttempt_userId_idx" ON "PlacementTestAttempt"("userId");

-- AddForeignKey
ALTER TABLE "PlacementTestAttempt" ADD CONSTRAINT "PlacementTestAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
