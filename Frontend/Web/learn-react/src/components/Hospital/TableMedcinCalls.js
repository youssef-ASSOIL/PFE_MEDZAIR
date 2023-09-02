import React, { useState, useEffect } from "react";
import "../../css/TableMedcinCall.css";
import Sidebar from "./Barside";
import Navbar2 from "../NavBar2";
import Navbar from "../Navbar";
import Dashboard from "./Dashboard";

const TableMedcinCalls = () => {
  const [medecinData, setMedecinData] = useState([]);
  

  useEffect(() => {
    fetch("/getMedecinData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the fetched data
        setMedecinData(data);
      })
      .catch((error) =>
        console.error("Error fetching medecin data:", error)
      );
  }, []);

  const [toggleBtn, setToggleBtn] = useState(true);

  const toggle = () => setToggleBtn((val) => !val);

  return (
    <div className="With-Dashboard">
        <Navbar2 setToggle={toggle} /> 

      <Sidebar toggleBtn={toggleBtn} />
      <div className="allTable">
        <h1>Medcin Calls Table</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Speciality</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medecinData.map((row) => (
              <tr key={row.id}>
                <td className="tooltip" data-tooltip={row.id}>
                  {row.id.substring(0, 10)}...
                </td>
                <td>
                  <img src={row.img} alt="Profile" className="image" />
                </td>
                <td>{row.name}</td>
                <td>{row.lastname}</td>
                <td>{row.speciality}</td>
                <td className={row.status}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <Dashboard/>
    </div>
  );
};

export default TableMedcinCalls;
