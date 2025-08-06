-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_lessonId_fkey";

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "lessonId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Login" (
    "id" TEXT NOT NULL,
    "loginTime" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Login_userId_idx" ON "Login"("userId");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
