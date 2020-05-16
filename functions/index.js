const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

app.get("/startgame", (req, res) => {
  admin.database().ref("/hellow").set({ boys: "we didddd it" });
  return admin.database.ref("/hellow").once("value", (snapshot) => {
    return { data: "hoi" };
  });
});
app.get("/helloworld", (req, res) => res.send({ data: "helloworld" }));

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
