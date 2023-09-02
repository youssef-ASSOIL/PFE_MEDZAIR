import React, { useState, useEffect } from 'react';
import "../../css/ListerMedecins.css";
import SideBar2 from './SideBar2';

export default function ListerMedcin() {
  const [medecinData, setMedecinData] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  
  // Assuming you fetch or set your medecinData using useEffect
  useEffect(() => {
    // Replace this with actual data fetching or setting logic
    const fetchedData = [
      {
        id: '1',
        image: 'image_url_1',
        name: 'John',
        lastname: 'Doe',
        speciality: 'Cardiologist',
      
        birthday: '1990-01-01',
        email: 'john.doe@example.com',
        imagePath: '/path/to/image1.jpg',
        phone: '123-456-7890',
        rpps: '1234567890',
      },
      {
        id: '2',
        image: 'image_url_1',
        name: 'John',
        lastname: 'Doe',
        speciality: 'Cardiologist',
       
        birthday: '1990-01-01',
        email: 'john.doe@example.com',
        imagePath: '/path/to/image1.jpg',
        phone: '123-456-7890',
        rpps: '1234567890',
      },
      {
        id: '2',
        image: 'image_url_1',
        name: 'John',
        lastname: 'Doe',
        speciality: 'Cardiologist',
       
        birthday: '1990-01-01',
        email: 'john.doe@example.com',
        imagePath: '/path/to/image1.jpg',
        phone: '123-456-7890',
        rpps: '1234567890',
      },
      // Add more medecin objects as needed
    ];
    setMedecinData(fetchedData);
  }, []);

  return (
    <div>
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
                  <img src={row.image} alt="Profile" className="image" />
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
