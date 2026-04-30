import Contact from "../models/Contact.js";

export const saveContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving contact" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching contacts" });
  }
};