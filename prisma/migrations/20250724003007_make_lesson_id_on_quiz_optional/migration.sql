-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_lessonId_fkey";

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "lessonId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
