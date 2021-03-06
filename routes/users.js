const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const database = require("../databaseHandle/connectDatabase");

router.get("/a"),
  function(req, res) {
    console.log("abc");
  };

router.post("/addUsers", function(req, res) {
  const usersData = [
    req.body.NIC,
    req.body.firstName,
    req.body.lastName,
    req.body.contactNo,
    req.body.email,
    req.body.password,
    req.body.addNo,
    req.body.addStreet,
    req.body.addCity,
    req.body.roleId
  ];

  console.log(usersData, "ppppppppppppppppp");
  database.addUsers(usersData, function(err, result) {
    console.log(usersData, "ppppppppppppppppp");
    if (err) {
      console.log(err);
      if (err.sqlState == "23000") {
        res.json({ success: false, msg: "already registerd" });
        return;
      }
      res.json({ success: false, msg: "something wrong please try again" });
    } else {
      res.json({ success: true, msg: "Users added" });
    }
  });
});
//get
router.post("/getuser", function(req, res) {
  console.log("getting");
  var nic = req.body.nic;
  console.log(req.body.nic);

  database.getUser(nic, (err, data) => {
    if (err) throw err;
    //console.log(user);
    if (!data) {
      //console.log(err);
      res.json({ success: false, msg: "User not found" });
    } else {
      console.log(data);
      res.json({ data });
    }
  });
});

router.post("/addPatient", function(req, res) {
  const usersData = [
    req.body.NIC,
    req.body.firstName,
    req.body.lastName,
    req.body.contactNo,
    req.body.email,
    req.body.password,
    req.body.addNo,
    req.body.addStreet,
    req.body.addCity,
    req.body.roleId
  ];

  const patientData = [
    req.body.patientId,
    req.body.dob,
    req.body.occupation,
    req.body.bloodType,
    req.body.maritalState,
    req.body.height,
    req.body.weight,
    req.body.NIC
  ];

  database.addUsers(usersData, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: "something wrong please try again" });
    } else {
      database.addPatient(patientData, function(err, result) {
        if (err) {
          console.log(err);
          res.json({ success: false, msg: "something wrong please try again" });
        } else {
          res.json({ success: true, msg: "Patient added" });
        }
      });
    }
  });
});

router.post("/login", function(req, res, next) {
  //console.log(req, "cfvgbnvgbhnj");
  const username = req.body.email;
  const password = req.body.password;
  const roleid = req.body.role;

  // console.log(username,password,"xcvbn");
  database.selectUser(username, function(err, user) {
    if (err) {
      throw err;
    } else {
      if (user.length === 0) {
        res.json({ success: false, msg: "wrong email" });
      } else {
        console.log(user[0].password, "nnnn");
        database.comparePassword(password, user[0].password, function(
          err,
          isMatch
        ) {
          // console.log(password,user[0].password,'7777777777777777777777777')
          if (err) {
            throw err;
          }
          if (isMatch) {
            // console.log(user[0].password,"dfghjkkkkkkkkkkkkkkkkkkkk");
            //const token = jwt.sign(toObject())
            // console.log(roleid);

            database.selectRole(roleid, function(err, roleid) {
              console.log(roleid);
              const token = jwt.sign(toObject(user), config.secret, {
                expiresIn: 604800
              });
              console.log(user[0]);
              res.json({
                state: true,
                email: username,
                token: "JWT " + token,
                role: user[0].roleId
              });
            });
          } else {
            // console.log("qwertyuiopqawsedrftgyhujikzxdcfgvbhnjsxdcbgyhunjse");
            res.json({ state: false, msg: "Wrong password" });
          }
        });
      }
    }
  });
});

module.exports = router;

function toObject(user) {
  return {
    UserID: user[0].email
  };
}
