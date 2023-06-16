import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

// Configure the AWS SDK with your credentials
AWS.config.update({
  region: 'REGION',
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