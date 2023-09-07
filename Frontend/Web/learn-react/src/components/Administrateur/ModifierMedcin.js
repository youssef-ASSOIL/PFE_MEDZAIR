import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../css/ModifierMedecin.css";
import SideBar2 from './SideBar2';
import axios from 'axios';
import "../../css/DoctorinfoModify.css"
import MenuItem from '@mui/material/MenuItem';

const specialties = [
  "anesthésiologie",
  "cardiologie",
  "dermatologie",
  "endocrinologie",
  "gastro-entérologie",
  "génétique médicale",
  "gériatrie",
  "hématologie",
  "immunologie clinique et allergie",
  "néphrologie",
  "neurologie",
  "pédiatrie",
  "pneumologie",
  "rhumatologie",
  // Add more specialties as needed
]

function DoctorInfo({ doctorInfo }) {
  console.log("Received doctorInfo:", doctorInfo); // Debugging line

  const doctorData = doctorInfo[0];

  return (
    <div className="doctor-info">
      <h3>Doctor Information</h3>
      <p><p className='key'>First Name:</p> {doctorData.firstName}</p>
      <p><p className='key'>Last Name: </p> {doctorData.lastName}</p>
      <p><p className='key'>RPPS:</p>  {doctorData.rpps}</p>
      <p><p className='key'>Email:</p>  {doctorData.email}</p>
      {/* <p>Selected Image: {doctorInfo.selectedImage}</p> */}
      <p><p className='key'>Phone:</p>  {doctorData.phone}</p>
      <p><p className='key'>Speciality:</p>{doctorData.speciality}</p>
    </div>
  );
}

function ModifyDoctorInfo({ modifiedDoctorInfo, onModifyDoctorInfoChange, onModify }) {
  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the selected image file
      const reader = new FileReader();
      reader.onloadend = () => {
        onModifyDoctorInfoChange({
          ...modifiedDoctorInfo,
          selectedImage: reader.result, // Store the base64 data URL of the image
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div>
    <h3>Modify Doctor Information</h3>
    <div className="form-container">
      <div className="column">
        <TextField
          required
          id="firstName"
          name="firstName"
          label="FirstName"
          fullWidth
          variant="standard"
          value={modifiedDoctorInfo.firstName || ''}
          onChange={(e) => onModifyDoctorInfoChange({ ...modifiedDoctorInfo, firstName: e.target.value })}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="LastName"
          fullWidth
          variant="standard"
          value={modifiedDoctorInfo.lastName || ''}
          onChange={(e) => onModifyDoctorInfoChange({ ...modifiedDoctorInfo, lastName: e.target.value })}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          fullWidth
          variant="standard"
          value={modifiedDoctorInfo.email || ''}
          onChange={(e) => onModifyDoctorInfoChange({ ...modifiedDoctorInfo, email: e.target.value })}
        />
      </div>
      <div className="column">
        <label htmlFor="image">Selected Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*" // Allow only image files
          onChange={handleImageChange}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          fullWidth
          variant="standard"
          value={modifiedDoctorInfo.password || ''}
          onChange={(e) => onModifyDoctorInfoChange({ ...modifiedDoctorInfo, password: e.target.value })}
        />
        <TextField
          id="phone"
          name="phone"
          label="Phone"
          fullWidth
          variant="standard"
          value={modifiedDoctorInfo.phone || ''}
          onChange={(e) => onModifyDoctorInfoChange({ ...modifiedDoctorInfo, phone: e.target.value })}
        />
      </div>
      <div className="column">
      <TextField
    id="birthday"
    name="birthday"
    label="Birthday"
    fullWidth
    variant="standard"
    type="date" // Use type 'date' for date input
    value={modifiedDoctorInfo.birthday || ''}
    onChange={(e) =>
      onModifyDoctorInfoChange({ ...modifiedDoctorInfo, birthday: e.target.value })
    }
  />
        <TextField
        id="speciality"
        name="speciality"
        select
        label="Speciality"
        fullWidth
        variant="standard"
        value={modifiedDoctorInfo.speciality || ''}
        onChange={(e) =>
          onModifyDoctorInfoChange({ ...modifiedDoctorInfo, speciality: e.target.value })
        } // Update 'speciality' state
      >
        {specialties.map((specialty) => (
          <MenuItem key={specialty} value={specialty}>
            {specialty}
          </MenuItem>
        ))}
      </TextField>
        <Button variant="contained" color="primary" onClick={onModify}>
          Modify
        </Button>
      </div>
    </div>
  </div>
  
  );
}

export default function ModifierMedcin() {
  const [doctorInfo, setDoctorInfo] = useState({}); 

  const [searchRpps, setSearchRpps] = useState('');
  const [error, setError] = useState(null);// Add a state for the medecinRpps


  const [modifiedDoctorInfo, setModifiedDoctorInfo] = useState({
    birthday:'',
    firstName: '',
    email: '',
    selectedImage: '', // Store the base64 data URL of the image
    lastName: '',
    password: '',
    phone: '',
    speciality: '',
  });

  
  
  const handleSearch = () => {
    // Replace this with your express server URL
   
    axios.post("http://localhost:3002/searchMedecin", { rpps: searchRpps }) // Use axios.get()
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error);
        } else {
          const medecin = data.data; // Access the actual data object

          console.log("Medecin:", medecin);
          setDoctorInfo(medecin);
          setModifiedDoctorInfo({
            ...modifiedDoctorInfo,
            rpps: medecin[0].rpps,
            id: medecin[0].id,
          });
  
        }
      })
      .catch((error) => {
        console.error("Error fetching medecin:", error);
        setError("Failed to fetch medecin");
      });
  };


  const handleModify = () => {
    console.log(modifiedDoctorInfo.rpps+" "+modifiedDoctorInfo.email+" "+ modifiedDoctorInfo.lastname+" "+ modifiedDoctorInfo.phone);
    axios
    .post("http://localhost:3002/modifyMedecin", modifiedDoctorInfo)
    .then((response) => {
      const data = response.data;
      if (data.error) {
        setError(data.error);
      } else {
        console.log("Medecin modified successfully");
        // You can update the doctor's information in your component state or perform any other necessary actions.
      }
    })
    .catch((error) => {
      console.error("Error modifying medecin:", error);
      setError("Failed to modify medecin");
    });
  };
  const [toggleBtn, setToggleBtn] = useState(true);
  
  return (
    <div>
    <SideBar2 toggleBtn={toggleBtn}/>
    <div className="modify-medecin">
      <h2>Modify Medecin</h2>
      <div>
        <label htmlFor="rpps">RPPS:</label>
        <input
          type="text"
          id="rpps"
          value={searchRpps}
          onChange={(e) => setSearchRpps(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      

      {doctorInfo && Object.keys(doctorInfo).length > 0 && <DoctorInfo doctorInfo={doctorInfo} />}
      <div  className='modify-doctor-info'>
      {Object.keys(doctorInfo).length > 0 && (
        <ModifyDoctorInfo
          modifiedDoctorInfo={modifiedDoctorInfo}
          onModifyDoctorInfoChange={setModifiedDoctorInfo}
          onModify={handleModify}
        />
      )}
      </div>
    </div>
    </div>
  );
}
