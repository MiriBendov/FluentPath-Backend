import multer from "multer";

// הגדרת אחסון בזיכרון (הקובץ לא נשמר בדיסק)
const storage = multer.memoryStorage();

// בדיקת סוג הקובץ בלבד
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ["video/mp4", "video/webm", "video/ogg", "audio/mpeg", "audio/wav", "audio/ogg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only video/audio files are allowed."));
    }
};

export const upload = multer({
    storage,
    fileFilter
});

export default upload;
