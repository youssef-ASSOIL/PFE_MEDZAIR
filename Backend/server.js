const express= require('express');
const app = express();

const admin= require("firebase-admin");
const credentials= require("./serviceAccountKey.json");


admin.initializeApp({
    credential: admin.credential.cert(credentials),
   // databaseURL: 'https://medzairapp-default-rtdb.europe-west1.firebasedatabase.app/'
  });
  
app.post('/create', async(req, res) => {
    try{
        const id=req.params.id;
        const UserJson ={
            email:req.body.email,
            nom:req.body.nom,
            prenom:req.body.prenom,
        };
        const UserRef=db.collection("Medecin").doc(id).set(UserJson);
        res.send(express.response);
    }
    catch(error){
        res.send(error);
    }
})
  const db= admin.firestore();
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  const Port=process.env.Port || 8080;
  app.listen(Port,()=>{
    console.log(`listening on port ${Port}`);
  })