// <<<<<<< HEAD
// import { VideoRepository } from "../repository/video.repository";
// import { createVideo, updateVideo, softDeleteVideo } from "../repositories/video.repository";
// import { validateLessonExists, validateVideoExists } from "../utils/validation/video.logic";
// import { CreateVideoInput, UpdateVideoInput } from "../types/video";

// export const VideoService = {
//     async uploadVideo(videoData: any) {
       
//         return VideoRepository.createVideo(videoData);
//     }
// };





// export const createVideoService = async (data: CreateVideoInput) => {
//     await validateLessonExists(data.lessonId);
//     return createVideo(data);
// };

// export const updateVideoService = async (id: string, data: UpdateVideoInput) => {
//     await validateVideoExists(id);
// =======
// import { getVideoViewByUserAndVideo, createVideoView, updateVideoView } from "../repositories/video.repository";
// import { validateVideoExists } from "../utils/validation/video.logic";
// import { VideoViewInput } from "../types/video";

// export const recordVideoViewService = async ({ userId, videoId, watch_time, completed }: VideoViewInput) => {
//     const video = await validateVideoExists(videoId);

//     // Based on single session watch time – may include rewatched segments.
//     const percentage = Math.min(Math.floor((watch_time / video.duration) * 100), 100);
// >>>>>>> feature/video-view-tracking

//     const existingView = await getVideoViewByUserAndVideo(userId, videoId);

//     if (existingView) {
//         const newTotal = existingView.totalWatchTime + watch_time;

//         // Based on total watch time – may include rewatched segments.
//         const newPercentage = Math.min(Math.floor((newTotal / video.duration) * 100), 100);

//         // Assumes continuous viewing from last position.
//         // This is an estimate – actual playback may vary.
//         await updateVideoView(existingView.id, {
//             totalWatchTime: newTotal,
//             watchPercentage: newPercentage,
//             lastPosition: Math.min(video.duration, existingView.lastPosition + watch_time),
//             completed: existingView.completed || completed,
//         });
//     } else {
//         await createVideoView({
//             userId,
//             videoId,
//             totalWatchTime: watch_time,
//             watchPercentage: percentage,
//             lastPosition: watch_time,
//             completed,
//         });
//     }
// <<<<<<< HEAD

//     return updateVideo(id, data);
// };

// export const deleteVideoService = async (id: string) => {
//     await validateVideoExists(id);
//     return softDeleteVideo(id);
// };
// =======
// };
// >>>>>>> feature/video-view-tracking





import { VideoRepository } from "../repository/video.repository";
import { createVideo, updateVideo, softDeleteVideo } from "../repositories/video.repository";
import { validateLessonExists, validateVideoExists } from "../utils/validation/video.logic";
import { CreateVideoInput, UpdateVideoInput } from "../types/video";
import { getVideoViewByUserAndVideo, createVideoView, updateVideoView } from "../repositories/video.repository";
import { VideoViewInput } from "../types/video";

export const VideoService = {
    async uploadVideo(videoData: any) {
       
        return VideoRepository.createVideo(videoData);
    }
};





export const createVideoService = async (data: CreateVideoInput) => {
    await validateLessonExists(data.lessonId);
    return createVideo(data);
};

export const updateVideoService = async (id: string, data: UpdateVideoInput) => {
    await validateVideoExists(id);

    if (data.lessonId) {
        await validateLessonExists(data.lessonId);
    }

    return updateVideo(id, data);
};

export const deleteVideoService = async (id: string) => {
    await validateVideoExists(id);
    return softDeleteVideo(id);
};


export const recordVideoViewService = async ({ userId, videoId, watch_time, completed }: VideoViewInput) => {
    const video = await validateVideoExists(videoId);

    // Based on single session watch time – may include rewatched segments.
    const percentage = Math.min(Math.floor((watch_time / video.duration) * 100), 100);

    const existingView = await getVideoViewByUserAndVideo(userId, videoId);

    if (existingView) {
        const newTotal = existingView.totalWatchTime + watch_time;

        // Based on total watch time – may include rewatched segments.
        const newPercentage = Math.min(Math.floor((newTotal / video.duration) * 100), 100);

        // Assumes continuous viewing from last position.
        // This is an estimate – actual playback may vary.
        await updateVideoView(existingView.id, {
            totalWatchTime: newTotal,
            watchPercentage: newPercentage,
            lastPosition: Math.min(video.duration, existingView.lastPosition + watch_time),
            completed: existingView.completed || completed,
        });
    } else {
        await createVideoView({
            userId,
            videoId,
            totalWatchTime: watch_time,
            watchPercentage: percentage,
            lastPosition: watch_time,
            completed,
        });
    }
};