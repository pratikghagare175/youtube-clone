import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_av3P7N7GkbIlDRlE6JhwnBkwPLgpm5s",
  authDomain: "clone-95ab3.firebaseapp.com",
  projectId: "clone-95ab3",
  storageBucket: "clone-95ab3.appspot.com",
  messagingSenderId: "844163363733",
  appId: "1:844163363733:web:84ff5a2def27644fe27c9c",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
