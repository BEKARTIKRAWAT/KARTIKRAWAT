import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window
  message: {
    status: 429,
    message: "Too many requests. Please try again after 15 minutes."
  }
});

export default limiter;