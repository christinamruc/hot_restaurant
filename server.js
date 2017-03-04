// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Table Data (DATA)
// =============================================================
var tables = [{
  name: "Yoda",
  phoneNumber: 8037657898,
  email: "yoda@gmail.com",
  uniqueId: "yoda"
}, {
  name: "Obi Wan Kenobi",
  phoneNumber: 8037657898,
  email: "obiwank@gmail.com",
  uniqueId: "Obi Wan Kenobi"
}, {
  name: "Billy Bob",
  phoneNumber: 8037657898,
  email: "billybob@gmail.com",
  uniqueId: "billybob"
}];

var waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:tables?", function(req, res) {
  var guest = req.params.tables;

  if (guest) {
    console.log(guest);

    for (var i = 0; i < tables.length; i++) {
      if (guest === tables[i].routeName) {
        return res.json(tables[i]);
      }
    }

    return res.json(false);
  }
  return res.json(tables)
  return res.json(waitList);
});

// Create New Reservations - takes in JSON input
app.post("/api/new", function(req, res) {
  var newGuest = req.body;

  console.log(newGuest);

  if (tables.length < 5) {

    tables.push(newGuest);

    fs.appendFile("tableData.txt", JSON.stringify(newGuest), function (err) {
       if (err) {
           console.log(err);
       } else {
           console.log("Content Added!");
       }
    });
  } else {
    waitList.push(newGuest);

    fs.appendFile("tableData.txt", JSON.stringify(newGuest), function (err) {
       if (err) {
           console.log(err);
       } else {
           console.log("Content Added!");
       }
    });
  }
  // res.json(newGuest);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
