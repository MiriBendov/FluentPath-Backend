import { VideoRepository } from "../repository/video.repository";
import { createVideo, updateVideo, softDeleteVideo } from "../repositories/video.repository";
import { validateLessonExists, validateVideoExists } from "../utils/validation/video.logic";
import { CreateVideoInput, UpdateVideoInput } from "../types/video";

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
