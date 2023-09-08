import React, { useEffect, useState } from 'react'
import "../../css/ModifyHospital.css";
import axios from 'axios';
import SideBar2 from './SideBar2';
import Navbar2 from '../NavBar2';

export default function ModifierHospital() {
    const [email, setEmail] = useState("");
    const [hospital, setHospital] = useState(null);
    const [newRegion, setNewRegion] = useState("");
    const [toggleBtn, setToggleBtn] = useState(true);
    const [newImagePath, setnewImagePath] = useState("");
    const [newName, setnewName] = useState("");
    const [Id, setId] = useState("");
    
    const handleSearch = () => {
      // Replace this with your express server URL
     
      axios.post("http://localhost:3002/getHospitalDataByEmail", { email: email }) // Use axios.get()
        .then((response) => {
          const data = response.data;
          console.log(data.data[0]);
            setHospital(data.data[0]);
            setEmail(data.data[0].email);
            setId(data.data[0].id);
        })
        .catch((error) => {
          console.error("Error fetching medecin:", error);
          
        });
    };
  
    const handleModify = async (e) => {
      e.preventDefault();
  
      if (!hospital) {
        console.error("Hospital data not loaded.");
        return;
      }
  
      const formData = {
        id:Id,
        region: newRegion,
        email: email,
        name:newName,
        imagePath:newImagePath,
      };
      console.log(newRegion);
      console.log(newName);
      console.log(newImagePath);
      
  
      try {
        // Modify hospital's region using email as identifier
        await axios.post("http://localhost:3002/modifyHospitalByEmail", {data:formData});
  
        console.log("Hospital modified successfully!");
      } catch (error) {
        console.error("Error modifying hospital:", error);
      }
    };

  const toggle = () => setToggleBtn((val) => !val);
    return (
        <div>
          <Navbar2 setToggle={toggle} />
     <SideBar2 toggleBtn={toggleBtn}/>
    <div className="modify-hospital-container">
    <h2>Modify Hospital</h2>
    <form className="modify-hospital-form" onSubmit={handleModify}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="button" onClick={handleSearch}>
              Search Doctor
        </button>
      </div>
      {hospital && (
        <div className="hospital-details">
          <h3>Hospital Details:</h3>
          <p>Name: {hospital.name}</p>
          <p>Region: {hospital.region}</p>
          <p>Email: {hospital.email}</p>
          {/* Display other hospital details */}
        </div>
      )}
      {hospital && (
        <div className="modify-region">
          <label>New Region:</label>
          <input type="text" value={newRegion} onChange={(e) => setNewRegion(e.target.value)} />
          <label>imagePath:</label>
          <input type="text" value={newImagePath} onChange={(e) => setnewImagePath(e.target.value)} />
          <label>New Name:</label>
          <input type="text" value={newName} onChange={(e) => setnewName(e.target.value)} />
          
        </div>
        
      )}
      <button type="submit" disabled={!hospital}>
        Modify Hospital
      </button>
    </form>
  </div>
  </div>
  )
}


