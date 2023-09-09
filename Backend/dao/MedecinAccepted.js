const express = require("express");
const path = require("path");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where, setDoc, doc } = require("firebase/firestore");
const { Module } = require("module");

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

const medecinAccepted = collection(db, "acceptedoffer");
class MedecinAccepted{
    
    static async loadAcceptedMedecin(){
        try {
            const snapshot = await getDocs(medecinAccepted);
            const data = [];
            snapshot.forEach((doc) => {
              const medecinAcceptedData = doc.data();
              data.push({
                id: doc.id,
                acceptedBy:medecinAcceptedData.acceptedBy || '',
                available: medecinAcceptedData.available || '',
                date: medecinAcceptedData.date || '',
                region:medecinAcceptedData.region || '',
                speciality:medecinAcceptedData.speciality || '',
              });
            });
            console.log(data);
            return data;
          } catch (error) {
            console.error("Error fetching medecin data:", error);
            return [];
          }
    }
    static async loadAcceptedMedecinWithEmail(email) { // Add the 'email' parameter
        try {
          const snapshot = await getDocs(medecinAccepted);
          const data = [];
      
          snapshot.forEach((doc) => {
            const medecinAcceptedData = doc.data();
      
            // Check if the 'acceptedBy' field matches the provided email
            if (medecinAcceptedData.DemandeBy === email) {
              data.push({
                id: doc.id,
                acceptedBy: medecinAcceptedData.acceptedBy || '',
                available: medecinAcceptedData.available || '',
                date: medecinAcceptedData.date || '',
                region: medecinAcceptedData.region || '',
                speciality: medecinAcceptedData.speciality || '',
              });
            }
          });
      
          console.log(data);
          return data;
        } catch (error) {
          console.error("Error fetching medecin data:", error);
          return [];
        }
      }
      

}

module.exports = MedecinAccepted;