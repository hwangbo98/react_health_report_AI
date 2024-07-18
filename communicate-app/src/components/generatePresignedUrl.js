const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.handler = async (event) => {
  const { fileName, fileType } = JSON.parse(event.body);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60, // URL 유효 시간 (초)
    ContentType: fileType
  };

  try {
    const signedUrl = s3.getSignedUrl('putObject', params);
    return {
      statusCode: 200,
      body: JSON.stringify({ url: signedUrl })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate presigned URL' })
    };
  }
};