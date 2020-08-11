// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require express to run server and routes
const express = require("express");

// Start up an instance of app
const app = new express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

/* bodyParser is not required anymore, the parser is provided inside the express class
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"))


// Setup Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running and listening on port: " + PORT));