const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const database = require("../databaseHandle/connectDatabase");

router.post("/addAppointment", function(req, res) {
  const appointmentData = [
    req.body.appDate,
    req.body.appTime,
    req.body.doctorRegNo
  ];

  database.patientProfile(req.body.email, function(err, result) {
    if (err) {
      console.log(email);
      return;
    } else {
      //console.log(result[0].patientId);
      appointmentData.push(result[0].patientId);
      console.log(appointmentData);
      database.addAppointment(appointmentData, function(err, result) {
        if (err) {
          console.log(err);
          if (err.sqlState == "23000") {
            res.json({ success: false, msg: "already registerd" });
            return;
          }
          res.json({ success: false, msg: "something wrong please try again" });
        } else {
          res.json({ success: true, msg: "Appointment Done" });
        }
      });
    }
  });
});

router.get("/viewappointments/:doctorEmail", function(req, res) {
  var email = req.params.doctorEmail;
  database.doctorProfile(email, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result[0].doctorRegNo);
      database.viewAppointsments(result[0].doctorRegNo, function(err, result1) {
        if (err) {
          console.log(err);
          return;
        } else {
          res.json({ data: result1 });
        }
      });
    }
  });
});

router.get("/approveappointment/:appId", function(req, res) {
  // console.log(req);
  var appId = req.params.appId;
  database.approveAppointment(appId, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send({ state: true });
    }
  });
});

module.exports = router;
