import { VideoRepository } from "../repository/videoRepository";

export const VideoService = {
    async uploadVideo(videoData: any) {
       
        return VideoRepository.createVideo(videoData);
    }
};
