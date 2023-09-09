// MedecinCalendar.js

import React, { useEffect, useState } from 'react';
import Sidebar from './Barside';
import { Grid, Paper, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/MedecinCalendar.css';
import Navbar2 from '../NavBar2';
import axios from 'axios';


export default function MedecinCalendar() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [HospitalData, setHospitalData] = useState({});
  const [parsedData, setParsedData] = useState([]);
  
  
    const fetchData = async () => {
      try {
        const response = await axios.post("/loadAcceptedMedecinWithEmail");
       
        
        const medecinAccepted = response.data;
        const parsedData = JSON.parse(medecinAccepted.data);

        // const parsedData = JSON.parse(hospitaldd.data);

      // Assuming the response contains an array of objects, get the first object
      //const firstHospital = parsedData[0];
        console.log("assoil", parsedData);

        setParsedData(parsedData);

        setHospitalData({
          id: medecinAccepted.id,
          acceptedBy: medecinAccepted.acceptedBy || '',
          available: medecinAccepted.available || '',
          date: medecinAccepted.date || '',
          region: medecinAccepted.region || '',
          speciality: medecinAccepted.speciality || '',
        });
        // setHospitalData(hospitaldd.data);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

  const handleSelectDate = (date) => {
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0];
    // Find all the doctors that have the same date and availability in the parsedData array
    const doctors = parsedData.filter(
      (doctor) =>
        doctor.date === formattedDate && doctor.available === "day" // or 'night'
    );
    // Set the selected date and doctors state variables
    setSelectedDate(date);
    setSelectedDoctors(doctors);
  };

 const getTileClassName = ({ date }) => {
   const formattedDate = date.toISOString().split("T")[0];
    return parsedData.some(
      (doctor) =>
        doctor.date === formattedDate && doctor.available === "day" // or 'night'
    )
      ? "doctor-available"
      : null;
  };

  const getDoctorSpeciality = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  const doctor = parsedData.find(
    (doctor) =>
      doctor.date === formattedDate && doctor.available === "day" // or 'night'
  );
  return doctor ? doctor.speciality : "None";
};
const getDoctorId = (date) => {
 
  const formattedDate = date.toISOString().split("T")[0];
  const doctor = parsedData.find(
    (doctor) =>
      doctor.date === formattedDate && doctor.available === "day" // or 'night'
  );
  
  return doctor ? doctor.acceptedBy : "None";
};

const getDoctorAvailablity = (date) => {
 
  const formattedDate = date.toISOString().split("T")[0];
  const doctor = parsedData.find(
    (doctor) =>
      doctor.date === formattedDate && doctor.available === "day" // or 'night'
  );
  
  return doctor ? doctor.available : "None";
};
 
  const getTileContent = ({ date }) => {
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0];
    // Find all the doctors that have the same date and availability in the parsedData array
    const doctors = parsedData.filter(
      (doctor) =>
        doctor.date === formattedDate && doctor.available === "day" // or 'night'
    );
    // Return a list of doctor names and regions
    return (
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.region}
          </li>
        ))}
      </ul>
    );
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const toggle = () => setToggleBtn((val) => !val);

  return (
    <div>
    <Navbar2 setToggle={toggle} /> 
    <div className="calendar-container">
      {/* Animated background */}
      <div className="animated-bg"></div>

      <Sidebar toggleBtn={toggleBtn} />
      <h1>Medecin Calendar</h1>
      
      <Grid className="AllCal" container spacing={2}>
      <div className='brahim'>
        <Grid item xs={12} md={8}>
          
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Calendar
              onChange={handleSelectDate}
              value={selectedDate}
              tileClassName={getTileClassName}
              tileContent={getTileContent}
            />
          </Paper>
        </Grid>
        </div>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            {selectedDate && (
              <div>
                <Typography variant="h6">
                Doctors available on{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  IdMedecin :{getDoctorId(selectedDate)}
                  <br />
                   Speciality :{getDoctorSpeciality(selectedDate)}
                  <br />
                   Available : {getDoctorAvailablity(selectedDate)}
                </Typography>
                
                {selectedDoctors.length > 0 ? (
                  <ul>
                     {selectedDoctors.map((doctor) => (
                      <li key={doctor.id}>{doctor.name}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No doctors available on this day.</Typography>
                )}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
    </div>
  );
}
