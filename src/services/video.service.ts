import { getVideoViewByUserAndVideo, createVideoView, updateVideoView } from "../repositories/video.repository";
import { validateVideoExists } from "../utils/validation/video.logic";
import { VideoViewInput } from "../types/video";

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