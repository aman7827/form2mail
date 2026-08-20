import nodemailer from "nodemailer";
import smtpConfig from "./smpt.config.js";

// Transporter Using Nodemailer
const transporter = nodemailer.createTransport(smtpConfig.smtp);

// Verify connection on startup (skip during testing)
if (process.env.NODE_ENV !== "test" && !smtpConfig.disabled) {
  transporter.verify()
    .then(() => console.log("✅ SMTP Connection Verified"))
    .catch(err => console.error("❌ SMTP Connection Warning:", err.message));
}

export default transporter;
