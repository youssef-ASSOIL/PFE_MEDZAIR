const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../Frontend/Web/learn-react/public')));

app.get('/api/login', (req, res) => {
  try {
    // Handle the login request
    // Verify the user credentials using Firebase authentication
    // ...

    // Redirect the user to the dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/dashboard', (req, res) => {
  // Render the dashboard page or send a response as needed
  res.send('Dashboard Page');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
