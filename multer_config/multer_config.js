import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
const AWS_REGION="ap-south-1"
const AWS_ACCESS_KEY_ID="ASIAUE5ROX7WBPG7W5EE"
const AWS_SECRET_ACCESS_KEY="Co4TjmAhMNfPTYZ2d6PDvU3JrQ5H/avHaAdKsD1e"
// Configure the AWS SDK with your credentials
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});


const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'upload',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

export {upload}