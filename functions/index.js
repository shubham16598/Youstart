const functions = require('firebase-functions');
const UUID = require("uuid-v4");

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const gcs = require('@google-cloud/storage')({
    projectId: 'youstart-a45b3',
    keyFilename: 'youstart-a45b3-firebase-adminsdk-c011k-138e45b8bc.json'
});
const fs = require('fs');

const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});


exports.generateThumbnail = functions.storage.object().onChange((event) => {
  const object = event.data; // The Storage object.
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.index.js
  console.log(filePath);
  console.log(contentType);
  let uuid = UUID();
  //const bucket = gcs.bucket("youstart-a45b3.appspot.com");
  //const file = bucket.file(filePath);
  //console.log(file);
  const url= "https://firebasestorage.googleapis.com/v0/b/" + fileBucket + "/o/" + encodeURIComponent(filePath) + "?alt=media&token=" + uuid ;
  // file.getSignedUrl({
  //   action: 'read',
  //   expires: '03-09-2491'
  // }).then(signedUrls => {
  //   // signedUrls[0] contains the file's public URL
  //   url = signedUrls[0];
  // }).catch(function(e) {
  // console.log("handled the error");
  // });
  console.log(url);
  let mailOptions = {
    from: '"Shubham Singh" <noreply@firebase.com>',
    to: filePath,
    subject : 'Image Uploaded! Here is your image',
    text : 'You image is uploaded, You can download your image from here '+url
  };


    return mailTransport.sendMail(mailOptions)
    .then(() => console.log(`New confirmation email sent to:`, filePath))
    .catch((error) => console.error('There was an error while sending the email:', error));


});
