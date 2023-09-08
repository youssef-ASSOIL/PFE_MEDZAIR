const express = require("express");
const path = require("path");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where, doc, setDoc, deleteDoc } = require("firebase/firestore");

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

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const hospitalCol = collection(db, "Hospital");
class HospitalDao {

    static async addHospital(hospitalData) {
      try {
        const newHospitalRef = await addDoc(hospitalCol, hospitalData);
        return newHospitalRef.id;
      } catch (error) {
        console.error("Error adding hospital:", error);
        throw error;
      }
    }
  
    static async deleteHospital(hospitalId) {
      try {
        await deleteDoc(doc(db, "Hospital", hospitalId));
      } catch (error) {
        console.error("Error deleting hospital:", error);
        throw error;
      }
    }
  
    static async searchHospitalByMail(mail) {
      try {
        const q = query(hospitalCol, where("email", "==", mail)); // Replace 'criteriaField' with your actual field and criteria
        const querySnapshot = await getDocs(q);
        const hospitals = [];
        querySnapshot.forEach((doc) => {
          hospitals.push({ id: doc.id, ...doc.data() });
        });
        return hospitals;
      } catch (error) {
        console.error("Error searching hospitals:", error);
        throw error;
      }
    }
  
    static async modifyHospital(hospitalId, newData) {
      try {
        console.log('Updated data', newData);
        const docRef = doc(db, "Hospital", hospitalId);
        await setDoc(docRef, newData);
   
      } catch (error) {
        console.error("Error modifying hospital:", error);
        throw error;
      }
    }
   
    
    
   static async loadAllHospitals () {
    try {
      const snapshot = await getDocs(hospitalCol);
      const data = [];
      snapshot.forEach((doc) => {
        const hospitalData = doc.data();
        data.push({
          id: doc.id,
          email:hospitalData.email || '',
          imagePath:hospitalData.imagePath || '',
          name:hospitalData.name || '',
          password:hospitalData.password || '',
          region:hospitalData.region || '',
        });
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching medecin data:", error);
      return [];
    }
};
    
  }
  
  module.exports = HospitalDao;