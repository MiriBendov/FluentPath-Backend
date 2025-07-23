import { getQuestionByDifficulty, getQuestionById } from "../repositories/placementTest.repository";
import { ApiError } from "../utils/ApiError";

type Difficulty = "beginner" | "elementary" | "pre_intermediate" | "intermediate" | "upper_intermediate";

export interface PreviousAnswer {
    questionId: string;
    correct: boolean;
    questionLevel: Difficulty
    points: number
}

export const startPlacementTestService = async () => {
    // מתחילים ברמת קושי בינונית
    const firstQuestion = await getQuestionByDifficulty("pre_intermediate", []);
    if (!firstQuestion) {
        throw new ApiError(404, "No questions available for placement test");
    }
    return firstQuestion;
};

export const getNextQuestionService = async (questionId: string, answer: string, previousAnswers: PreviousAnswer[]) => {
    // שמירת התשובה
    //await saveAnswer(userId, questionId, answer);

    // קביעת רמת השאלה הבאה לפי התשובה הנוכחית
    const isCorrect = await checkAnswer(questionId, answer);
    const nextDifficulty = await determineNextDifficulty(questionId, isCorrect);

    const excludedIds = previousAnswers.map(a => a.questionId);
    const question = await getQuestionByDifficulty(nextDifficulty, excludedIds);
    if (!question) throw new ApiError(404, "No more questions available");

    return { question, nextDifficulty };
};

export const finishPlacementTestService = async (previousAnswers: PreviousAnswer[]) => {
    const totalPoints = previousAnswers.reduce((acc, ans) => {
        return acc + (ans.correct ? ans.points : 0);
    }, 0);

    const maxPossiblePoints = previousAnswers.reduce((acc, ans) => acc + ans.points, 0);
    const scoreRate = maxPossiblePoints > 0 ? totalPoints / maxPossiblePoints : 0;
    const percentage = Math.round(scoreRate * 100);

    let startingLevel: Difficulty;
    if (percentage < 25) startingLevel = "beginner";
    else if (percentage < 45) startingLevel = "elementary";
    else if (percentage < 65) startingLevel = "pre_intermediate";
    else if (percentage < 85) startingLevel = "intermediate";
    else startingLevel = "upper_intermediate";

    return { startingLevel, score: percentage };

    // const answers = await getUserAnswers(userId);

    // חישוב ציון כולל לכל רמה
    // const levelScore: Record<Difficulty, number> = {
    //     beginner: 0,
    //     elementary: 0,
    //     pre_intermediate: 0,
    //     intermediate: 0,
    //     upper_intermediate: 0,
    // };

    // previousAnswers.forEach(a => {
    //     if (a.correct) {
    //         levelScore[a.questionLevel] += 1;
    //     }
    // });

    // מציאת הרמה עם הביצועים הטובים ביותר
    // const recommendedLevel = Object.entries(levelScore).sort((a, b) => b[1] - a[1])[0][0];

    // return { recommended_level: recommendedLevel };
};

// פונקציה פנימית לקביעת רמת השאלה הבאה
const determineNextDifficulty = async (questionId: string, isCorrect: boolean): Promise<Difficulty> => {
    const levels: Difficulty[] = ["beginner", "elementary", "pre_intermediate", "intermediate", "upper_intermediate"];
    const currentIndex = levels.indexOf(await getDifficultyByQuestion(questionId));

    if (isCorrect && currentIndex < levels.length - 1) {
        return levels[currentIndex + 1];
    }
    if (!isCorrect && currentIndex > 0) {
        return levels[currentIndex - 1];
    }
    return levels[currentIndex];
};

// פונקציות עזר (להשלמה):
const checkAnswer = async (questionId: string, answer: string): Promise<boolean> => {
    const question = await getQuestionById(questionId);
    if (!question) throw new ApiError(404, "Question not found");

    return JSON.stringify(question.correctAnswer) === JSON.stringify(answer);
};

const getDifficultyByQuestion = async (questionId: string): Promise<Difficulty> => {
    const question = await getQuestionById(questionId);
    if (!question) throw new ApiError(404, "Question not found");
    // שליפה מהמסד את רמת הקושי של השאלה
    return question.quiz.lesson.level as Difficulty;
};
