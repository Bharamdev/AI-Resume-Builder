import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
// In development we allow all origins (so Vite dev server can talk to the API)
// In other environments we respect the ALLOWED_SITE env (comma separated list)
let allowedOrigins;

if (process.env.NODE_ENV === "Dev" || process.env.NODE_ENV === "development") {
  allowedOrigins = true; // Allow all origins in development
} else if (process.env.ALLOWED_SITE && process.env.ALLOWED_SITE.trim()) {
  allowedOrigins = process.env.ALLOWED_SITE.split(",").map(url => url.trim());
} else {
  // Fallback: allow all in production if ALLOWED_SITE not set (temporary for testing)
  allowedOrigins = true;
  console.warn("⚠️  ALLOWED_SITE not set. Allowing all origins (not recommended for production)");
}

console.log("CORS Configuration:", {
  NODE_ENV: process.env.NODE_ENV,
  allowedOrigins: Array.isArray(allowedOrigins) ? allowedOrigins : "all"
});

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

export default app;
