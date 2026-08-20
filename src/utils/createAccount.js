import jwt from "jsonwebtoken";
import smtpConfig from "../config/smpt.config.js";
import transporter from "../config/transporter.js";

const CREATE_ACCOUNT = async (email) => {
  try {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "15m" }
    );

    const baseUrl = process.env.BASE_URL || "https://form2mail.amnkmr.xyz";
    const verifyUrl = `${baseUrl}/api/v.01/verify?token=${token}`;

    console.log("Generated Verification URL:", verifyUrl);

    const senderAddress = smtpConfig.from?.address || process.env.SMTP_USER || process.env.EMAIL_USER;
    const senderName = smtpConfig.from?.name || "Form2Mail";

    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderAddress}>`,
      to: email,
      subject: `Verify Your Form2Mail Account`,
      text: `Please verify your account by visiting: ${verifyUrl}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb;">Welcome to Form2Mail</h2>
        <p>Click the button below to verify your email address and activate form submissions:</p>
        <div style="margin: 24px 0;">
          <a href="${verifyUrl}"
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Verify Account
          </a>
        </div>
        <p style="color: #6b7280; font-size: 0.875rem;">If the button doesn't work, copy and paste this URL into your browser:<br/><a href="${verifyUrl}">${verifyUrl}</a></p>
      </div>`,
    });

    console.log("Verification mail sent successfully: %s", info.messageId);
    return {
      success: true,
      message: "Mail sent successfully",
      messageId: info.messageId
    };
  } catch (error) {
    console.error("Error sending account verification email:", error);
    return {
      success: false,
      message: "Failed to send email",
      error: error.message
    };
  }
};

export default CREATE_ACCOUNT;
