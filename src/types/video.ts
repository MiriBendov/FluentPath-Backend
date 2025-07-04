export type CreateVideoInput = {
    title: string;
    description: string;
    fileUrl: string;
    thumbnailUrl: string;
    duration: number;
    level: "beginner" | "elementary" | "pre_intermediate" | "intermediate" | "upper_intermediate";
    lessonId: string;
    orderInLesson: number;
    transcript: string;
};

export type UpdateVideoInput = Partial<CreateVideoInput>;
