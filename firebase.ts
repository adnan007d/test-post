import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfigPri from "./firebaseConfig-pri";
import firebaseConfig from "./firebaseConfig";

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfigPri || firebaseConfig)
  : firebase.app();

const auth = app.auth();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, GoogleProvider };
