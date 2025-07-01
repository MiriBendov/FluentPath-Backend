import { findLessonById, findVideoById } from "../../repositories/video.repository";
import { ApiError } from "../../utils/ApiError";

export const validateLessonExists = async (lessonId: string) => {
    const lesson = await findLessonById(lessonId);
    if (!lesson) {
        throw new ApiError(400, "Lesson with the given ID does not exist");
    }
    return lesson;
};

export const validateVideoExists = async (videoId: string) => {
    const video = await findVideoById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    return video;
};

