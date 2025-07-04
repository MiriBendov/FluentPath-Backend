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

