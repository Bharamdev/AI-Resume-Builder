import app from "./app.js";
import { connectDB } from "./db/index.js";
import { config } from "dotenv";
config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET_KEY'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

const PORT = process.env.PORT || 5003;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
}).catch(err => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});
