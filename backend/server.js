import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import adminRoutes from "./routes/adminRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authMiddleware from "./middleware/auth.js";
import limiter from "./middleware/rateLimit.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

// MongoDB Connection
connectDB();

// Middleware
app.use(cors({
  origin: "*"
}));
app.set('trust proxy', 1);
app.use(express.json());
app.use(limiter);

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/admin", express.static(path.join(__dirname, "../admin")));
app.use("/", express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/admin", authMiddleware, adminRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port  https://kartikrawat.onrender.com

PORT} 🚀`));