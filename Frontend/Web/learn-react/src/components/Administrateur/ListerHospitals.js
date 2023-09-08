import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import "../../css/ListerHospital.css"
import SideBar2 from './SideBar2';
import axios from 'axios';
import Navbar2 from '../NavBar2';

export default function ListerHospitals() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.post('http://localhost:3002/getHospitals');
        if (response.status === 200) {
          const hospitalsData = response.data;
          setHospitals(hospitalsData);
          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };
    fetchHospitals();
  }, []);

  const toggle = () => setToggleBtn((val) => !val);
  return (
    <div>
      <Navbar2 setToggle={toggle} />
      <SideBar2 toggleBtn={toggleBtn} />
      <TableContainer component={Paper} className="TableContainer">
        <Table>
          <TableHead className="TableHead">
            <TableRow>
              <TableCell className="TableCell">Email</TableCell>
              <TableCell className="TableCell">Image Path</TableCell>
              <TableCell className="TableCell">Name</TableCell>
              <TableCell className="TableCell">Region</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="TableBody">
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="TableCell">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              hospitals.map((hospital, index) => (
                <TableRow key={index}>
                  <TableCell className="TableCell">{hospital.email || 'N/A'}</TableCell>
                  <TableCell className="TableCell">
                    {hospital.imagePath ? (
                      <Avatar alt={hospital.name || 'N/A'} src={hospital.imagePath} className="Avatar" />
                    ) : (
                      <span className="N/A">N/A</span>
                    )}
                  </TableCell>

                  <TableCell className="TableCell">{hospital.name || 'N/A'}</TableCell>
                  <TableCell className="TableCell">{hospital.region || 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
