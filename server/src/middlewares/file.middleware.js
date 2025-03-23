import multer from 'multer';
import { ApiError } from '../utils/ApiErrors.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "videoFile") {
        if (!file.mimetype.startsWith('video/')) {
            return cb(new ApiError(400, 'Only video files are allowed'));
        }
    } else if (file.fieldname === "thumbnail") {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new ApiError(400, 'Only image files are allowed'));
        }
    }
    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
        files: 2 // Max number of files
    }
});