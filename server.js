// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require express to run server and routes
const express = require("express");
//Require uuid to make ids for each entry
const uuid = require("uuid");
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
//setting up the post and get routes
app.post("/entries", (req, res) => {
    const entry = {
        id: uuid.v4(),
        date: req.body.date,
        feeling: req.body.feeling,
        zipCode: req.body.zipCode,
        weather: req.body.weather
    }
    projectData.push(entry);
    console.log(projectData)
    res.send({ msg: "Entry receieved and saved...", entry });
});
app.get("/entries", (req, res) => {
    res.send(JSON.stringify(projectData));
})
// Setup Server
//this port shortcircuit is from Traversy's express.js crash course
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running and listening on port: " + PORT));