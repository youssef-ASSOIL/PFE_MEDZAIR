const express = require('express');
const app = express();
const { fetchMedecinData, addMedecinData } = require('./Models/Hospital.js');

const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");

// Example usage: Add a medecin to the collection
const medecinData = {
  name: 'Dr. John Doe',
  specialization: 'Cardiology',
  address: '123 Main Street',
};

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  // databaseURL: 'https://medzairapp-default-rtdb.europe-west1.firebasedatabase.app/'
});
const db = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Port = process.env.Port || 8080;
app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
  fetchMedecinData();
  addMedecinData(medecinData);
});
