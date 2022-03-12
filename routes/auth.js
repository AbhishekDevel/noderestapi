const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel');
const {registrationvalidate, loginvalidate} = require('../validation/validationSchema')

router.post('/register', async (req,res) =>{
  
  const {error} = registrationvalidate(req.body);
  if (error){
    return res.status(400).send(error.details[0].message);
  };
  
  await mongoose.connect(process.env['MONGO_URL']);
  
  const emailExist = await userModel.findOne({email: req.body.email})
  if (emailExist) {
    return res.status(400).send("Email is already exist")
  };
  const mobileExist = await userModel.findOne({mobile: req.body.mobile})
  if (mobileExist) {
    return res.status(400).send("Mobile number is already exist")
  };
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt)
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
    mobile: req.body.mobile,
    refco: req.body.refco
  });
  try{
    await user.save();
    res.status(200).json({
      message: "User is created"
    });
  }catch(err){
    res.status(400).json({
      message: err
    });
  };
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

router.post('/setpin', async (req,res) => {
  await mongoose.connect(process.env['MONGO_URL']);
  try{
    const user = await userModel.findOneAndUpdate({email: req.body.email},{pin: req.body.pin});
    if(user !== null){
      res.status(200).json({
        message: "PIN is set for user"
      });
    }else{
      res.status(400).json({
        message: "PIN is not se for user"
      })
    }
  }catch(err){
    res.status(400).json({
      message: err
    });
  };
});


router.post('/login', async (req,res) =>{
  const {error} = loginvalidate(req.body);
  if (error){
    return res.status(400).send(error.details[0].message);
  };
  await mongoose.connect(process.env['MONGO_URL']);
  
  const user = await userModel.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).send("Email is incorrect");
  };
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if(!validpass) return res.status(400).send("Password is not correct");

  const token = jwt.sign({_id: user._id}, process.env["JWTKEY"])
  res.header('auth-token', token).send(token);
})



module.exports = router;