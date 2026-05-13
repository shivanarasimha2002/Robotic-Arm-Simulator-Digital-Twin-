const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql'); // Assuming you're using MySQL
const bodyParser = require("body-parser");
const { exec } = require("child_process");

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
      extended: true
  })
);

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blender'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

app.post('/position', (req, res) => {
  //const { left1, left2, right1, right2, right3, right4, x, y } = req.body; // Assuming you have fields named field1 and field2 in your form

  var left1 = Number(req.body.left1);
  var left2 = Number(req.body.left2);
  var right1 = Number(req.body.right1);
  var right2 = Number(req.body.right2);
  var right3 = Number(req.body.right3);
  var right4 = Number(req.body.right4);
  var x = Number(req.body.y);
  var y = Number(req.body.x);

  // Insert data into the database
  connection.query('UPDATE position SET left1 = ?, left2 = ?, right1 = ?, right2 = ?, right3 = ?, right4 = ?, x = ? , y = ?', [left1, left2, right1, right2, right3, right4, x, y], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    
    exec("python3 ./public/pythoncode.py", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
    res.redirect('/');
  });

});

app.post('/addvolume', (req, res) => {
  //const { left1, left2, right1, right2, right3, right4, x, y } = req.body; // Assuming you have fields named field1 and field2 in your form

  var addname = String(req.body.addname);
  var xl = Number(req.body.xl);
  var yl = Number(req.body.yl);
  var zl = Number(req.body.zl);
  var xdist = Number(req.body.xdist);
  var ydist = Number(req.body.ydist);
  var zdist = Number(req.body.zdist);
 
  // Insert data into the database
  connection.query('UPDATE workvolume SET addname = ?, removename = "0", xl = ?, yl = ?, zl = ?, `x-dist` = ?, `y-dist` = ? , `z-dist` = ?', [addname, xl, yl, zl, xdist, ydist, zdist], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    
    exec("python3 ./public/pythoncode2.py", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
    res.redirect('/');
  });

});

app.post('/removevolume', (req, res) => {
  //const { left1, left2, right1, right2, right3, right4, x, y } = req.body; // Assuming you have fields named field1 and field2 in your form

  var removename = String(req.body.removename);

  // Insert data into the database
  connection.query('UPDATE workvolume SET `addname`= "0", removename = ?', [removename], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    
    exec("python3 ./public/pythoncode2.py", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
    res.redirect('/');
  });

});

// Start the server
const PORT = process.env.PORT || 3000; // Use the port provided by environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
