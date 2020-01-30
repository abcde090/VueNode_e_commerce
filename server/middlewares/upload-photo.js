const aws = require('aws-sdk');
const multer = require('multer');
const multer_s3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
})

const s3 = new aws.S3();

const upload = multer({
    storage: multer_s3({
        s3: s3,
        bucket: 'brisgeese',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        }, 
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})


module.exports = upload;