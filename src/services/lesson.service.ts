import { getLessonsProgressByUser } from "../repositories/lesson.repository";

export const getNextLessonService = async (userId: string) => {
    const progressList = await getLessonsProgressByUser(userId);

    const groupedByLevel: Record<string, any[]> = {};
    for (const row of progressList) {
        const level = row.lesson.level;
        if (!groupedByLevel[level]) {
            groupedByLevel[level] = [];
        }
        groupedByLevel[level].push(row);
    }

    const levelOrder = [
        "beginner",
        "elementary",
        "pre_intermediate",
        "intermediate",
        "upper_intermediate",
    ];

    const levels = Object.keys(groupedByLevel).sort(
        (a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b)
    );

    for (const level of levels) {
        const lessons = groupedByLevel[level].sort(
            (a, b) => a.lesson.orderInLevel - b.lesson.orderInLevel);

        for (const lesson of lessons) {
            if (lesson.status !== "completed") {
                return {
                    id: lesson.lesson.id,
                    title: lesson.lesson.title,
                    description: lesson.lesson.description,
                    level: lesson.lesson.level,
                    estimated_duration: lesson.lesson.estimatedDuration,
                    status: lesson.status,
                };
            }
        }
    }

    return null;
};
