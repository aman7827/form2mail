import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";

import healthRoutes from "./src/routes/healthRoutes.js";
import formRoutes from "./src/routes/formRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use("/health", healthRoutes);
app.use("/api/forms", formRoutes);

export default app;
