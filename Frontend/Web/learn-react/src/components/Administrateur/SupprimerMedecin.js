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
  
  useEffect(() => {
    if (rpps) {
      axios
        .get(`http://localhost:3002/getMedecinDataByRPPS?rpps=${rpps}`)
        .then((response) => {
          setMedecin(response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctor data:", error);
        });
    }
  }, [rpps]);

  const handleDelete = async () => {
    if (medecin && confirmDelete) {
      try {
        await axios.post(`http://localhost:3002/deleteMedecinByRPPS?rpps=${rpps}`);
        setDeleteSuccess(true);
        setDeleteError(null);
        setMedecin(null);
      } catch (error) {
        console.error("Error deleting doctor:", error);
        setDeleteError("Error deleting doctor. Please try again.");
        setDeleteSuccess(false);
      }
    }
  };

  return (
    <div>
        <SideBar2 toggleBtn={toggleBtn}/>
    <div className="delete-medecin-container">
      <h2>Delete Doctor (Medecin)</h2>
      <form className="delete-medecin-form">
        <div>
          <label>RPPS:</label>
          <input type="text" value={rpps} onChange={(e) => setRpps(e.target.value)} />
        </div>
        {medecin && (
          <div className="medecin-details">
            <h3>Doctor Details:</h3>
            <p>Name: {medecin.name}</p>
            <p>Specialty: {medecin.specialty}</p>
            <p>RPPS: {medecin.rpps}</p>
            {/* Display other doctor details */}
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
        {deleteSuccess && <p className="delete-success">Doctor deleted successfully!</p>}
        {deleteError && <p className="delete-error">{deleteError}</p>}
      </form>
    </div>
    </div>
  );
};

export default SupprimerMedecin;
