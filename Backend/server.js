
const express = require("express");
const path = require("path");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where } = require("firebase/firestore");
const DemandeMedcinB = require("./Business/DemandeMedecinB");
const AdminBusiness = require("./Business/AdminBusiness");
const GestionMedecin = require("./Business/GestionMedecins");
const GestionHospital = require("./Business/GestionHospitals");

const app = express();
const port = 3002;
let user="";
let region ="";

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
      region=data.region;
      console.log("Youssef "+region);
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
  app.use(express.json()); // Use express.json() middleware

  const jsonData = req.body; // Now you can access the JSON data from the request body

  try {
    console.log("Hamza:", jsonData);
    GestionHospital.AjouterHospital(jsonData); // Call the function to add the hospital to the database
    console.log("Hospital added successfully!");
    res.status(200).json({ message: "Hospital added successfully!" }); // Send a success response
  } catch (error) {
    console.error("Error adding hospital:", error);
    res.status(500).json({ error: "Failed to add hospital" }); // Send an error response
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
    
    formData.DemandeBy = user;

    formData.region = region;
    DemandeMedcinB.addDemandeMedcinB(formData);
    console.log("Data added to Firestore successfully!");
    res.status(200).json({ message: "Data added to Firestore successfully!" });
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
    res.status(500).json({ error: "Failed to add data to Firestore" });
  }
});


app.post("/loadAcceptedMedecinWithEmail", async (req, res) => {
  try {
    const email = user; // Assuming 'user' is defined elsewhere in your code
    
    const acceptedData = await GestionHospital.loadAcceptedMedecinWithEmail(email); // Make sure to use 'await' here
    hospitalString = JSON.stringify(acceptedData);
    console.log("HELEOLO::"+hospitalString);
    res.status(200).json({ message: "DATA IS HERE!", data: hospitalString });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
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
app.post("/addMedecin", async (req, res) => {
  try{
    
    const medecinData = req.body;
    
    GestionMedecin.AjouterMedecin(medecinData);
    res.status(200).json({ message: "Medecin added successfully!" , data: medecinData});
    
  }catch(error){
    console.error("Error adding Medecin:", error);
    res.status(500).json({ error: "Failed to add Medecin" });
  }
  
});
// Route to search for a Medecin by ID
app.post("/searchMedecin", async (req, res) => {
  try {
    const medecinRpps = req.body.rpps;
    // Assuming you have a function to search for a Medecin by ID in GestionMedecin.
    const medecin = await GestionMedecin.searchMedecinByRpps(medecinRpps); // Implement this function.
  
    if (!medecin) {

      res.status(404).json({ error: "Medecin not found" });
    } else {
      res.status(200).json({ message: "Medecin found", data: medecin });
    }
  } catch (error) {
    console.error("Error searching for Medecin:", error);
    res.status(500).json({ error: "Failed to search for Medecin" });
  }
});

app.post("/getHospitalDataByEmail", async (req, res) =>{

  try {
    
    const mail= req.body.email;

    const hospital = await GestionHospital.SearchHospitalByMail(mail); // Implement this function.
    res.status(200).json({ message: "hospital found", data: hospital });
   
  } catch (error) {
    console.error("Error fetching hospital data:", error);
    
  }
});
app.post("/getHospitalDataByUserMail", async (req, res) => {

  try { 
    const email=user;
    const hospital = await GestionHospital.SearchbyUserMail(email); // Implement this function.
   const dataJson= JSON.stringify(hospital);
    console.log("Amine :: " + dataJson);
    res.status(200).json({ message: "hospital found", data: dataJson });

  } catch (error) {
    console.error("Error fetching hospital data:", error);

  }
});

// app.post("/getHospitalDataByUserMail", async (req, res) =>{

//   try {
    
//     const hospital = await GestionHospital.SearchHospitalByMail(user); // Implement this function.
//     console.log("Amine :: "+hospital);
//     res.status(200).json({ message: "hospital found", data: hospital });
   
//   } catch (error) {
//     console.error("Error fetching hospital data:", error);
    
//   }
// });

app.post("/modifyMedecin", async (req, res) => {
  try {
    // Extract the necessary data from the request body.
    const medecin = req.body;

    const medecinString = JSON.stringify(medecin);
    // Call the business logic function to modify the Medecin.
    GestionMedecin.modifierMedecin(medecinString);

    res.status(200).json({ message: "Medecin modified successfully" });
  } catch (error) {
    console.error("Error modifying Medecin:", error);
    res.status(500).json({ error: "Failed to modify Medecin" });
  }
});

app.post("/modifyHospitalByEmail", async (req, res) => {
    try {
      // Extract the necessary data from the request body.
      const hospital = req.body.data;

      const hospitalString = JSON.stringify(hospital);
      console.log(hospitalString);
      // Call the business logic function to modify the Medecin.
      GestionHospital.ModifierHospital(hospitalString);

      res.status(200).json({ message: "Medecin modified successfully" });
    } catch (error) {
      console.error("Error modifying Medecin:", error);
      res.status(500).json({ error: "Failed to modify Medecin" });
    }
});

app.post("/getMedecins", async (req, res) => {
  try {
    // Call the business logic function to fetch Medecins.
    const medecins = await GestionMedecin.loadAllMedecin(); // Implement this function.
    console.log(medecins);
    res.status(200).json({ message: "Medecins fetched successfully", data: medecins });
  } catch (error) {
    console.error("Error fetching Medecins:", error);
    res.status(500).json({ error: "Failed to fetch Medecins" });
  }
});
app.post("/getHospitals", async (req, res) => {
  try {
    const hospitals = await GestionHospital.loadAllHospitals();
    console.log(hospitals);
    res.status(200).json(hospitals); // Send JSON response
  } catch (error) {
    console.error("Error fetching Hospitals:", error);
    res.status(500).json({ error: "Failed to fetch Hospitals" });
  }
});

// Route to delete a Medecin by ID
app.delete("/deleteMedecin", async (req, res) => {
  try {
    const medecinId = req.body.id; // Get the Medecin ID from the request body.

    // Assuming you have a function to delete a Medecin by ID in GestionMedecin.
    await GestionMedecin.SupprimerMedecin(medecinId);

    res.status(200).json({ message: "Medecin deleted successfully" });
  } catch (error) {
    console.error("Error deleting Medecin:", error);
    res.status(500).json({ error: "Failed to delete Medecin" });
  }
});
app.delete("/deleteHospital", async (req, res) => {
  try {
    const hospitalId = req.body.id; // Get the Medecin ID from the request body.

    await GestionHospital.SupprimerHospital(hospitalId);
    res.status(200).json({ message: "Medecin deleted successfully" });
  } catch (error) {
    console.error("Error deleting Medecin:", error);
    res.status(500).json({ error: "Failed to delete Medecin" });
  }
});


app.get("/getAllMedecins", (req, res) => {
  const allMedecins = GestionHospital.loadAllMedecin();
  res.status(200).json(allMedecins);
});
app.post("/SignInAdmin", (req, res) => {

    const admin = AdminBusiness.CheckLogin();
    res.status(200).json({result:admin});
});