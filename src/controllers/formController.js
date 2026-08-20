import Submission from "../models/Submission.js";
import transporter from "../config/mailer.js";

export const submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const submission = await Submission.create({
      name,
      email,
      message
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Form Submission",
      html: `
        <h2>New Submission</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `
    });

    res.status(201).json({
      success: true,
      submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
