const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const mime = require('mime-types');
require('dotenv').config();

const { s3OutputDirName, s3BucketName, s3BucketRegion } = require('./config');

const s3Client = new S3Client({
    region: s3BucketRegion,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const PROJECT_ID = process.env.PROJECT_ID;
async function init() {
    console.log('Executing script.js');
    const outDirPath = path.join(__dirname, 'output');
    const p = exec(`cd ${outDirPath} && npm install && npm run build`);
    p.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    p.stdout.on('error', function (data) {
        console.log('Error', data.toString());
    });
    p.on('close', async function () {
        console.log('Build completed');
        const distFolderPath = path.join(__dirname, 'output', 'dist');
        const distFolderContents = fs.readdirSync(distFolderPath, {
            recursive: true
        });
        for (const file of distFolderContents) {
            console.log('file: ', file);
            const filePath = path.join(distFolderPath, file);
            if (fs.lstatSync(filePath).isDirectory()) continue;
            console.log('Uploading: ', filePath);
            const command = new PutObjectCommand({
                Bucket: s3BucketName,
                Key: `${path.join(s3OutputDirName, PROJECT_ID, file)}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            });
            await s3Client.send(command);
            console.log('Uploaded: ', filePath);
        }
        console.log('Done...');
    });
}

init();
