const functions = require("firebase-functions");
const cors = require("cors");

exports.helloWorld = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    response.send({ message: "Hello from Firebase!" });
  });
});
