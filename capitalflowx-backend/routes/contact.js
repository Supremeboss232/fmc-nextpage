const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Contact = require("../models/Contact");

dotenv.config();
const router = express.Router();

// Contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = await Contact.create({ name, email, message });

    // Send notification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CapitalFlowX Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      text: message,
    });

    res.json({ msg: "Message received", contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
