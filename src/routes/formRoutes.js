import express from "express";
import formSubmission from "../controllers/formController.js";
import verifyAccount from "../controllers/verifyEmail.js";

const router = express.Router();

router.post("/:email", formSubmission);
router.get("/verify", verifyAccount);

router.get("/health-check", (req, res) => {
  res.status(200).json({ status: "UP" });
});

export default router;
