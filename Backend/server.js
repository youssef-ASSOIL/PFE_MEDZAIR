const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged } = require('firebase/auth');
const { getFirestore, collection, getDocs, getDoc } = require('firebase/firestore');

// The rest of your code remains the same...

const express = require('express');
const path = require('path');
const app = express();
const port = 3001;


const firebaseApp= initializeApp({
  apiKey: "AIzaSyADwW3N6qrFVVAtpGCbhjETuFVTdYyei-o",
  authDomain: "medzairapp.firebaseapp.com",
  databaseURL: "https://medzairapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "medzairapp",
  storageBucket: "medzairapp.appspot.com",
  messagingSenderId: "806510731200",
  appId: "1:806510731200:web:f5c2e8a2eb6b13990ff225",
  measurementId: "G-N3N921QWM0"
});
const auth=getAuth(firebaseApp);
const db=getFirestore(firebaseApp);
const hospitalCol = collection(db,'Hospital');


// Fetch all documents from the "Hospital" collection
const getHospitalData = async () => {
  try {
    const snapshot = await getDocs(hospitalCol);
    snapshot.forEach((doc) => {
      console.log('Hospital ID: ', doc.id);
      console.log('Hospital Data: ', doc.data());
    });
  } catch (error) {
    console.error('Error fetching hospital data:', error);
  }
};


onAuthStateChanged(auth,user =>{
  if(user != null){
    console.log("logged in");
  }else{
    console.log("no user");
  }

})
app.use(express.static(path.join(__dirname, '../Frontend/Web/learn-react/build')));

app.get('/home', (req, res) => {
  const filePath = path.join(__dirname, '../Frontend/Web/learn-react/public/index.html');
  res.sendFile(filePath);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/Web/learn-react/src/index.js'));
});

app.listen(port, () => {
  getHospitalData();
  console.log(`Server running on port ${port}`);
});

