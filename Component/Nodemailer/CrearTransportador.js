const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    service:process.env.SERVICE,
    auth: {
      user: process.env.CORREO, 
      pass: process.env.PASS, 
    },
  });
  module.exports = {transporter};