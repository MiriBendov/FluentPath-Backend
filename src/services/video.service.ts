import { createVideo, updateVideo } from "../repositories/video.repository";
import { validateLessonExists, validateVideoExists } from "../utils/validation/video.logic";
import { ApiError } from "../utils/ApiError";

export const createVideoService = async (data: any) => {
    await validateLessonExists(data.lessonId);
    return createVideo(data);
};

export const updateVideoService = async (id: string, data: any) => {
    await validateVideoExists(id);

    if (data.lessonId) {
        await validateLessonExists(data.lessonId);
    }

    return updateVideo(id, data);
};
