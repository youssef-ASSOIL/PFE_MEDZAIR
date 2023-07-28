

const express = require("express");
const path = require("path");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where } = require("firebase/firestore");

const app = express();
const port = 3002;

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

const validateSignInCredentials = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password must be provided" });
  }

  next();
};

app.post("/signIn", validateSignInCredentials, (req, res) => {
  const { email, password } = req.body;

  // Implement your sign-in logic here using Firebase
  // (You should initialize Firebase auth at the beginning of server.js)

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      res.status(200).json({ message: "Sign-in successful" });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error: "Invalid credentials" });
    });
});

app.post("/submitFormData", async (req, res) => {
  try {
    const formData = req.body;
    console.log("Received form data:", formData);
    await addDoc(hospitalCol, formData);
    console.log("Data added to Firestore successfully!");
    res.status(200).json({ message: "Data added to Firestore successfully!" });
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
    res.status(500).json({ error: "Failed to add data to Firestore" });
  }
});

const getHospitalData = async () => {
  try {
    const snapshot = await getDocs(hospitalCol);
    snapshot.forEach((doc) => {
      console.log("Hospital ID: ", doc.id);
      console.log("Hospital Data: ", doc.data());
    });
  } catch (error) {
    console.error("Error fetching hospital data:", error);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in");
  } else {
    console.log("no user");
  }
});

const frontendBuildPath = path.join(__dirname, "../Frontend/Web/learn-react/build");
app.use(express.static(frontendBuildPath));

app.get("/home", (req, res) => {
  const filePath = path.join(__dirname, "../Frontend/Web/learn-react/public/index.html");
  res.sendFile(filePath);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/Web/learn-react/src/index.js"));
});

app.listen(port, () => {
  getHospitalData();
  console.log(`Server running on port ${port}`);
});
