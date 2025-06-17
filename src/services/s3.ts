import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export function uploadToS3(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType,
        ACL: 'public-read', // Adjust permissions as needed
    };

    return s3.upload(params).promise();
}