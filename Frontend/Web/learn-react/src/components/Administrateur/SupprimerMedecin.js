import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/SupprimerMedecin.css"; // Import the CSS file
import SideBar2 from "./SideBar2";

const SupprimerMedecin = () => {
  
  const [rpps, setRpps] = useState("");
  const [medecin, setMedecin] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(true);

  
  const handleSearch = () => {
    // Replace this with your express server URL
   
    axios.post("http://localhost:3002/searchMedecin", { rpps: rpps }) // Use axios.get()
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setMedecin(null); // Clear Medecin data if not found
          setDeleteError(data.error);
        } else {
          const medecin = data.data; // Access the actual data object

          
          setMedecin(medecin[0]);
          setDeleteError(null);
  
        }
      })
      .catch((error) => {
        console.error("Error fetching medecin:", error);
        setDeleteError(error);
      });
  };

  const handleDelete = async () => {
    try {
      if (medecin) {
        // Send a DELETE request to delete the Medecin by ID
        const response = await axios.delete("/deleteMedecin", { data: { id: medecin.id } });
        if (response.status === 200) {
          setMedecin(null);
          setDeleteSuccess(true);
        }
      }
    } catch (error) {
      console.error("Error deleting Medecin:", error);
      setDeleteError("Failed to delete Medecin");
    }
  };

  return (
    <div>
      <SideBar2 toggleBtn={toggleBtn} />
      <div className="delete-medecin-container">
        <h2>Delete Doctor (Medecin)</h2>
        <form className="delete-medecin-form">
          <div>
            <label>RPPS:</label>
            <input type="text" value={rpps} onChange={(e) => setRpps(e.target.value)} />
            <button type="button" onClick={handleSearch}>
              Search Doctor
            </button>
          </div>
          {medecin && (
            <div className="medecin-details">
              <h3>Doctor Details:</h3>
              <p>First Name: {medecin.firstName}</p>
              <p>Speciality: {medecin.speciality}</p>
              <p>RPPS: {medecin.rpps}</p>
            </div>
          )}
          {medecin && (
            <div className="confirm-delete">
              <label>
                Are you sure you want to delete this doctor? This action cannot be undone.
              </label>
              <input
                type="checkbox"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
              />
            </div>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={!medecin || !confirmDelete}
          >
            Delete Doctor
          </button>
          {deleteSuccess && (
            <p className="delete-success">Doctor deleted successfully!</p>
          )}
          {deleteError && <p className="delete-error">{deleteError}</p>}
        </form>
      </div>
    </div>
  );
};

export default SupprimerMedecin;
