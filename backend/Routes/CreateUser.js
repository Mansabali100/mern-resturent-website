const express = require ('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "My Name Is Mansab And I am Developer$#"

router.post('/creatuser',
    body("email").isEmail(),
    body("password",'incorrect password').isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
    async (req, res) => {
      const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()});
  }

  
  const salt = await bcrypt.genSalt(5);
  let secPassword = await bcrypt.hash(req.body.password,salt)

      try {
         User.create({
          name: req.body.name,
          password: secPassword,
          email: req.body.email,
          location: req.body.location
        });
        res.json({ success: true });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    });


   
router.post("/loginuser",
body("email").isEmail(),
body("password").isLength({ min: 5 }).withMessage("wrong password"),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let email = req.body.email;
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try Login with correct email" });
    }
      const pwd = await bcrypt.compare(req.body.password,userData.password)
    if (!pwd) {
      return res.status(400).json({ errors: "Try Login with correct password" });
    }

    const data = {
          user:{
              id:userData.id
          }
    }

    const authToken = jwt.sign(data,jwtsecret)

    return res.json({ success: true,authToken:authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
}
);

module.exports = router;
