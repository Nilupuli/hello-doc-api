const tables = {
  role: {
    createTable:
      "CREATE TABLE role(" +
      "roleId varchar(10)," +
      "roleName	varchar(20)," +
      "CONSTRAINT pk_role PRIMARY KEY (roleId))",
    adduser: "INSERT INTO role (roleId,roleName) VALUE ?",
    getUser: "SELECT roleId FROM role where roleId = "
  },

  users: {
    createTable:
      "CREATE TABLE users (" +
      " NIC VARCHAR(15)," +
      " firstName VARCHAR(255)," +
      "lastName VARCHAR(255)," +
      " contactNo INT(10)," +
      "email VARCHAR(255) unique," +
      "password VARCHAR(32)," +
      "addNo VARCHAR(255)," +
      "addStreet VARCHAR(255)," +
      " addCity VARCHAR(255)," +
      "roleId varchar(10)," +
      "CONSTRAINT pk_users PRIMARY KEY (NIC)," +
      "CONSTRAINT fk_users_role FOREIGN KEY (roleId) REFERENCES role(roleId) ON DELETE CASCADE)",
    adduser:
      "INSERT INTO users(NIC,firstName,lastName,contactNo,email,password,addNo,addStreet,addCity,roleId) VALUE ?",
    getUser: "SELECT * FROM users where ?",
    SelectUser: "SELECT * from users WHERE email = ",
    deleteUser: "DELETE FROM users WHERE email = "
  },

  mlt: {
    createTable:
      "CREATE TABLE mlt (" +
      "mltRegNo varchar(10)," +
      "NIC VARCHAR(15)," +
      "CONSTRAINT pk_mlt PRIMARY KEY (mltRegNo)," +
      "CONSTRAINT fk_mlt_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE)",
    adduser: "INSERT INTO mlt(NIC,mltRegNo)VALUE ?",
    getUser: "SELECT * FROM mlt where ?",
    viewMLT: "SELECT * FROM users u JOIN mlt m ON u.NIC=m.NIC WHERE email ="
  },

  patient: {
    createTable:
      "CREATE TABLE patient (" +
      "patientId INT," +
      "dob DATE," +
      "occupation VARCHAR(50)," +
      "bloodType VARCHAR(10)," +
      "maritalState BOOLEAN," +
      " height DECIMAL(5,2)," +
      "weight DECIMAL(5,2)," +
      " NIC VARCHAR(15)," +
      "CONSTRAINT pk_patient PRIMARY KEY (patientId)," +
      "CONSTRAINT fk_patient_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE)",
    adduser:
      "INSERT INTO patient(dob,occupation,bloodType,maritalState,height,weight,NIC)VALUE ?",
    getUser: "SELECT * FROM patient where email =",
    profile:
      "SELECT * FROM patient p JOIN users u ON p.NIC = u.NIC where email = ",
    getData:
      "SELECT * FROM appointment a, users u, patient p, patientbasichealthinfo pb where u.NIC = p.NIC AND a.patientId = p.patientId AND p.patientId = pb.patientId AND u.email ="
  },

  doctor: {
    createTable:
      "CREATE TABLE doctor (" +
      " doctorRegNo VARCHAR(15)," +
      "doctorField VARCHAR(30)," +
      "doctorDesignation VARCHAR(50)," +
      "  workAddress VARCHAR(50)," +
      " NIC VARCHAR(15)," +
      " CONSTRAINT pk_doctor PRIMARY KEY (doctorRegNo)," +
      "CONSTRAINT fk_doctor_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE )",

    adduser:
      "INSERT INTO doctor(doctorRegNo,doctorField,doctorDesignation,workAddress,NIC)VALUE ?",
    getUser: "SELECT * FROM users u JOIN doctor d ON u.NIC = d.NIC",
    getUserByField:
      "SELECT * FROM users u JOIN doctor d ON u.NIC = d.NIC WHERE doctorField = ",
    profile:
      "SELECT * FROM users u JOIN doctor d ON u.NIC = d.NIC WHERE email =  "
  },

  frontdesk: {
    createTable:
      "CREATE TABLE frontdesk(" +
      "NIC varchar(15)," +
      "frontDeskId INT," +
      "CONSTRAINT pk_frontdesk PRIMARY KEY (frontDeskId)," +
      "CONSTRAINT fk_frontdesk_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE)",

    adduser: "INSERT INTO frontdesk (NIC) VALUE ?",
    getUser: "SELECT * FROM frontdesk where ?"
  },

  patientbasichealthinfo: {
    createTable:
      "CREATE TABLE patientbasichealthinfo(" +
      " patientId INT," +
      " currentDate DATE," +
      "cholestorol DECIMAL(5,2)," +
      " socialDisease VARCHAR(75)," +
      " allergy VARCHAR(75)," +
      " bloodPresure DECIMAL(5,2)," +
      "bloodSugar DECIMAL(5,2)," +
      " CONSTRAINT pk_patientbasichealthinfo PRIMARY KEY ()," +
      " CONSTRAINT fk_patientbasichealthinfo_patient FOREIGN KEY (patientId) REFERENCES patient(patientId) ON DELETE CASCADE )",

    adduser:
      "INSERT INTO patientbasichealthinfo(patientId,currentDate,cholestorol,socialDisease,allergy,bloodPresure,bloodSugar) VALUE ?",
    getData:
      "SELECT * FROM user u patient p patientbasichealthinfo pb where u.NIC = p.NIC AND p.patientId = pb.patientId AND pb.patientId = "
  },

  //   labreport: {
  //     createTable:
  //       "CREATE TABLE labreport(" +
  //       " reportNo INT(100)," +
  //       "reportName VARCHAR(50)," +
  //       "  pdfLocation VARCHAR(100)," +
  //       "CONSTRAINT pk_labreport PRIMARY KEY(reportNo)",

  //     adduser: "INSERT INTO labreport(reportNo,reportName,pdfLocation)VALUE ?",
  //     getUser: "SELECT * FROM labreport where ?"
  //   },

  diseasedetail: {
    createTable:
      "CREATE TABLE diseasedetail(" +
      " diseaseDetailId INT," +
      " diseaseDescription VARCHAR(100)," +
      "diseaseDate DATE," +
      " CONSTRAINT pk_diseasedetail PRIMARY KEY(diseaseDetailId))",
    adduser: "INSERT INTO diseasedetail(diseaseDescription,diseaseDate)VALUE ?",
    getDisease: "SELECT * FROM diseasedetail where diseaseDescription ="
  },

  Medicine: {
    createTable:
      "CREATE TABLE Medicine (" +
      "medicineId INT," +
      "medicineName VARCHAR(30)," +
      "CONSTRAINT pk_medicineId PRIMARY KEY (medicineId))",

    addMedicine: "INSERT INTO Medicine(medicineName) VALUE ?",
    getMedicine: "SELECT * FROM Medicine where medicineName ="
  },

  appSchedule: {
    createTable:
      "CREATE TABLE appSchedule (" +
      "appScheduleId INT," +
      "noOfAppointments INT," +
      "TimeIn varchar(50)," +
      "TimeOut varchar(50)," +
      "doctorRegNo varchar(15)," +
      "date varchar(15)," +
      "CONSTRAINT pk_appSchedule PRIMARY KEY (appScheduleId)," +
      "CONSTRAINT fk_appSchedule_doctor FOREIGN KEY(doctorRegNo) REFERENCES doctor(doctorRegNo) ON DELETE CASCADE)",

    addAppSchedule:
      " INSERT INTO appSchedule(noOfAppointments,TimeIn,TimeOut,doctorRegNo,date)VALUE ?",
    getUser: "SELECT * FROM appSchedule where ?",
    viewScheduling:
      "SELECT * FROM doctor d,appSchedule aa WHERE d.doctorRegNo = aa.doctorRegNo AND d.doctorRegNo = "
  },

  appointment: {
    createTable:
      "CREATE TABLE appointment(" +
      "appId INT," +
      "appDate DATE," +
      "appTime TIME," +
      "appStatus VARCHAR(100)," +
      "patientId VARCHAR(15)," +
      "doctorRegNo VARCHAR(15)," +
      " CONSTRAINT pk_appointment PRIMARY KEY(apptId)" +
      " CONSTRAINT fk_appointment_patient FOREIGN KEY(patientId) REFERENCES patient(patientId) ON DELETE CASCADE )" +
      " CONSTRAINT fk_appointment_doctor FOREIGN KEY(doctorRegNo) REFERENCES doctor (doctorRegNo) ON DELETE CASCADE )",

    addappointment:
      " INSERT INTO appointment(appDate,appTime,doctorRegNo,patientId)VALUE ?",
    getappointments: "SELECT * FROM appointment where doctorRegNo =",
    approveappointment: "UPDATE appointment SET appStatus = 1 where appId = "
  },

  Prescription: {
    createTable:
      "CREATE TABLE prescription (" +
      "prescriptionId INT(11)," +
      "issueDate DATE," +
      "expireDate DATE," +
      "doctorRegNo VARCHAR(15)," +
      "diseaseDetailId INT(11)," +
      "recommandedTest VARCHAR(200)," +
      "medicineDosage VARCHAR(200)," +
      "medicineQty VARCHAR(200)," +
      "medicineId INT(11)," +
      "CONSTRAINT pk_prescription PRIMARY KEY (prescriptionId)," +
      "CONSTRAINT fk_prescription_doctorRegNo FOREIGN KEY(doctorRegNo) REFERENCES doctor(doctorRegNo)," +
      "CONSTRAINT fk_prescription_diseasedetail FOREIGN KEY(diseaseDetailId) REFERENCES diseasedetail(diseaseDetailId)," +
      "CONSTRAINT fk_prescription_medicine FOREIGN KEY(medicineId) REFERENCES Medicine(medicineId))",

    addprescription:
      "INSERT INTO Prescription(appId,issueDate,expireDate,medicineDosage,doctorRegNo,recommandedTest,medicineQty,medicineNo,diseaseDetailId)VALUE?",
    getUser:
      "select * from Prescription p, appointment a WHERE p.appId=a.appId AND a.patientId=  ",
    getPatientMLT:
      "SELECT * FROM users u, patient p, appointment a, Prescription pr WHERE u.NIC = p.NIC AND p.PatientId = a.PatientId AND a.prescriptionId = pr.prescriptionId WHERE email=?"
  },

  currentState: {
    createTable:
      "CREATE TABLE currentState (" +
      "prescriptionId int(11), " +
      "duration INT(10), " +
      "currentStateDate varchar(50)," +
      "state VARCHAR(100)," +
      "comment varchar(200), " +
      "CONSTRAINT pk_currentStateDate PRIMARY KEY (currentStateDate), " +
      "CONSTRAINT fk_currentState_prescription FOREIGN KEY(prescriptionId) REFERENCES Prescription(prescriptionId))",

    adduser:
      "INSERT INTO currentState (prescriptionId,duration,currentStateDate,state,comment)VALUE?"
  }

  //   payment: {
  //     createTable:
  //       "CREATE TABLE payment(" +
  //       "paymentId VARCHAR(50)," +
  //       "patientId VARCHAR(15)," +
  //       "appId VARCHAR(15)," +
  //       " payDate DATE," +
  //       " payAmount DECIMAL(5,2)," +
  //       "states VARCHAR(10)," +
  //       "reportNo INT(100)," +
  //       "CONSTRAINT pk_paymentId PRIMARY KEY (paymentId)," +
  //       "CONSTRAINT fk_payment_patient FOREIGN KEY(patientId) REFERENCES patient(patientId) ON DELETE CASCADE," +
  //       "CONSTRAINT fk_payment_appointment FOREIGN KEY(appId) REFERENCES appointment(appId) ON DELETE CASCADE," +
  //       "CONSTRAINT fk_payment_labreport FOREIGN KEY(reportNo) REFERENCES labreport(reportNo) ON DELETE CASCADE)",

  //     adduser:
  //       "INSERT INTO currentState (prescriptionId,duration,currentStateDate,state,comment)VALUE?"
  //   }
};

module.exports.tables = tables;

module.exports.tablesname = [
  "role",
  "users",
  "mlt",
  "patient",
  "doctor",
  "frontdesk",
  "appSchedule",
  "patientbasichealthinfo",
  "diseasedetail",
  "Medicine",
  "appointment",
  "Prescription",
  "currentState"

  // "labreport",
];
