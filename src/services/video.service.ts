import { ApiError } from "../utils/ApiError";
import { createVideo, findLessonById } from "../repositories/video.repository";

export const createVideoService = async (data: any) => {
    const lesson = await findLessonById(data.lessonId);
    if (!lesson) {
        throw new ApiError(400, "Lesson with the given ID does not exist");
    }
    
    return createVideo(data);
};

