import React, { useState } from "react";
import axios from "axios";
import "../../css/AjouterMedecin.css";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SideBar2 from './SideBar2';
import MenuItem from '@mui/material/MenuItem';
import Navbar2 from "../NavBar2";

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


const AjouterMedecin = () => {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [medecinData, setMedecinData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Build form data
    const formData = new FormData();
    Object.keys(medecinData).forEach(key => {
      if (medecinData[key]) { 
        formData.append(key, medecinData[key]);
      }  
    });

    try {
      // Call API
    
      const formJson = Object.fromEntries(formData);
      //console.log(formDataJson);
      const response = await axios.post("http://localhost:3002/addMedecin", formJson);
      console.log(response.data);
        // Reset form
      setMedecinData({
        firstName: "",
        lastname: "",
        birthday: "",
        email: "",
        password: "",
        phone: "",
        rpps: "",
        speciality: "",
      });
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
    }
  }

 // Handle input changes
 const handleInputChange = e => {
  setMedecinData({
    ...medecinData,
    [e.target.name]: e.target.value
  });
}

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const toggle = () => setToggleBtn((val) => !val);
  return (
    <div>
      <Navbar2 setToggle={toggle} />
      <SideBar2 toggleBtn={toggleBtn} />
      <div className="add-medecin-container">
        <Typography variant="h6" gutterBottom>
          Add Medecin
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              value={medecinData.firstName}
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleInputChange} // Update 'name' state
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              value={medecinData.lastname}  // Should be "lastName" instead of "lastname"
              variant="standard"
              onChange={handleInputChange} // Update 'lastname' state
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              required
              id="birthday"
              name="birthday"
              label="Birthday"
              value={medecinData.birthday }  // Should be "birthday" instead of "birthday "
              type="date"
              fullWidth
              variant="standard"
              onChange={handleInputChange} // Update 'birthday' state
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              value={medecinData.email} 
              fullWidth
              autoComplete="email"
              variant="standard"
              onChange={handleInputChange} // Update 'email' state
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              name="imageInput"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="imageInput">
              <Button variant="contained" component="span" color="primary">
                Choose Picture
              </Button>
            </label>
            {selectedImage && (
      <div>
        <Typography variant="body1">Selected Image:</Typography>
        <img
       
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
          style={{ maxHeight: '20px', width: 'auto' }} // Apply inline styles to limit the size
        />
      </div>
    )}

          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              value={medecinData.password } 
              fullWidth
              autoComplete="new-password"
              variant="standard"
              onChange={handleInputChange} // Update 'password' state
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              variant="standard"
              value={medecinData.phone} 
              onChange={handleInputChange} // Update 'phone' state
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="rpps"
              name="rpps"
              label="RPPS (Registration Number)"
              fullWidth
              variant="standard"
              value={medecinData.rpps} 
              onChange={handleInputChange} // Update 'rpps' state
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="speciality"
              name="speciality"
              select
              label="Speciality"
              fullWidth
              variant="standard"
              value={medecinData.speciality } 
              onChange={handleInputChange} // Update 'speciality' state
            >
              {specialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <div className="add-medecin-buttons">
       
          <Button onClick={handleSubmit} variant="contained" color="primary"  className="add-medecin-button-add">

            Add Medecin
          </Button>
        
          <Button variant="outlined" color="secondary" className="add-medecin-button-cancel">
            Cancel
          </Button>
         
        </div>

      </div>
    </div>
  );
};

export default AjouterMedecin;
