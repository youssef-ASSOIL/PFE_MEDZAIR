import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/SupprimerHospital.css"; // Import the CSS file

const SupprimerHospital = () => {
  const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const handleDelete = async () => {
    if (hospital && confirmDelete) {
      try {
        await axios.post(`http://localhost:3002/deleteHospitalByEmail?email=${email}`);
        console.log("Hospital deleted successfully!");
      } catch (error) {
        console.error("Error deleting hospital:", error);
      }
    }
  };

  return (
    <div className="delete-hospital-container">
      <h2>Delete Hospital</h2>
      <form className="delete-hospital-form">
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
  );
};

export default SupprimerHospital;
