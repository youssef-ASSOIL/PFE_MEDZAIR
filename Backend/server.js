
const express = require("express");
const path = require("path");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where } = require("firebase/firestore");
const DemandeMedcinB = require("./Business/DemandeMedecinB");
const AdminBusiness = require("./Business/AdminBusiness");

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
const medecinCol = collection(db, "Medecin");
const DemandemedecinCol = collection(db, "DemandeMedcin");

const SearchHospitalByMail = async (mail) => {
  try {
    const snapshot = await getDocs(hospitalCol);
    let foundData = null;

    snapshot.forEach((doc) => {
      if (doc.data().email === mail) {
        foundData = doc.data();
      }
    });

    return foundData;
  } catch (error) {
    console.error("Error fetching hospital data:", error);
  }
};


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
    .then(async (userCredential) => {
      console.log(userCredential);
      data = await SearchHospitalByMail(email);
      user=email;
      console.log("Youssef "+user);
      res.status(200).json({ message: "Sign-in successful" ,data: data });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error: "Invalid credentials" });
    });
});

// app.post("/addHospital", async (req, res) => {
//   const formData = req.body;
//   try {
//     const hospitalColRef = collection(db, "Hospital");
//     await addDoc(hospitalColRef, formData);
//     console.log("Hospital added successfully!");
//     res.status(200).json({ message: "Hospital added successfully!" });
//   } catch (error) {
//     console.error("Error adding hospital:", error);
//     res.status(500).json({ error: "Failed to add hospital" });
//   }
// });
app.post("/addHospital", async (req, res) => {
  const formData = req.body;
  try {
    GestionHospital.AjouterHospital(formData);
    console.log("Hospital added successfully!");
    res.status(200).json({ message: "Hospital added successfully!" });
  } catch (error) {
    console.error("Error adding hospital:", error);
    res.status(500).json({ error: "Failed to add hospital" });
  }
});

app.get("/getDemandeMedcinData", async (req, res) => {
  try {
    const snapshot = await getDocs(DemandemedecinCol);
    const medcinData = [];
    
    snapshot.forEach((doc) => {
      const medcinEntry = doc.data();
      medcinData.push({
        date: medcinEntry.date,
        region: medcinEntry.region,
        speciality: medcinEntry.speciality,
      });
    });
    
    res.status(200).json(medcinData);
  } catch (error) {
    console.error("Error sending medcin data:", error);
    res.status(500).json({ error: "Failed to get medcin data" });
  }
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

app.post("/submitFormDemandeData", async (req, res) => {
  try {
    const formData = req.body;
    console.log("Received form data:", formData);
    DemandeMedcinB.addDemandeMedcinB(formData);
    console.log("Data added to Firestore successfully!");
    res.status(200).json({ message: "Data added to Firestore successfully!" });
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
    res.status(500).json({ error: "Failed to add data to Firestore" });
  }
});

app.post("/getHospitalDataByEmail", async (req, res) =>{

  try {
    const snapshot = await getDocs(hospitalCol);
    let foundData ={};

    snapshot.forEach((doc) => {
      if (doc.data().email === user) {
        foundData = {
          id: doc.id,
          name: doc.data().name,
          region: doc.data().region,
          email: doc.data().email,
          img: doc.data().imagePath || '',
        };
      }
    });
    console.log(foundData);
    res.status(200).json(foundData);
   
  } catch (error) {
    console.error("Error fetching hospital data:", error);
    
  }
});


onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in");
  } else {
    console.log("no user");
  }
});

const getMedecinData = async () => {
  try {
    const snapshot = await getDocs(medecinCol);
    const data = [];
    snapshot.forEach((doc) => {
      const medecinData = doc.data();
      data.push({
        id: doc.id,
        name: medecinData.name || '', // Ensure these fields exist and provide a default value if they are missing
        lastname: medecinData.lastname || '', // Use the correct field names and provide default values if needed
        speciality: medecinData.speciality || '', // Use the correct field name
        img: medecinData.imagePath || '',
        date: new Date().toDateString(),
        amount: 0,
        method: "N/A",
        status: "N/A",
      });
    });
    return data;
  } catch (error) {
    console.error("Error fetching medecin data:", error);
    return [];
  }
};



app.get("/getMedecinData", async (req, res) => {
  try {
    const medecinData = await getMedecinData();
    res.status(200).json(medecinData);
  } catch (error) {
    console.error("Error sending medecin data:", error);
    res.status(500).json({ error: "Failed to get medecin data" });
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
  
  console.log(`Server running on port ${port}`);
});


// Add routing for DemandeMedcinB
app.post("/addDemandeMedcinB", (req, res) => {
  const demandeMedcinBData = req.body;
  DemandeMedcinB.addDemandeMedcinB(demandeMedcinBData);
  res.status(200).json({ message: "DemandeMedcinB added successfully!" });
});

app.delete("/deleteDemandeMedcinB/:id", (req, res) => {
  const demandeMedcinBId = req.params.id;
  DemandeMedcinB.deleteDemandeMedecin(demandeMedcinBId);
  res.status(200).json({ message: "DemandeMedcinB deleted successfully!" });
});

app.get("/getAllDemandeMedcinBs", (req, res) => {
  const allDemandeMedcinBs = DemandeMedcinB.loadAllDemandeMedcinBs();
  res.status(200).json(allDemandeMedcinBs);
});


app.delete("/deleteHospital/:email", (req, res) => {
  const email = req.params.email;
  GestionHospital.SupprimerHospital(email);
  res.status(200).json({ message: "Hospital deleted successfully!" });
});

app.put("/updateHospital/:email", (req, res) => {
  const email = req.params.email;
  const { newName, newImagePath, newData, newRegion } = req.body;
  GestionHospital.ModifierHospital(email, newName, newImagePath, newData, newRegion);
  res.status(200).json({ message: "Hospital updated successfully!" });
});

app.get("/getAllHospitals", (req, res) => {
  const allHospitals = GestionHospital.loadAllHospitals();
  res.status(200).json(allHospitals);
});

// Add routing for GestionMedecin
app.post("/addMedecin", (req, res) => {
  const medecinData = req.body;
  GestionMedecin.AjouterMedecin(medecinData);
  res.status(200).json({ message: "Medecin added successfully!" });
});

app.delete("/deleteMedecin/:email", (req, res) => {
  const email = req.params.email;
  GestionMedecin.SupprimerMedecin(email);
  res.status(200).json({ message: "Medecin deleted successfully!" });
});



app.get("/getAllMedecins", (req, res) => {
  const allMedecins = GestionHospital.loadAllMedecin();
  res.status(200).json(allMedecins);
});
app.post("/SignInAdmin", (req, res) => {

    const admin = AdminBusiness.CheckLogin();
    res.status(200).json({result:admin});
});