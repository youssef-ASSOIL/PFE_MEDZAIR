import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; // Import the Button component
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../css/DemandeMedcin.css';

export default function DemandeMedcin() {
    const specialties = [
        'anesthésiologie',
        'cardiologie',
        'dermatologie',
        'endocrinologie',
        'gastro-entérologie',
        'génétique médicale',
        'gériatrie',
        'hématologie',
        'immunologie clinique et allergie',
        'néphrologie',
        'neurologie',
        'pédiatrie',
        'pneumologie',
        'rhumatologie',
        // Add more specialties as needed
      ];
    return (
    <div className="background-flow">
      <div className="content">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
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

            {/* Date and time of demand */}
            <TextField
              required
              id="demandDateTime"
              label="Date and Time of Demand"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Year of experience (optional) */}
            <TextField
              id="experienceYear"
              label="Year of Experience (optional)"
              type="number"
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 }, // Ensure the input is positive
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Buttons */}
            <div className="button-group">
              <Button variant="contained" color="primary">
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
