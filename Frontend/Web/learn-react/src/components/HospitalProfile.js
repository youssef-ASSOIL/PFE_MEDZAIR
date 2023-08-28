import axios from "axios";
import { useEffect, useState } from "react";
import "../css/HospitalProfile.css";
import Navbar2 from "./NavBar2";
import Sidebar from "./Barside";

export default function HospitalProfile() {
  const [HospitalData, setHospitalData] = useState([]);

  useEffect(async () => {
    await axios.post("/getHospitalDataByEmail")
      .then((response) => {
        //console.log("REDA 3AWTANI :" + data);
        setHospitalData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching medecin data:", error)
      );
  }, []);

  
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn((val) => !val);

  
  return (
    <div className="hospital-profile-container">
      <Navbar2 setToggle={toggle} /> 
      <Sidebar toggleBtn={toggleBtn} />
      <h2>Hospital Profiles</h2>
          <div className="info-item">
              <img src={HospitalData.img} alt={`Image of ${HospitalData.name}`} />
          </div>
          <div className="info-item">
              <strong>Name:</strong> {HospitalData.name}
            </div>
            <div className="info-item">
              <strong>Region:</strong> {HospitalData.region}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {HospitalData.email}
            </div>
            <div className="info-item">
              <strong>Identifier:</strong> {HospitalData.id}
            </div>
            
    </div>
  );
}
