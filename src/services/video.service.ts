import { VideoRepository } from "../repository/video.repository";

export const VideoService = {
    async uploadVideo(videoData: any) {
       
        return VideoRepository.createVideo(videoData);
    }
};
