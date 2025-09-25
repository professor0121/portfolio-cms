// controllers/contact.controller.js
import * as contactService from "../services/contact.service.js";
import { sendEmail } from "../utils/email.utils.js";
import dotenv from "dotenv";
dotenv.config();
    export const createContact = async (req, res) => {
    try {
        const contact = await contactService.createContactService(req.body);
        await sendEmail({
        to: contact.email,
        subject: `Thank you for contacting us!`,
        text: `Hi ${contact.name},\n\nThank you for reaching out. We have received your message and will get back to you soon.`,
        html: `<p>Hi <strong>${contact.name}</strong>,</p>
                <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
                <p>Your message:</p>
                <blockquote>${contact.message}</blockquote>
                <p>Best regards,<br/>CMS Portfolio</p>`,
        });

        res.status(201).json({ success: true, data: contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
    };


export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContactsService();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await contactService.getContactByIdService(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await contactService.updateContactStatusService(req.params.id, status);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await contactService.deleteContactService(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
