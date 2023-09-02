import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../css/ModifierMedecin.css";
import SideBar2 from './SideBar2';

function DoctorInfo({ doctorInfo }) {
    
  return (
    <div className="doctor-info">
      <h3>Doctor Information</h3>
      <p>Name: {doctorInfo.name}</p>
      <p>RPPS: {doctorInfo.rpps}</p>
      <p>Email: {doctorInfo.email}</p>
      <p>Selected Image: {doctorInfo.selectedImage}</p>
      <p>Lastname: {doctorInfo.lastname}</p>
      <p>Password: {doctorInfo.password}</p>
      <p>Phone: {doctorInfo.phone}</p>
      <p>Speciality: {doctorInfo.speciality}</p>
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
      <TextField
        required
        id="name"
        name="name"
        label="Name"
        fullWidth
        variant="standard"
        value={modifiedDoctorInfo.name || ''}
        onChange={(e) => onModifyDoctorInfoChange({ ...modifiedDoctorInfo, name: e.target.value })}
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
      <div>
        <label htmlFor="image">Selected Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*" // Allow only image files
          onChange={handleImageChange}
        />
      </div>
      <TextField
        id="lastname"
        name="lastname"
        label="Lastname"
        fullWidth
        variant="standard"
        value={modifiedDoctorInfo.lastname || ''}
        onChange={(e) => onModifyDoctorInfoChange({ ...modifiedDoctorInfo, lastname: e.target.value })}
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
      <TextField
        id="speciality"
        name="speciality"
        label="Speciality"
        fullWidth
        variant="standard"
        value={modifiedDoctorInfo.speciality || ''}
        onChange={(e) =>
          onModifyDoctorInfoChange({ ...modifiedDoctorInfo, speciality: e.target.value })
        }
      />
      <Button variant="contained" color="primary" onClick={onModify}>
        Modify
      </Button>
    </div>
  );
}

export default function ModifierMedcin() {
  const [searchRpps, setSearchRpps] = useState('');
  const [doctorInfo, setDoctorInfo] = useState({});
  const [doctorsData, setDoctorsData] = useState([
    {
      id: 1,
      rpps: '123456789',
      name: 'Dr. Smith',
      email: 'dr.smith@example.com', // Add email field
      selectedImage: 'image_path.jpg', // Add selectedImage field
      lastname: 'Smith', // Add lastname field
      password: 'password123', // Add password field
      phone: '123-456-7890', // Add phone field
      speciality: 'Cardiology', // Add speciality field
      schedule: {
        '2023-09-01': ['Morning', 'Afternoon'],
        '2023-09-05': ['Morning'],
      },
    },
    {
      id: 2,
      rpps: '987654321',
      name: 'Dr. Johnson',
      email: 'dr.johnson@example.com', // Add email field
      selectedImage: 'image_path2.jpg', // Add selectedImage field
      lastname: 'Johnson', // Add lastname field
      password: 'johnson456', // Add password field
      phone: '987-654-3210', // Add phone field
      speciality: 'Dermatology', // Add speciality field
      schedule: {
        '2023-09-01': ['Afternoon'],
        '2023-09-02': ['Morning', 'Afternoon'],
      },
    },
    // Add more doctors and their schedules here
  ]);

  const [modifiedDoctorInfo, setModifiedDoctorInfo] = useState({
    name: '',
    email: '',
    selectedImage: '', // Store the base64 data URL of the image
    lastname: '',
    password: '',
    phone: '',
    speciality: '',
  });

  

  const handleSearch = () => {
    // Search for the doctor in your doctorsData using searchRpps
    const foundDoctor = doctorsData.find((doctor) => doctor.rpps === searchRpps);

    if (foundDoctor) {
      setDoctorInfo(foundDoctor);
    } else {
      // Handle doctor not found
      setDoctorInfo({});
    }
  };

  const handleModify = () => {
    // Update the doctor's information in your doctorsData
    const updatedDoctorsData = doctorsData.map((doctor) => {
      if (doctor.rpps === searchRpps) {
        return { ...doctor, ...modifiedDoctorInfo };
      }
      return doctor;
    });
    setDoctorsData(updatedDoctorsData);
    setModifiedDoctorInfo({}); // Clear the modified data after update
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

      {Object.keys(doctorInfo).length > 0 && <DoctorInfo doctorInfo={doctorInfo} />}

      {Object.keys(doctorInfo).length > 0 && (
        <ModifyDoctorInfo
          modifiedDoctorInfo={modifiedDoctorInfo}
          onModifyDoctorInfoChange={setModifiedDoctorInfo}
          onModify={handleModify}
        />
      )}
    </div>
    </div>
  );
}
