// Import the Firebase SDK and initialize your app
const firebase = require('firebase/app');
require('firebase/firestore');


const firebaseConfig = {
  apiKey: 'AIzaSyADwW3N6qrFVVAtpGCbhjETuFVTdYyei-o',
  authDomain: 'medzairapp.firebaseapp.com',
  projectId: 'medzairapp',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();


function fetchMedecinData() {
  db.collection('medecin')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Access each document's data
        const medecinData = doc.data();
        console.log(medecinData);
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
}
function addMedecinData(medecinData) {
  db.collection('medecin')
    .add(medecinData)
    .then((docRef) => {
      console.log('Medecin added with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding medecin: ', error);
    });
}



// Call the function to execute the code
module.exports = {
  fetchMedecinData,addMedecinData
}
