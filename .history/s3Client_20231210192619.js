const {S3Client}=require('@aws-sdk/client-s3')

const client = new S3Client({
    region:'us-east-2',
    credentials:{
       accessKeyId:'AKIA3PIVPEUBT5DCEEPV',
       secretAccessKey: '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',
    }
})

module.exports = client