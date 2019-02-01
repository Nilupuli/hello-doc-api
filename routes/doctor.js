const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require('../databaseHandle/connectDatabase');
var randomstring = require("randomstring");

router.post("/addDoctor", function (req, res) {
    console.log(req.body,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    const doctorData = [
        req.body.doctorRegNo,
        req.body.doctorField,
        req.body.doctorDesignation,
        req.body.workAddress,
        req.body.NIC,

    ]
    database.addDoctor(doctorData, function (err, result) {
        if (err) {
            console.log(err);
            if(err.sqlState =="23000"){
                res.json({success : false , msg : "already registerd"});
                return;
            }
            res.json({ success: false, msg: "something wrong please try again" });
        }
        else {
            res.json({ success: true, msg: "Doctor added" });
        }
    });
})

router.get('/viewdoctor',function(req,res){
    console.log("nbbjhbhub");
    database.doctorDetails(function(err,result){
        if(err){
            console.log(err)
        }else{
            res.json({ success: true, msg: result });
        }
    })
})
//find all doctors and by field
router.get('/viewdoctor/:field',function(req,res){
    var field = req.params.field
    console.log(field,"bbbbbbb")
    if(field){
        database.doctorDetailsByField(field,function(err,result){
            if(err){
                console.log(err)
            }else{
                res.json({ success: true, msg: result });
            }
        })

    }else{
        database.doctorDetails(function(err,result){
            if(err){
                console.log(err)
            }else{
                res.json({ success: true, msg: result });
            }
        })
    }

})

router.post('/profile',function(req,res){
      console.log(req.body.email,"mnjnjh")
    database.doctorProfile(req.body.email,function(err,result){
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.json({success: true, msg: result})
        }
    })
})

router.post('/appScheduling',function(req,res){
    console.log(req.body.email,"sdasdasdasdasdas")
    database.doctorProfile(req.body.email,function(err,result){
        if(err){
            console.log(err);
            
        }else{
            console.log(result[0])
            const Id = result[0].doctorRegNo;
            console.log(result)
            var appScheduleId  = randomstring.generate(7);
            const appShedule = [
                appScheduleId,
                req.body.noOfAppointments,
                req.body.dateTimeIn,
                req.body.dateTimeOut,
                req.body.date,
                Id,
            ]
            console.log(appShedule);
            database.addAppSchedule(appShedule,function(err,result){
                if(err){
                    console.log(err);
                    res.json({success : false})
                }else{
                    res.json({success : true})
                }
            })

        }
    })
})




module.exports = router;