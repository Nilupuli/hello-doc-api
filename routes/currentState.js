const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const database = require("../databaseHandle/connectDatabase");

router.post("/addCurrentState", function(req, res) {
  console.log("addcurrentstate route called");

  const currentStateData = [
    req.body.prescriptionId,
    req.body.duration,
    req.body.currentStateDate,
    req.body.state,
    req.body.comment
  ];
  console.log(currentStateData);
  database.addCurrentState(currentStateData, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: "something wrong please try again" });
    } else {
      res.json({ success: true, msg: "Current State Added" });
    }
  });
});

router.get("/patientviewstatus/:email", function(req, res) {
  var email = req.params.email;
  database.patientViewCurrentState(email, function(err, result) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json({ data: result });
    }
  });
});

router.get("/doctorviewstatus/:email", function(req, res) {
  var email = req.params.email;
  database.doctorViewCurrentState(email, function(err, result) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json({ data: result });
    }
  });
});

module.exports = router;
