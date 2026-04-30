import express from "express";
import { saveContact, getContacts } from "../controllers/contactController.js";

const router = express.Router();

router.post("/send", saveContact);
router.get("/all", getContacts);

export default router;