import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 2077;

/* --------------------
   MIDDLEWARES
-------------------- */


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-resume-builder-kx77.vercel.app/",
      
    ],
    credentials: true,
  })
);

/* ✅ Handle preflight requests safely */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

/* Body parser */
app.use(express.json({ limit: "10mb" }));

/* --------------------
   ROUTES
-------------------- */
app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

/* --------------------
   START SERVER
-------------------- */
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
