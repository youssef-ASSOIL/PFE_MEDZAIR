import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../css/DemandeMedcin.css";

export default function DemandeMedcin() {
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
  ];

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [experienceYear, setExperienceYear] = useState("");

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleDemandeMedcin = async () => {
    const formData = {
        available: isDayTime() ? "day" : "night",
        date: selectedDateTime ? selectedDateTime.split("T")[0] : "",
        speciality: selectedSpecialty,
        
    };

    try {
      const response = await fetch("http://localhost:3002/submitFormDemandeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
      } else {
        console.log("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const isDayTime = () => {
    if (!selectedDateTime) {
      return false;
    }
    const selectedTime = new Date(selectedDateTime).getHours();
    return selectedTime >= 6 && selectedTime < 18; // Assuming day is from 6 AM to 6 PM
  };

  return (
    <div className="background-flow">
      <div className="content">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <Select
              required
              id="speciality"
              label="Speciality of Doctor"
              variant="outlined"
              displayEmpty
              value={selectedSpecialty}
              onChange={(event) => setSelectedSpecialty(event.target.value)}
            >
              <MenuItem value="" disabled>
                Select Specialty
              </MenuItem>
              {specialties.map((specialty, index) => (
                <MenuItem key={index} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </Select>

            <TextField
              required
              id="demandDateTime"
              label="Date and Time of Demand"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDateTimeChange}
            />

            {selectedDateTime && <p>{isDayTime() ? "Day" : "Night"}</p>}

            <TextField
              id="experienceYear"
              label="Year of Experience (optional)"
              type="number"
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={experienceYear}
              onChange={(event) => setExperienceYear(event.target.value)}
            />

            <div className="button-group">
              <Button
                variant="contained"
                color="primary"
                onClick={handleDemandeMedcin}
              >
                Demande Medcin
              </Button>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
