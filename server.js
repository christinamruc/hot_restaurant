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
var reservations = [{
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

var waitList = [{
  name: "Bill",
  phoneNumber: 8037657898,
  email: "bill@gmail.com",
  uniqueId: "bill"
}, {
  name: "Jill",
  phoneNumber: 8037657898,
  email: "jill@gmail.com",
  uniqueId: "Jill"
}, {
  name: "Bob",
  phoneNumber: 8037657898,
  email: "bob@gmail.com",
  uniqueId: "bob"
}];

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
app.get("/api/:tables", function(req, res) {
  var guest = req.params.tables;

  if (tables){
    fs.readFile("tableData.txt", function (err, data) {

      data = JSON.parse(data);

       if (err) {
           console.log(err);
       } else {
          for (var i = 0; i < data.length; i++) {
            console.log("Guests: " + data[i].uniqueId);
          }
       }
    });
  }

});

app.get("/api/:waitList", function (req, res) {
  var waitGuest = req.params.waitList;

  data = JSON.parse(data);

  if (waitGuest){
    fs.readFile("waitData.txt", function (err, data) {
       if (err) {
           console.log(err);
       } else {
           for (var i = 0; i < data.length; i++) {
            console.log("Waitlist: " + data[i].uniqueId);
          }
      }
    });
  }
});

// Create New Reservations - takes in JSON input
app.post("/api/new", function(req, res) {
  var newGuest = req.body;

  console.log(newGuest);

  if (tables.length < 5) {

    tables.push(newGuest);

    fs.writeFile("tableData.txt", JSON.stringify(tables), function (err) {
       if (err) {
           console.log(err);
       } else {
           console.log("Content Added!");
       }
    });
  } else {
    waitList.push(newGuest);

    fs.writeFile("waitData.txt", JSON.stringify(waitList), function (err) {
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
