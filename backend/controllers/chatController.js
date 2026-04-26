import Groq from "groq-sdk";
import Message from "../models/Message.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are Kartik's AI Assistant on his portfolio website.
ONLY answer questions about Kartik Rawat. Nothing else.

About Kartik:
- Full Stack Developer fresher from Delhi
- Skills: HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB
- Education: Diploma in CS&E, Govt. Polytechnic Beeronkhal, Pauri Garhwal (2022-2025)
- Email: kartikrawat1333@gmail.com
- Phone: 9389690052
- LinkedIn: linkedin.com/in/bekartikrawat
- GitHub: github.com/bekartikrawat
- Portfolio: bekartikrawat.vercel.app
- Goals: Get internship/job, become Full Stack + AI Developer
- Projects: Portfolio Website, Restaurant Website, Chat Application

STRICT RULES:
- If someone asks general questions (like "how to find jobs", "what is CSS"), politely say: "I can only answer questions about Kartik Rawat. Try asking about his skills, projects, or how to contact him!"
- Never give general advice or tutorials
- Always keep focus on Kartik
- Be friendly and concise`;

export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
};

export const sendMessage = async (req, res) => {
  const { message, sessionId } = req.body;

  // Pehle ki saari history fetch karo
  const history = await Message.find({ sessionId }).sort({ createdAt: 1 });

  // History ko Groq format mein convert karo
  const conversationHistory = history.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  // User message save karo
  const userMsg = await Message.create({
    role: "user",
    content: message,
    sessionId
  });

  // AI ko full history ke saath call karo
  const aiResponse = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: message }
    ],
  });

  const aiMsg = await Message.create({
    role: "assistant",
    content: aiResponse.choices[0].message.content,
    sessionId,
  });

  res.json({ userMsg, aiMsg });
};