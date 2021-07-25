import firebase from "firebase/app";
import * as functions from "firebase-functions"
import "firebase/auth";

let config = require("./env.json");

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

const firebaseConfig = {
  apiKey: config.yt_clone.api_key,
  authDomain: "clone-95ab3.firebaseapp.com",
  projectId: "clone-95ab3",
  storageBucket: "clone-95ab3.appspot.com",
  messagingSenderId: "844163363733",
  appId: "1:844163363733:web:84ff5a2def27644fe27c9c",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
