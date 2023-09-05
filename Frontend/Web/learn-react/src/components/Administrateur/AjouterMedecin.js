import React, { useState } from "react";
import axios from "axios";
import "../../css/AjouterMedecin.css"; // Import the CSS file
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SideBar2 from './SideBar2';


const AjouterMedecin = () => {
    const [toggleBtn, setToggleBtn] = useState(true);
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
    const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [rpps, setRpps] = useState("");
    const [speciality, setSpeciality] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("birthday", birthday);
      formData.append("email", email);
      formData.append("image", selectedImage); // Add the selected image to the form data
      formData.append("lastname", lastname);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("rpps", rpps);
      formData.append("speciality", speciality);
  
      try {
        await axios.post("http://localhost:3002/addMedecin", formData);
        console.log("Medecin added successfully!");
      } catch (error) {
        console.error("Error adding Medecin:", error);
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file); // Store the selected image in state
    };

  return (
    <div>
        <SideBar2 toggleBtn={toggleBtn}/>
    <div className="add-medecin-container">
      <React.Fragment>
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
              fullWidth
              autoComplete="given-name"
              variant="standard"
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
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="birthday"
              name="birthday"
              //label="Birthday"
              type="date"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              name="imageInput"
              onChange={(e) => handleImageChange(e)}
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
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
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
          fullWidth
          autoComplete="new-password"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="phone"
          name="phone"
          label="Phone"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="rpps"
          name="rpps"
          label="RPPS (Registration Number)"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="speciality"
          name="speciality"
          label="Speciality"
          fullWidth
          variant="standard"
        />
      </Grid>
        </Grid>
        <div className="add-medecin-buttons">
          <Button variant="contained" color="primary" onClick={handleSubmit} className="add-medecin-button-add">
            Add Medecin
          </Button>
          <Button variant="outlined" color="secondary" className="add-medecin-button-cancel">
            Cancel
          </Button>
        </div>
      </React.Fragment>
    </div>
    </div>
  );
};

export default AjouterMedecin;
