import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 10000;

/* ✅ CORS FIX */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-resume-builder-3k1wqcm57-kunal-patels-projects-0d561fc0.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* IMPORTANT: preflight */
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Server is Live...");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/newAi", aiRouter);

/* START SERVER */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
