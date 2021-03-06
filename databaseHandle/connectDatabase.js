const mysql = require("mysql");
const conDetails = require("../config/database");
const tableSchema = require("./tableSchema");
const bcrypt = require("bcryptjs");
var randomstring = require("randomstring");

// create database connection
const con = mysql.createConnection(conDetails.conDetails);

// connect to database
module.exports.connet = function() {
  con.connect(function(err) {
    if (err) {
      throw err;
    } else {
      console.log("connected");
    }
  });

  for (let index = 0; index < tableSchema.tablesname.length; index++) {
    const tableName = tableSchema.tablesname[index];
    // check the availability of the tables
    con.query("CHECK TABLE " + tableName, function(err, result) {
      if (err) {
        throw err;
      }

      //DEBUG codes
      //console.log(tableName);
      //console.log(result[0].Msg_text);
      //console.log("Table 'webdata1.users' doesn't exist");
      //console.log("Table 'webdata1."+tableName+"'"+" doesn't exist");
      //Table 'webdata1.users' doesn't exist

      if (
        result[0].Msg_text ==
        "Table '" +
          conDetails.conDetails.database +
          "." +
          tableName +
          "' doesn't exist"
      ) {
        // if =table not availble then create the tables
        createTables(tableSchema.tables[tableName].createTable);
      }
    });
  }
};

// function for create tables that not exits in database
function createTables(sql) {
  con.query(sql, function(err, result) {
    if (err) {
      //throw err;
      console.log(err);
      console.log("tableExist");
    } else {
      console.log(result);
    }
  });
}

// fuction for add users in to user table
module.exports.addNewUser = function InsertUser(user, callback) {
  //console.log(user);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user[4], salt, function(err, hash) {
      if (err) {
        throw err;
      }
      user[4] = hash;
      con.query(
        tableSchema.tables.userData.insertIntoUserTable,
        [[user]],
        callback
      );
    });
  });
};

// new changes
module.exports.addRole = function(data, callback) {
  con.query(tableSchema.tables.role.adduser, [[data]], callback);
};

module.exports.addUsers = function(data, callback) {
  //console.log(data[5],"qwertyuiertyuiop");

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(data[5], salt, function(err, hash) {
      if (err) {
        console.log(err);
      }
      data[5] = hash;
      con.query(tableSchema.tables.users.adduser, [[data]], callback);
    });
  });
};

module.exports.addMlt = function(data, callback) {
  con.query(tableSchema.tables.mlt.adduser, [[data]], callback);
};

module.exports.addPatient = function(data, callback) {
  con.query(tableSchema.tables.patient.adduser, [[data]], callback);
};

module.exports.addDoctor = function(data, callback) {
  con.query(tableSchema.tables.doctor.adduser, [[data]], callback);
};

module.exports.addFrontdesk = function(data, callback) {
  con.query(tableSchema.tables.frontdesk.adduser, [[data]], callback);
};

module.exports.addLabreport = function(data, callback) {
  con.query(tableSchema.tables.labreport.adduser, [[data]], callback);
};

module.exports.addAppointment = function(data, callback) {
  con.query(tableSchema.tables.appointment.addappointment, [[data]], callback);
};

module.exports.addDiseasedetail = function(data, callback) {
  con.query(tableSchema.tables.diseasedetail.adduser, [[data]], callback);
};

module.exports.addPrescription = function(data, callback) {
  con.query(
    tableSchema.tables.Prescription.addprescription,
    [[data]],
    callback
  );
};

module.exports.addAppSchedule = function(data, callback) {
  con.query(tableSchema.tables.appSchedule.addAppSchedule, [[data]], callback);
};

module.exports.addMedicine = function(data, callback) {
  con.query(tableSchema.tables.Medicine.addMedicine, [[data]], callback);
};

module.exports.addPayment = function(data, callback) {
  con.query(tableSchema.tables.payment.adduser, [[data]], callback);
};

module.exports.addCurrentState = function(data, callback) {
  con.query(tableSchema.tables.currentState.adduser, [[data]], callback);
};

module.exports.selectUser = function selectUser(username, callback) {
  con.query(
    tableSchema.tables.users.SelectUser + mysql.escape(username),
    callback
  );
};

//get
module.exports.getUser = function(data, callback) {
  var nic = { NIC: data };
  console.log(nic);
  con.query(tableSchema.tables.users.getUser, nic, callback); //get
};

