const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const database = require("../databaseHandle/connectDatabase");
var randomstring = require("randomstring");

router.post("/addPrescription", function(req, res) {
  const prescriptionData = [
    req.body.issueDate,
    req.body.expireDate,
    req.body.medicineDosage,
    req.body.doctorRegNo,
    req.body.recommandedTest,
    req.body.medicineQty
  ];
  const medicine = [req.body.madicineName];

  const disease = [req.body.diseaseDescription, req.body.issueDate];
  // console.log(medicine, ",,,,,,,,,,,,,,,,,,,,,,,,");
  // console.log(disease, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  // console.log(prescriptionData, "mmmmmmmmmmmmmmmmmmm");
  try {
    database.SelectMedicine(req.body.madicineName, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          database.addMedicine(medicine, function(err, result) {
            if (err) {
              console.log(err);
              throw err;
            } else {
              console.log(result);
              database.SelectMedicine(req.body.madicineName, function(
                err,
                result1
              ) {
                if (err) {
                  console.log(err);
                  throw err;
                } else {
                  console.log(result1[0].medicineId, "qqqqqqqqqqqqqqqqqqqqq");

                  prescriptionData.push(result1[0].medicineId);
                  // res.json({state:true,data:prescriptionData})
                  database.addDiseasedetail(disease, function(err, result2) {
                    if (err) {
                      console.log(err);
                      throw err;
                    } else {
                      database.selectDisese(
                        req.body.diseaseDescription,
                        function(err, result3) {
                          // console.log("gtgtgtgt");
                          if (err) {
                            console.log(err);
                            throw err;
                          } else {
                            console.log(result3.length, prescriptionData);
                            prescriptionData.push(
                              result3[result3.length - 1].diseaseDetailId
                            );
                            // res.json({
                            //   pres: prescriptionData
                            // });
                            database.addPrescription(prescriptionData, function(
                              err,
                              result4
                            ) {
                              // console.log(result.medicineId,"qqqqqqqqqqqqqqqqqqqqq")
                              if (err) {
                                console.log(err);
                                res.send({
                                  status: false,
                                  data: "docreg no error"
                                });
                                return;
                              } else {
                                res.send({ status: true });
                              }
                            });
                          }
                        }
                      );
                    }
                  });
                }
              });
            }
          });
        } else {
          prescriptionData.push(result[0].medicineId);
          console.log(
            result[0].medicineId,
            "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
          );
          //res.json({data:prescriptionData})
          database.addDiseasedetail(disease, function(err, result1) {
            if (err) {
              console.log(err);
              throw err;
            } else {
              database.selectDisese(req.body.diseaseDescription, function(
                err,
                result2
              ) {
                // console.log("gtgtgtgt");
                if (err) {
                  console.log(err);
                  throw err;
                } else {
                  console.log(result2.length);
                  prescriptionData.push(
                    result2[result2.length - 1].diseaseDetailId
                  );
                  // res.json({
                  //   pres: prescriptionData
                  // });
                  database.addPrescription(prescriptionData, function(
                    err,
                    result
                  ) {
                    // console.log(prescriptionData,"scs");
                    if (err) {
                      console.log(err);
                      res.send({ status: false, data: "docreg no error" });
                      return;
                    } else {
                      res.send({ status: true });
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  } catch (err) {
    throw err;
  }

  // database.addPrescription(prescriptionData, function (err, result) {
  //     if (err) {
  //         console.log(err);
  //         if(err.sqlState =="23000"){
  //             res.json({success : false , msg : "already registerd"});
  //             return;
  //         }
  //         res.json({ success: false, msg: "something wrong please try again" });
  //     }
  //     else {
  //         res.json({ success: true, msg: "Prescription added" });
  //     }
  // });
});

module.exports = router;
