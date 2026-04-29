import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username }, "secret123", {
      expiresIn: "7d",
    });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials" });
};