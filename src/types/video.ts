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

export type VideoViewInput = {
    userId: string;
    videoId: string;
    watch_time: number;
    completed: boolean;
};

export type CreateVideoViewInput = {
    userId: string;
    videoId: string;
    totalWatchTime: number;
    watchPercentage: number;
    lastPosition: number;
    completed: boolean;
};

export type UpdateVideoViewInput = Partial<{
    totalWatchTime: number;
    watchPercentage: number;
    lastPosition: number;
    completed: boolean;
}>;

