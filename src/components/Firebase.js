// @flow
import * as firebase from "firebase";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyDXsex5zmmrFait0lorUAEz7ruLdLlulUU",
    authDomain: "lome-1dd8e.firebaseapp.com",
    databaseURL: "https://lome-1dd8e.firebaseio.com",
    projectId: "lome-1dd8e",
    storageBucket: "lome-1dd8e.appspot.com",
    messagingSenderId: "279879027040",
    appId: "1:279879027040:web:8b4fa1d811035a05"
  };
 

export default class Firebase {

    static firestore: firebase.firestore.Firestore;
    static auth: firebase.auth.Auth;
    static storage: firebase.storage.Storage;


    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.firestore = firebase.firestore();
        Firebase.storage = firebase.storage();
    }
}
