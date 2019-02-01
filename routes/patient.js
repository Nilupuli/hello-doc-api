const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');
var randomstring = require("randomstring");

router.post("/addPatient", function (req, res) {

    var patientId = randomstring.generate(7);


    const patientData = [
        patientId,
        req.body.dob,
        req.body.occupation,
        req.body.bloodType,
        req.body.maritalState,
        req.body.height,
        req.body.weight,
        req.body.NIC,
       
    ]
    database.addPatient(patientData, function (err, result) {
        console.log(patientData,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Patient added" });
        }
    });
})

router.post("/searchPatient",function(req,res,next){
    const NIC  = req.body.NIC;

    database.searchPatient(NIC,function(err,result){
        console.log(result);
        if(err){
            console.log(err);
            res.json({success : false , massage : "Error something wrong"});
        }else{
            res.json({result})
        }
    })
})

router.post("/profile",function(req,res){

    database.patientProfile(req.body.email,function(err,result){
        if(err){
            console.log(err);
        }else{
            res.json({success: true, msg: result})
        }
    })
})


router.post("/addpatientbasichealthinfo",function(req,res){

    const email = req.body.email;
    console.log(email,"bnxcbxcb")
    database.patientProfile(email,function(err,result){
        if(err){
            console.log(err);
        }else{
          const Id = result[0].patientId;
           console.log(Id);

           const basicInfo = [
                Id,
                req.body.currentDate,
                req.body.cholestorol,
                req.body.socialDisease,
                req.body.allergy,
                req.body.bloodPresure,
                req.body.bloodSugar
           ]

            console.log(basicInfo,"dssdasdas")

            database.addPatientBasichealthInfo(basicInfo,function(err,result){
                if(err){
                    console.log(err)
                    res.json({success: false})
                }else{
                    res.json({success: true})
                }
            })
          
            
        }
    })

    // const healthInfo = {


    // }

    // database.addPatientbasichealthinfo()
})


router.post("/viewbasichealthinfo",function(req,res){
    const email = req.body.email;
    console.log(email,"bnxcbxcb")
    console.log(req.body,"bnxcbxcb")
    database.patientProfile(email,function(err,result){
        if(err){
            console.log(err);
        }else{
          const Id = result[0].patientId;
           console.log(Id);

           database.viewPatientBasicInfo(Id,function(err,result){
               if(err){
                   console.log(err);
                   res.json({success: false})
               }else{
                res.json({success: true,data:result})
               }

           })
        }

    })

})



module.exports = router;
