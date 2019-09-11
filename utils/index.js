/* eslint-disable */
/* global AWS */
const AWS = require("aws-sdk");
const bucketName = "solsticetestbucket";
const identityPoolId = "ap-northeast-1:a50a395c-1ead-43e2-91fc-30443b5feb19";

AWS.config.update({
  region: "ap-northeast-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  })
});

const bucket = new AWS.S3({
  params: {
    Bucket: bucketName
  }
});

function getSingleObject(key) {
  return new Promise((resolve, reject) => {

    let keyData = key.split(',');
    let imageType = keyData[0];
    if (imageType != "image/png" && imageType != "image/jpeg") {
      // If there's a key that is not in the format+AWS key format, then treat it as a normal URI
      resolve({
        ok: true,
        uri: key,
      });
      return;
    }

    bucket.getObject(
      {
        Bucket: bucketName,
        Key: key
      },
      (error, data) => {
        if (error) {
          resolve({
            ok: false,
            error
          });
        } else {
          let base64Data = data.Body.toString("base64")
          resolve({
            ok: true,
            uri: "data:" + imageType + ";base64," + base64Data
          });
        }
      });
  });
}

function getRandomKey(format) {
  return format + "," + Math.floor(Math.random() * 2000000000);
}

function getImage(keyOrUrl) {
  if (keyOrUrl.startsWith("http")) {
    return keyOrUrl;
  } else {
    return getSingleObject(keyOrUrl).then(response => {
      return response.uri;
    });
  }
}

function saveObject(file) {
  let format = file[0].type;
  let name = file[0].name;
  const key = getRandomKey(format);
  return new Promise((resolve, reject) => {
    if (format != "image/png" && format != "image/jpeg") {
      resolve({ ok: false, error: "Unknown format: " + format });
      return;
    }

    bucket.putObject(
      {
        Key: key,
        Body: file[0],
        ACL: "public-read"
      },
      (error, data) => { // data does not contain any useful information
        if (error) {
          resolve({ ok: false, error });
        } else {
          resolve({
            ok: true,
            name,
            referenceKey: key
          });
        }
      }
    );
  });
}

module.exports = { getImage, saveObject }
