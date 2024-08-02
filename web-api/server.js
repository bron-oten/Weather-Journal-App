// projectData = {};
// // Express to run server and routes 
// const express = require('express');
// // Start up an instance of app
// const app = express();
// // Dependencies
// const bodyParser = require('body-parser');
// // Middleware
// // Here we are configuring express to use boy-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());
// // Cors for cross origin allowance
// const cors = require('cors');
// app.use(cors());
// // Initialize the main project folder 
// app.use(express.static('website'));

// const port = 8002;
// // Spin up the server 
// const server = app.listen(port, listening);
// // Callback to debug
// function listening (){
//     console.log('server running');
//     console.log(`running on localhost: ${port}`);
// }
// // GET route
// app.get('/all', sendData);

// function sendData (request, response) {
//   response.send(projectData);
// };
// // POST route
// app.post('/add', callBack);

// function callBack(req, res){
//   res.send('POST received');
// }

// const data = []
// app.post('/addMovie', addMovie )

// function addMovie (req, res){
//   data.push(req.body)
//   // console.log(data)
// }

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware */
const bodyParser = require('body-parser');

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website')); // 

// Setup Server
const port = 5001; // Changed the port number here
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

// GET route to return the projectData object
app.get('/getProjectData', (req, res) => {
    res.json(projectData);
    console.log(projectData);
});

// POST route to add incoming data to projectData 
app.post('/addProjectData', (req, res) => {
    // Get the data from the request body 
    const { temperature, date, userResponse } = req.body;

    // Add the data to projectData with keys 
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;

    // Return the updated projectData object 
    return res.json(projectData);
});
