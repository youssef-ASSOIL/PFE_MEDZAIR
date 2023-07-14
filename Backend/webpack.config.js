const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  try {
    exec('node ../Frontend/Web/learn-react/src/index.js', (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Execution successful:', stdout);
        res.send('Index file executed successfully!');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/', async (req,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); 
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
