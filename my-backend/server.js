const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');  // Path to data.json file

app.use(cors());
app.use(bodyParser.json());

// Helper function to check if username exists
const checkIfUsernameExists = (jsonData, username) => {
  return jsonData.some((user) => user.username === username);
};

// Route to handle form submission
app.post('/', (req, res) => {
  const { username, password } = req.body;

  // Check if the data file exists
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let jsonData = [];
    if (err) {
      if (err.code === 'ENOENT') {
        // File does not exist, create new one
        console.log('File does not exist. Creating new data.json file...');
      } else {
        // Any other error
        return res.status(500).send('Error reading data file');
      }
    } else {
      // If file exists, parse the existing data
      jsonData = data ? JSON.parse(data) : [];
    }

    // Check if username already exists
    if (checkIfUsernameExists(jsonData, username)) {
      return res.status(409).send('Username already exists');
    }

    // Add the new entry (username and password)
    jsonData.push({ username, password });

    // Write the updated data back to the JSON file
    fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to data file:', err);
        return res.status(500).send('Error saving data');
      }
      res.status(200).send('Data saved successfully');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
