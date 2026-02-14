import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import 'dotenv/config';

import authRoutes from "./routes/authRoutes.js";
import usersRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Terlalu banyak permintaan dari IP ini, coba lagi nanti.",
});
app.use(limiter);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API UKM OXIGEN is Running security...");
});

app.use("/api/auth", authRoutes);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running securely on http://localhost:${PORT}`);
});
