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

const DemandemedecinCol = collection(db, "DemandeMedcin");
class DemandeMedecinDao{
    static async addDemandeMedecin(demandeMedecinData) {
        try {
          const newDemandeMedecinRef = await addDoc(DemandemedecinCol, demandeMedecinData);
          return newDemandeMedecinRef.id;
        } catch (error) {
          console.error("Error adding medic demand:", error);
          throw error;
        }
      }
    
      static async deleteDemandeMedecin(demandeMedecinId) {
        try {
            await deleteDoc(doc(collection(db, "DemandeMedcin"), demandeMedecinId));
        } catch (error) {
          console.error("Error deleting medic demand:", error);
          throw error;
        }
      }
    
      static async searchDemandeMedecins(criteria) {
        try {
          const q = query(DemandemedecinCol, where("criteriaField", "==", criteria));
          const querySnapshot = await getDocs(q);
          const demandeMedecins = [];
          querySnapshot.forEach((doc) => {
            demandeMedecins.push({ id: doc.id, ...doc.data() });
          });
          return demandeMedecins;
        } catch (error) {
          console.error("Error searching medic demands:", error);
          throw error;
        }
      }
    
    
    
      static async loadAllDemandeMedecins() {
        try {
          const querySnapshot = await getDocs(DemandemedecinCol);
          const demandeMedecins = [];
          querySnapshot.forEach((doc) => {
            demandeMedecins.push({ id: doc.id, ...doc.data() });
          });
          return demandeMedecins;
        } catch (error) {
          console.error("Error loading medic demands:", error);
          throw error;
        }
      }
      
}
module.exports = DemandeMedecinDao;