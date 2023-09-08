import React, { useState, useEffect } from 'react';
import "../../css/ListerMedecins.css";
import SideBar2 from './SideBar2';
import axios from 'axios';
import Navbar2 from '../NavBar2';

export default function ListerMedcin() {
  const [medecinData, setMedecinData] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  

  useEffect(() => {
    const fetchMedecins= async () => {
      try {
        const response = await axios.post('http://localhost:3002/getMedecins');
        if (response.status === 200) {
          const medecinData = response.data;
          setMedecinData(medecinData.data);
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };
    fetchMedecins();
  }, []);

  
  const toggle = () => setToggleBtn((val) => !val);
  return (
    
    <div>
      <Navbar2 setToggle={toggle} />
        <SideBar2 toggleBtn={toggleBtn}/>
        
    <div className="allTable">
      <h1>Medcin Calls Table</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Speciality</th>
              
              <th>Birthday</th>
              <th>Email</th>
              <th>Phone</th>
              <th>RPPS</th>
            </tr>
          </thead>
          <tbody>
            {medecinData.map((row) => (
              <tr key={row.id}>
                <td className="tooltip" data-tooltip={row.id}>
                  {row.id.substring(0, 10)}
                </td>
                <td>
                  <img
                    src={row.imagePath}
                    alt="Profile"
                    className="image"
                    onError={(e) => {
                      e.target.src = '/path/to/default-image.jpg'; // Replace with a default image URL
                    }}
                  />
                </td>
                <td>{row.name}</td>
                <td>{row.lastname}</td>
                <td>{row.speciality}</td>
               <td>{row.birthday}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.rpps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
    </div>
   
  );
}
