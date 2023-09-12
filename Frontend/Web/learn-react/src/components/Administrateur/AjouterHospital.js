import React, { useState } from 'react'
import "../../css/AjouterHopital.css"
import axios from 'axios';
import SideBar2 from './SideBar2';
import Navbar2 from '../NavBar2';


export default function AjouterHospital() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); 
  const [password, setPassword] = useState("");

  const [imagePath, setImagePath] = useState("");
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default behavior of the form

  const jsonData = buildJSONData(); // Call the function to get JSON data
  console.log("Kettani", jsonData);

  try {
    // Send a post request to the backend with the JSON data
    const response = await fetch("http://localhost:3002/addHospital", {
      method: "POST",
      body: JSON.stringify(jsonData), // Stringify the JSON data before sending it
      headers: {
        "Content-Type": "application/json", // Set the content-type header to application/json
      },
    });
    const data = await response.json(); // Parse the response data as JSON
    console.log("Hospital added successfully!", data);
  } catch (error) {
    console.error("Error adding hospital:", error);
  }
      
  };
  const buildJSONData = () => {
    const jsonData = {
      name: name,
      region: region,
      email: email,
      imagePath: imagePath,
      password: password,
    };
    return jsonData;
  };
  
  
  const toggle = () => setToggleBtn((val) => !val);
  return (
    <div>
      <Navbar2 setToggle={toggle} />
        <SideBar2 toggleBtn={toggleBtn}/>
    <div className="add-hospital-container">
    <h2>Ajouter Hospital</h2>
    <form className="add-hospital-form" onSubmit={handleSubmit}>
        <div>
          <label>Nom Hospital:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Region:</label>
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          <input  type="text" value={imagePath} onChange={(e) => setImagePath(e.target.value)} />
       
        </div>
        <div>
          <label>Mot de pass:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Add Hospital</button>
      </form>
    </div>
    </div>
  )
}
