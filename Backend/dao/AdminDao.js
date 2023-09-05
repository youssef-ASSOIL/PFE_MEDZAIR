const express = require("express");
const path = require("path");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where } = require("firebase/firestore");


const app = express();
const port = 3002;
let user="";

app.use(cors()); // Allow all origins, you can customize this as needed
app.use(express.json());

const firebaseApp = initializeApp({
  apiKey: "AIzaSyADwW3N6qrFVVAtpGCbhjETuFVTdYyei-o",
  authDomain: "medzairapp.firebaseapp.com",
  databaseURL:
    "https://medzairapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "medzairapp",
  storageBucket: "medzairapp.appspot.com",
  messagingSenderId: "806510731200",
  appId: "1:806510731200:web:f5c2e8a2eb6b13990ff225",
  measurementId: "G-N3N921QWM0",
});
const db = getFirestore(firebaseApp);

const AdminCol = collection(db, "Admin");
class AdminDao{

    static async AdminLogin(codeAdmin, password) {
        try {
          const q = query(AdminCol, where("codeAdmin", "==", codeAdmin));
          const querySnapshot = await getDocs(q);
      
          if (querySnapshot.empty) {
            // Admin with the provided codeAdmin doesn't exist
            return null;
          }
      
          // Assuming you have a field called 'password' in your admin documents
          const adminData = querySnapshot.docs[0].data();
      
          if (adminData.password === password) {
            // CodeAdmin and Password are correct
            return true;
          } else {
            // Password is incorrect
            return null;
          }
        } catch (error) {
          console.error("Error searching admin:", error);
          throw error;
        }
      }
      

}

module.exports = AdminDao;