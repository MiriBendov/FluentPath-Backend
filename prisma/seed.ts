<<<<<<< HEAD
// import { PrismaClient } from '../src/generated/prisma'
=======
// import { PrismaClient } from "@prisma/client";
>>>>>>> feature/upload-video-s3-new
// const prisma = new PrismaClient()
import { prisma } from '../src/db/db';
import bcrypt from 'bcryptjs';

async function main() {
  // יצירת ארגון
  const org = await prisma.organization.create({
    data: {
      name: 'Demo Seminary',
      type: 'seminary',
      maxUsers: 100,
      currentUsers: 1,
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      isActive: true,
    },
  })

  // יצירת משתמש admin
  await prisma.user.create({
    data: {
      identityNumber: '123456789',
      email: 'admin@demo.com',
      passwordHash: await bcrypt.hash('temp_password',10),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      organizationId: org.id,
    },
  })

  // יצירת שיעור
  const lesson = await prisma.lesson.create({
    data: {
      title: 'Basic English',
      description: 'Introduction to English grammar.',
      level: 'beginner',
      orderInLevel: 1,
      estimatedDuration: 30,
      learningObjectives: { topics: ['nouns', 'verbs'] },
      isActive: true,
    },
  })

  // יצירת וידאו לשיעור
  await prisma.video.create({
    data: {
      title: 'Nouns and Verbs',
      description: 'Video explanation of basic grammar.',
      fileUrl: 'https://example.com/video.mp4',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      duration: 300,
      level: 'beginner',
      orderInLesson: 1,
      transcript: 'Transcript of the video...',
      lessonId: lesson.id,
    },
  })

  // יצירת מבחן
  const quiz = await prisma.quiz.create({
    data: {
      title: 'Intro Quiz',
      description: 'Basic quiz for the lesson',
      timeLimit: 10,
      passingScore: 70,
      maxAttempts: 3,
      isFinalExam: false,
      lessonId: lesson.id,
    },
  })

  // שאלה לדוגמה
  await prisma.question.create({
    data: {
      questionText: 'What is a noun?',
      questionType: 'multiple_choice',
      options: ['A verb', 'A person/place/thing', 'An adjective'],
      correctAnswer: ['A person/place/thing'],
      explanation: 'A noun refers to a person, place, or thing.',
      hints: ['Think of "name"'],
      points: 10,
      orderInQuiz: 1,
      quizId: quiz.id,
    },
  })

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
