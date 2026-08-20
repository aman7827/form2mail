import dotenv from "dotenv";
dotenv.config();

const user = process.env.SMTP_USER || process.env.EMAIL_USER;
const pass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;
const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = parseInt(process.env.SMTP_PORT || "465");
const secure = process.env.SMTP_SECURE !== "false";

const smtpConfig = {
  smtp: {
    service: "gmail",
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  from: {
    address: process.env.FROM_EMAIL || user,
    name: process.env.FROM_NAME || "Form2Mail"
  }
};

if (!user || !pass) {
  console.warn("⚠️ SMTP credentials missing - email functionality disabled");
  smtpConfig.disabled = true;
} else {
  console.log("✅ SMTP configured for:", user);
}

export default smtpConfig;
