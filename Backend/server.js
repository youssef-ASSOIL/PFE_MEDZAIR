const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../Frontend/Web/learn-react/build')));

app.get('/home', (req, res) => {
  const filePath = path.join(__dirname, '../Frontend/Web/learn-react/public/index.html');
  res.sendFile(filePath);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/Web/learn-react/src/index.js'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

