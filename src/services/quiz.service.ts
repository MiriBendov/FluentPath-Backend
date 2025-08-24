import { QuizRepository } from "../repositories/quiz.repositories";
import { getQuizByIdWithQuestions, getLastQuizAttempt, createQuizAttempt, getAttemptsByUserAndQuiz } from "../repositories/quiz.repository";
import { ApiError } from "../utils/ApiError";

export const QuizService = {
  async createQuiz(input: {
    lessonId: string;
    title: string;
    description?: string;
    timeLimit: number;
    passingScore: number;
    maxAttempts: number;
    isFinalExam?: boolean;
  }
)
  
   {
    
    const {lessonId,title,description,timeLimit,passingScore,maxAttempts,isFinalExam,} = input;

     if (!lessonId || !title || !description || !timeLimit || !passingScore || !maxAttempts) {
      throw new ApiError(400, "Missing required fields");
    }

    return QuizRepository.create({
      lessonId,
      title,
      description,
      timeLimit,
      passingScore,
      maxAttempts,
      isFinalExam: isFinalExam ?? false,
    });
  },



   async updateQuiz(id: string, data: Partial<{
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    maxAttempts: number;
    isFinalExam: boolean;
  }>) {
    const quiz = await QuizRepository.findById(id);
    if (!quiz) {
      throw new ApiError(404, "Quiz not found");
    }

    if (Object.keys(data).length === 0) {
      throw new ApiError(400, "No data provided for update");
    }

    return QuizRepository.update(id, data);
  },
};





export const submitQuizService = async (userId: string, quizId: string, answers: Record<string, string | string[]>, timeTaken: number) => {
    const quiz = await getQuizByIdWithQuestions(quizId);
    if (!quiz) throw new ApiError(404, "Quiz not found");

    const questions = quiz.questions;

    if (questions.length === 0) throw new ApiError(400, "Quiz has no questions");

    let totalPoints = 0;
    let pointsEarned = 0;
    let correctAnswers = 0;

    for (const question of questions) {
        const { id, correctAnswer, points } = question;
        const userAnswer = answers[id];

        totalPoints += points;

        const isCorrect =
            userAnswer &&
            JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);

        if (isCorrect) {
            pointsEarned += points;
            correctAnswers++;
        }
    }

    const score = Math.round((pointsEarned / totalPoints) * 100);
    const passed = score >= quiz.passingScore;

    const lastAttempt = await getLastQuizAttempt(userId, quizId);
    const attemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;

    const startedAt = new Date(Date.now() - timeTaken * 1000);
    const completedAt = new Date();

    await createQuizAttempt({
        userId,
        quizId,
        attemptNumber,
        score,
        totalQuestions: questions.length,
        correctAnswers,
        timeTaken,
        answers,
        passed,
        startedAt,
        completedAt,
    });

    return {
        score,
        passed,
        correct_answers: correctAnswers,
        total_questions: questions.length,
    };
};

export const getUserQuizAttemptsService = async (userId: string, quizId: string) => {
    const attempts = await getAttemptsByUserAndQuiz(userId, quizId);

    return attempts.map((attempt) => ({
        attempt: attempt.attemptNumber,
        score: attempt.score,
        passed: attempt.passed,
        date: attempt.completedAt,
    }));
};
