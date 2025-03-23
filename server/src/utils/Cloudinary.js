

import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFileOnCloudinary = (buffer, resourceType = "auto") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
                quality: "auto",
                fetch_format: "auto"
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};