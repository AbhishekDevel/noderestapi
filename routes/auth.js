const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../model/userModel');


async function main(req) {
  await mongoose.connect(process.env['MONGO_URL']);
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    refco: req.body.refco
  });
  await user.save();
};

async function setpin(req){
  await mongoose.connect(process.env['MONGO_URL']);
  const user = await userModel.findOneAndUpdate({email: req.body.email},{pin: req.body.pin})
  console.log(user)
};

router.post('/register', (req,res) =>{
  main(req).catch(err => console.log(err));
  res.status(200).json({
    message: 'added to list',  
  });
});

router.post('/otp', (req,res) =>{
  if(req.body.otp == "1234"){
    res.status(200).json({
      message: 'OTP is correct'
    });
  }else{
    res.status(400).json({
      message: 'Incorrect OTP'
    }
    );
  };
});

router.post('/setpin', (req,res) =>{
  setpin(req).catch(err =>{
    res.status(400).json({
    message: 'Failed to set pin'
    });
  });
  res.status(200).json({
    message: 'PIN have set successfully'
  })
})

module.exports = router;