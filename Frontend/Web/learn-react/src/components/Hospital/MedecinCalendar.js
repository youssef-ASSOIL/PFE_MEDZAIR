import React, { useState } from 'react'
import Sidebar from './Barside'
import { Grid, Paper, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../css/MedecinCalendar.css"

export default function MedecinCalendar() {
    const [toggleBtn, setToggleBtn] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    const doctorsOnDate = doctorsData.filter(
      (doctor) => doctor.schedule[formattedDate]?.length > 0
    );
    setSelectedDoctors(doctorsOnDate);
  };
  const doctorsData = [
    {
      id: 1,
      name: 'Dr. Smith',
      schedule: {
        '2023-09-01': ['Morning', 'Afternoon'],
        '2023-09-05': ['Morning'],
      },
    },
    {
      id: 2,
      name: 'Dr. Johnson',
      schedule: {
        '2023-09-01': ['Afternoon'],
        '2023-09-02': ['Morning', 'Afternoon'],
      },
    },
    // Add more doctors and their schedules here
  ];
   
   
    return (
    <div>
    <Sidebar toggleBtn={toggleBtn} />
    <h1>Medecin Calendar</h1>
            <Grid className='AllCal' container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                <Calendar
                                    onChange={handleSelectDate}
                                    value={selectedDate}
                                    tileClassName={({ date }) => {
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return doctorsData.some(
                                        (doctor) => doctor.schedule[formattedDate]?.length > 0
                                    )
                                        ? 'doctor-available'
                                        : null;
                                    }}
                                />
                                </Paper>
                            </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper elevation={3} style={{ padding: '20px' }}>
                                        {selectedDate && (
                                            <div>
                                            <Typography variant="h6">
                                                Doctors available on{' '}
                                                {selectedDate.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                })}
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
  )
}
