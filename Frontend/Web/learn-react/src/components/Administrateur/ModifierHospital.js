import React, { useEffect, useState } from 'react'
import "../../css/ModifyHospital.css";
import axios from 'axios';

export default function ModifierHospital() {
    const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState(null);
  const [newRegion, setNewRegion] = useState("");

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3002/getHospitalDataByEmail?email=${email}`)
        .then((response) => {
          setHospital(response.data);
        })
        .catch((error) => {
          console.error("Error fetching hospital data:", error);
        });
    }
  }, [email]);
    const handleModify = async (e) => {
        e.preventDefault();
    
        const formData = {
          region: newRegion,
        };
    
        try {
          await axios.post(`http://localhost:3002/modifyHospitalByEmail?email=${email}`, formData);
          console.log("Hospital modified successfully!");
        } catch (error) {
          console.error("Error modifying hospital:", error);
        }
      };
    return (
    <div className="modify-hospital-container">
    <h2>Modify Hospital</h2>
    <form className="modify-hospital-form" onSubmit={handleModify}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
        </div>
      )}
      <button type="submit" disabled={!hospital}>
        Modify Hospital
      </button>
    </form>
  </div>
  )
}


