import S3 from 'aws-s3';

export default {
    awsManager: function(){
        console.log("AWS S3 MANAGER RUNNING");

        const config = {
            bucketName: process.env.BUCKET_NAME,
            dirName: process.env.DIR_NAME_USERS, /* optional */
            region: process.env.REGION,
            accessKeyId: process.env.ACCESSKEY_ID,
            secretAccessKey: process.env.SECRET_ACESSKEY_ID,
            // s3Url: 'https://my-s3-url.com/', /* optional */
        }
        
        /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
        const S3Client = new S3(config);
        // return S3Client;
        return config;
    }       

};








