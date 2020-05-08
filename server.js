// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes and all the imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors()); 


// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`);
});


// Initialize all route with a callback function
app.get('/all', getData);
app.post('/addWeather', postWeather);

// Callback function to complete GET '/all' and update UI
function getData(req,res) {
    res.json(projectData);
}

// Post Routes
function postWeather(req, res) {
    projectData = req.body;
    res.json(projectData);
}  