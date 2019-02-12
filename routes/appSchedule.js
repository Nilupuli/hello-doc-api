const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const database = require("../databaseHandle/connectDatabase");

router.post("/addAppSchedule", function(req, res) {
  const appScheduleData = [
    req.body.noOfAppointments,
    req.body.dateTimeIn,
    req.body.dateTimeOut,
    req.body.doctorRegNo,
    req.body.date
  ];

  database.addAppSchedule(appScheduleData, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: "already registerd" });
      return;
    } else {
      res.json({ success: true, msg: "AppSchedule Done" });
    }
  });
});

router.get("/ViewSheduling/:doctorRegNo", function(req, res) {
  var doctorRegNo = req.params.doctorRegNo;
  database.ViewSheduling(doctorRegNo, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send({ data: result });
    }
  });
});

module.exports = router;
