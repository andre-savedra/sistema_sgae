import S3 from 'aws-s3';

export default {
    awsManager: function(){
        console.log("AWS S3 MANAGER RUNNING");

        const config = {
            bucketName: process.env.NUXT_ENV_BUCKET_NAME,
            dirName: process.env.NUXT_ENV_DIR_NAME_TASK,
            region: process.env.NUXT_ENV_REGION,
            accessKeyId: process.env.NUXT_ENV_ACCESSKEY_ID,           
            secretAccessKey: process.env.NUXT_ENV_SECRET_ACESSKEY_ID,            
            s3Url: ('https://' + process.env.NUXT_ENV_BUCKET_NAME + '.s3.amazonaws.com'),
        }
        
        const S3Client = new S3(config);
        return S3Client;
    }   
        

};








