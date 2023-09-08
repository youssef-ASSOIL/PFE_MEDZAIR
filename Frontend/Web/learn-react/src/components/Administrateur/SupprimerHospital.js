import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/SupprimerHospital.css"; // Import the CSS file
import SideBar2 from "./SideBar2";
import Navbar2 from "../NavBar2";
const SupprimerHospital = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [hospital, setHospital] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(true);
  
  const handleSearch = () => {
    // Replace this with your express server URL
   
    axios.post("http://localhost:3002/getHospitalDataByEmail", { email: email }) // Use axios.get()
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setHospital(null); // Clear Medecin data if not found
          console.log(data.error);
        } 

        console.log(data.data[0]);
          setHospital(data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching Hospital:", error);
        
      });
  };
  

  const handleDelete = async () => {
    try {
      if (hospital) {
        // Send a DELETE request to delete the Medecin by ID
        console.log(hospital.id);
        const response = await axios.delete("/deleteHospital", { data: { id: hospital.id } });
        if (response.status === 200) {
          setHospital(null);
          setConfirmDelete(true);
        }
      }
    } catch (error) {
      console.error("Error deleting Medecin:", error);
    }
  };
  
  const toggle = () => setToggleBtn((val) => !val);

  return (
    <div>
      <Navbar2 setToggle={toggle} />
        <SideBar2 toggleBtn={toggleBtn}/>
    <div className="delete-hospital-container">
      <h2>Delete Hospital</h2>
      <form className="delete-hospital-form">
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button" onClick={handleSearch}>
              Search Hospital
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
          <div className="confirm-delete">
            <label>
              Are you sure you want to delete this hospital? This action cannot be undone.
            </label>
            <input
              type="checkbox"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
          </div>
        )}
        <button type="button" onClick={handleDelete} disabled={!hospital || !confirmDelete}>
          Delete Hospital
        </button>
      </form>
    </div>
    </div>
  );
};

export default SupprimerHospital;
