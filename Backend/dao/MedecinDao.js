const express = require("express");
const path = require("path");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where, setDoc, doc } = require("firebase/firestore");

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

const medecinCol = collection(db, "Medecin");

class MedecinDao{
  static async addMedecin(medecinData) {
    try {
      const newMedecinRef = await addDoc(medecinCol, medecinData);
      return newMedecinRef.id;
      
    } catch (error) {
      console.error("Error adding medecin:", error);
      throw error;
    }
  }
    
      static async deleteMedecin(medecinId) {
        try {
          await deleteDoc(doc(db, "Medecin", medecinId));
        } catch (error) {
          console.error("Error deleting medic:", error);
          throw error;
        }
      }
    
      static async searchMedecins(rpps) {
        try {
          const q = query(medecinCol, where("rpps", "==", rpps));
          const querySnapshot = await getDocs(q);
          const medecins = [];
          querySnapshot.forEach((doc) => {
            medecins.push({ id: doc.id, ...doc.data() });
          });
          return medecins;
        } catch (error) {
          console.error("Error searching medics:", error);
          throw error;
        }
      }
    
      static async modifyMedecin(medecinId, newData) {
        try {
          console.log('Updated data', newData);
          const docRef = doc(db, "Medecin", medecinId);
          await setDoc(docRef, newData);
         
        } catch (error) {
          console.error("Error modifying medic:", error);
          throw error;
        }
      }
    
      static async loadAllMedecins() {
        try {
          const querySnapshot = await getDocs(medecinCol);
          const medecins = [];
          querySnapshot.forEach((doc) => {
            medecins.push({ id: doc.id, ...doc.data() });
          });
          return medecins;
        } catch (error) {
          console.error("Error loading medics:", error);
          throw error;
        }
      }
    
      static async addDemandeMedecin(demandeMedecinData) {
        try {
          const newDemandeMedecinRef = await addDoc(medecinCol, demandeMedecinData);
          return newDemandeMedecinRef.id;
        } catch (error) {
          console.error("Error adding medic demand:", error);
          throw error;
        }
      }
      static async loadAllMedecins(){
        try {
            const querySnapshot = await getDocs(medecinCol);
            const medecins = [];
            querySnapshot.forEach((doc) => {
                medecins.push({ id: doc.id, ...doc.data() });
            });
            return medecins;
          } catch (error) {
            console.error("Error loading medecins:", error);
            throw error;
          }
      }
    
}
module.exports = MedecinDao;