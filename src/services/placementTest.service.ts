import { Level } from "@prisma/client";
import { createPlacementTestAttempt, getPlacementTestAttemptByUser, savePlacementTestResult, updatePlacementTestAnswers } from "../repositories/placementTest.repository";
import { getQuestionByDifficulty, getQuestionById } from "../repositories/question.repository";
import { ApiError } from "../utils/ApiError";

export interface PreviousQuestion {
    questionId: string;
    isCorrectAnswer: boolean;
    points: number;
}

export const startPlacementTestService = async (userId: string) => {
    const existing = await getPlacementTestAttemptByUser(userId);
    if (existing && !existing.completedAt) {
        throw new ApiError(400, "Placement test already in progress");
    }

    const firstQuestion = await getQuestionByDifficulty(Level.pre_intermediate, []);
    if (!firstQuestion) throw new ApiError(404, "No questions available for placement test");

    await createPlacementTestAttempt(userId);

    return firstQuestion;
};

export const getNextQuestionService = async (userId: string, questionId: string, answer: string) => {
    const attempt = await getPlacementTestAttemptByUser(userId);
    if (!attempt) throw new ApiError(404, "Placement test attempt not found");

    if (attempt.completedAt) throw new ApiError(400, "Placement test already completed");

    const previousQuestions = attempt.answers as unknown as PreviousQuestion[];

    const now = new Date();
    const diffMs = now.getTime() - new Date(attempt.startedAt).getTime();
    if (diffMs > 45 * 60 * 1000) {
        return { finished: true, reason: "Time limit exceeded" };
    }

    const isCorrect = await checkAnswer(questionId, answer);

    const question = await getQuestionById(questionId);
    if (!question) throw new ApiError(404, "Question not found");

    const currentAnswer = {
        questionId,
        isCorrectAnswer: isCorrect,
        points: question.points || 0,
    };

    const updatedAnswers = [...previousQuestions, currentAnswer];

    await updatePlacementTestAnswers(attempt.id, updatedAnswers);

    if (updatedAnswers.length >= 30) {
        return { finished: true, reason: "Max questions reached" };
    }

    const nextDifficulty = await determineNextDifficulty(questionId, isCorrect);

    const excludedIds = updatedAnswers.map(a => a.questionId);
    const nextQuestion = await getQuestionByDifficulty(nextDifficulty, excludedIds);
    if (!nextQuestion) {
        return { finished: true, reason: "No more questions available at that difficulty" }
    }

    return { nextQuestion, nextDifficulty, finished: false, };
};

export const finishPlacementTestService = async (userId: string) => {
    const attempt = await getPlacementTestAttemptByUser(userId);
    if (!attempt) throw new ApiError(404, "Placement test attempt not found");

    if (attempt.completedAt) throw new ApiError(400, "Placement test already completed");

    const previousQuestions = attempt.answers as unknown as PreviousQuestion[];

    const totalPoints = previousQuestions.reduce((acc, ans) => {
        const points = typeof ans.points === "number" ? ans.points : 0;
        return acc + (ans.isCorrectAnswer ? points : 0);
    }, 0);
    const maxPossiblePoints = previousQuestions.reduce((acc, ans) => {
        const points = typeof ans.points === "number" ? ans.points : 0;
        return acc + points
    }, 0);
    const percentage = maxPossiblePoints > 0 ? Math.round((totalPoints / maxPossiblePoints) * 100) : 0;

    let startingLevel: Level;
    if (percentage < 25) startingLevel = "beginner";
    else if (percentage < 45) startingLevel = "elementary";
    else if (percentage < 65) startingLevel = "pre_intermediate";
    else if (percentage < 85) startingLevel = "intermediate";
    else startingLevel = "upper_intermediate";

    await savePlacementTestResult(attempt.id, percentage, startingLevel);

    return { starting_level: startingLevel, score: percentage };
};

const determineNextDifficulty = async (questionId: string, isCorrect: boolean): Promise<Level> => {
    const levels: Level[] = ["beginner", "elementary", "pre_intermediate", "intermediate", "upper_intermediate"];
    const currentIndex = levels.indexOf(await getDifficultyByQuestion(questionId));

    if (isCorrect && currentIndex < levels.length - 1) {
        return levels[currentIndex + 1];
    }
    if (!isCorrect && currentIndex > 0) {
        return levels[currentIndex - 1];
    }
    return levels[currentIndex];
};

const checkAnswer = async (questionId: string, answer: string): Promise<boolean> => {
    const question = await getQuestionById(questionId);
    if (!question) throw new ApiError(404, "Question not found");

    return JSON.stringify(question.correctAnswer) === JSON.stringify(answer);
};

const getDifficultyByQuestion = async (questionId: string): Promise<Level> => {
    const question = await getQuestionById(questionId);
    if (!question) throw new ApiError(404, "Question not found");

    return question.quiz.lesson.level;
};