module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, isMatch) {
    //console.log(hash,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    if (err) throw err;

    callback(null, isMatch);
  });
};

module.exports.selectRole = function(roleId, callback) {
  //console.log(roleId,"sdfghjk")
  con.query(tableSchema.tables.role.getUser + mysql.escape(roleId), callback);
};

module.exports.searchPatient = function(email, callback) {
  console.log(email, "mkmkkjkjkjkjkjkjkjk");
  con.query(tableSchema.tables.patient.getData + mysql.escape(email), callback);
};

/* search patient for MLT*/
module.exports.searchPatientforMLT = function(email, callback) {
  console.log(email, "ghggj");
  con.query(
    tableSchema.tables.prescription.getPatientMLT + mysql.escape(email),
    callback
  );
};

module.exports.doctorDetails = function(callback) {
  console.log("mkmkkjkjkjkjkjkjkjk");
  con.query(tableSchema.tables.doctor.getUser, callback);
};

module.exports.doctorDetailsByField = function(field, callback) {
  con.query(
    tableSchema.tables.doctor.getUserByField + mysql.escape(field),
    callback
  );
};

module.exports.doctorProfile = function(email, callback) {
  console.log(email);
  con.query(tableSchema.tables.doctor.profile + mysql.escape(email), callback);
};

module.exports.patientProfile = function(email, callback) {
  console.log(email);
  con.query(tableSchema.tables.patient.profile + mysql.escape(email), callback);
};

module.exports.addPatientBasichealthInfo = function(data, callback) {
  con.query(
    tableSchema.tables.patientbasichealthinfo.adduser,
    [[data]],
    callback
  );
};

module.exports.viewPatientBasicInfo = function(data, callback) {
  con.query(
    tableSchema.tables.patientbasichealthinfo.getData + mysql.escape(data),
    callback
  );
};

module.exports.ViewSheduling = function(doctorRegNo, callback) {
  console.log(doctorRegNo, "qqqqqqqqq");
  con.query(
    tableSchema.tables.appSchedule.viewScheduling + mysql.escape(doctorRegNo),
    callback
  );
};

module.exports.ViewMLTProfile = function(email, callback) {
  console.log(email);
  con.query(tableSchema.tables.mlt.viewMLT + mysql.escape(email), callback);
};

module.exports.SelectMedicine = function(medicine, callback) {
  console.log(medicine, "sdhjfbvsdijbviudf");
  con.query(
    tableSchema.tables.Medicine.getMedicine + mysql.escape(medicine),
    callback
  );
};

module.exports.selectDisese = function(Disease, callback) {
  console.log(Disease, "sdcsdcsdcsd");
  con.query(
    tableSchema.tables.diseasedetail.getDisease + mysql.escape(Disease),
    callback
  );
};

module.exports.viewAppointsments = function(docRegNo, callback) {
  console.log(docRegNo, "sdcsdcsdcsd");
  con.query(
    tableSchema.tables.appointment.getappointments + mysql.escape(docRegNo),
    callback
  );
};

module.exports.approveAppointment = function(appId, callback) {
  con.query(
    tableSchema.tables.appointment.approveappointment + mysql.escape(appId),
    callback
  );
};

module.exports.viewDocApp = function(docRegNo, email, callback) {
  con.query(
    `SELECT * FROM appointment a, users u, patient p, patientbasichealthinfo pb where u.NIC = p.NIC AND a.patientId = p.patientId AND p.patientId = pb.patientId AND u.email ='${email}' and a.doctorRegNo='${docRegNo}'`,
    callback
  );
};

module.exports.ViewPrescription = function(patientId, callback) {
  con.query(
    tableSchema.tables.Prescription.getUser + mysql.escape(patientId),
    callback
  );
};

module.exports.patientViewCurrentState = function(email, callback) {
  con.query(
    `SELECT * from Prescription pr, currentState c, users u, doctor d, appointment a WHERE pr.prescriptionId=c.prescriptionId AND pr.appId=a.appId AND pr.doctorRegNo=d.doctorRegNo AND d.NIC=u.NIC AND u.email='${email}'`,
    callback
  );
};

module.exports.doctorViewCurrentState = function(email, callback) {
  con.query(
    `SELECT * from Prescription pr, currentState c, users u, doctor d, appointment a WHERE pr.prescriptionId=c.prescriptionId AND pr.appId=a.appId AND pr.doctorRegNo=d.doctorRegNo AND d.NIC=u.NIC AND u.email='${email}'`,
    callback
  );
};
