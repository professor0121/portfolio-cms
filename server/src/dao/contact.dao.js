// dao/contact.dao.js
import Contact from "../models/contact.model.js";

export const createContact = async (data) => {
  return await Contact.create(data);
};

export const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const updateContactStatus = async (id, status) => {
  return await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
