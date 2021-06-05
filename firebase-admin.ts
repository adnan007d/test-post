import * as admin from "firebase-admin";

const serviceAccountKeyPri = require("./serviceAccountKey.pri.json");

// This is just to hide my service Account key using a Pri file
const serviceAccountKey = require("./serviceAccountKey.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccountKeyPri || serviceAccountKey
      ),
    })
  : admin.app();

const db = app.firestore().collection("test-posts").doc("test-post");

export { db };
