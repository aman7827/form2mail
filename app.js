import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import healthRoutes from "./src/routes/healthRoutes.js";
import formRoutes from "./src/routes/formRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Trust reverse proxy for Render / Cloudflare rate limiter
app.set("trust proxy", 1);

// Security and Optimization Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(cors());
app.use(compression());

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

// Serve Static Files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Root route - serve landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing.html"));
});

// Health check and API routes
app.use("/health", healthRoutes);
app.use("/api/v.01", formRoutes);

export default app;
