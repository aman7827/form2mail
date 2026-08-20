import smtpConfig from "../config/smpt.config.js";
import transporter from "../config/transporter.js";

const SEND_DATA_TO_EMAIL = async (email, formData) => {
  try {
    const tableRows = Object.entries(formData)
      .map(
        ([key, value]) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">${key}</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${value}</td>
          </tr>
        `
      )
      .join("");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">New Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="padding: 10px; background-color: #2563eb; color: white; border: 1px solid #2563eb; text-align: left;">Field</th>
              <th style="padding: 10px; background-color: #2563eb; color: white; border: 1px solid #2563eb; text-align: left;">Value</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        <p style="color: #9ca3af; font-size: 0.8rem; margin-top: 20px;">Sent securely via Form2Mail</p>
      </div>
    `;

    const senderAddress = smtpConfig.from?.address || process.env.SMTP_USER || process.env.EMAIL_USER;
    const senderName = smtpConfig.from?.name || "Form2Mail";

    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderAddress}>`,
      to: email,
      subject: `Form Submission Received`,
      html: htmlBody
    });

    console.log("Form data email sent: %s", info.messageId);

    return {
      success: true,
      message: "Form data email sent successfully",
      messageId: info.messageId
    };
  } catch (error) {
    console.error("Error sending form data email:", error);
    throw error;
  }
};

export default SEND_DATA_TO_EMAIL;
