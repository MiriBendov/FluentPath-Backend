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
      email: 'yael71010@gmail.com',
      // email: 'admin@demo.com',
      passwordHash: await bcrypt.hash('temp_password', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      organizationId: org.id,
    },
  })
  //יצרית משתמש לדוגמא עם מייל זמין
  // await prisma.user.create({
  //   data: {
  //     identityNumber: '987654321',
  //     email: 'miri09743@gmail.com',
  //     passwordHash: await bcrypt.hash('temp_password',10),
  //     firstName: 'miri',
  //     lastName: 'ben dov',
  //     role: 'admin',
  //     organizationId: org.id,
  //   },
  // })

  await prisma.user.create({
    data: {
      identityNumber: '987654321',
      email: 'yael79996@gmail.com',
      passwordHash: await bcrypt.hash('temp_password', 10),
      firstName: 'yael',
      lastName: 'koren',
      role: 'admin',
      organizationId: org.id,
    },
  })

  // יצירת משתמש student
  await prisma.user.create({
    data: {
      identityNumber: '234567891',
      email: 'student@demo.com',
      passwordHash: await bcrypt.hash('temp_password1', 10),
      firstName: 'Student',
      lastName: 'User',
      role: 'student',
      organizationId: org.id,
    },
  })

  // יצירת משתמש student
  const student = await prisma.user.create({
    data: {
      identityNumber: '234567891',
      email: 'student@demo.com',
      passwordHash: await bcrypt.hash('temp_password1', 10),
      firstName: 'Student',
      lastName: 'User',
      role: 'student',
      organizationId: org.id,
    },
  })

  // יצירת משתמש student 2
  const student2 = await prisma.user.create({
    data: {
      identityNumber: '222222222',
      email: 'student2@demo.com',
      passwordHash: await bcrypt.hash('temp_password2', 10),
      firstName: 'Student2',
      lastName: 'User2',
      role: 'student',
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

  //2 יצירת שיעור
  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'English Grammer',
      description: 'Learning English grammar tenses.',
      level: 'elementary',
      orderInLevel: 1,
      estimatedDuration: 40,
      learningObjectives: { topics: ['past simple', 'future'] },
      isActive: true,
    },
  })

  //3 יצירת שיעור
  const lesson3 = await prisma.lesson.create({
    data: {
      title: 'English Grammer 2',
      description: 'Learning English grammar tenses 2.',
      level: 'elementary',
      orderInLevel: 2,
      estimatedDuration: 50,
      learningObjectives: { topics: ['past', 'present simple'] },
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

  // יצירת שיעור 1 לתלמיד
  await prisma.userProgress.create({
    data: {
      status: 'completed',
      completionPercentage: 100,
      startedAt: new Date(),
      completedAt: new Date(),
      totalTimeSpent: lesson.estimatedDuration,
      userId: student2.id,
      lessonId: lesson.id,
    },
  })

  // יצירת שיעור 2 לתלמיד
  await prisma.userProgress.create({
    data: {
      status: 'in_progress',
      completionPercentage: 30,
      startedAt: new Date(),
      totalTimeSpent: 210,
      userId: student2.id,
      lessonId: lesson2.id,
    },
  })

  // יצירת שיעור 3 לתלמיד
  await prisma.userProgress.create({
    data: {
      status: 'not_started',
      completionPercentage: 0,
      startedAt: new Date(),
      totalTimeSpent: 0,
      userId: student2.id,
      lessonId: lesson3.id,
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
