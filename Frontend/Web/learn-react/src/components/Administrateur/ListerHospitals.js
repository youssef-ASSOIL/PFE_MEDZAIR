import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import "../../css/ListerHospital.css"
import SideBar2 from './SideBar2';

const columns = [
  { id: 'email', label: 'Email' },
  { id: 'imagePath', label: 'Image Path' },
  { id: 'name', label: 'Name' },
  { id: 'region', label: 'Region' },
];

function createData(email, imagePath, name, region) {
  return { email, imagePath, name, region };
}


 const doctors = [
    {
      email: "example1@email.com",
      image: "https://media.licdn.com/dms/image/D4E03AQGRhUj6l8vfBg/profile-displayphoto-shrink_800_800/0/1665924231705?e=2147483647&v=beta&t=5h4furBSItPLL7Rlubqh_H8ZiLpIKnqBy_p3fNd3ehs",
      hospital: "Hospital A",
      region: "Region X",
    },
    {
        email: "example1@email.com",
        image: "https://media.licdn.com/dms/image/C5603AQFmm8_egAcZpA/profile-displayphoto-shrink_200_200/0/1641904982500?e=1697673600&v=beta&t=TTrnnIEURMiSBvg-JSsqRl3m4wdhZx0hL8KtC7PTn3A",
        hospital: "KETTANI Clinique",
        region: "Region X",
      },
    // Add more doctor objects as needed
  ];

export default function ListerHospitals() {
    const [toggleBtn, setToggleBtn] = useState(true);
  
  return (
    <div>
        <SideBar2 toggleBtn={toggleBtn}/>
    <TableContainer component={Paper} className="TableContainer">
      <Table>
        <TableHead className="TableHead">
          <TableRow>
            
            <TableCell className="TableCell">Email</TableCell>
            <TableCell className="TableCell">Image</TableCell>
            <TableCell className="TableCell">Hospital</TableCell>
            <TableCell className="TableCell">Region</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="TableBody">
          {doctors.map((doctor, index) => (
            <TableRow key={index}>
              <TableCell className="TableCell">{doctor.hospital}</TableCell>
              <TableCell className="TableCell">{doctor.email}</TableCell>
              <TableCell className="TableCell">
                <Avatar alt={doctor.name} src={doctor.image} className="Avatar" />
              </TableCell>
              <TableCell className="TableCell">{doctor.region}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
