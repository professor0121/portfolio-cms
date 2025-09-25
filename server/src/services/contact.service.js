// services/contact.service.js
import * as contactDao from "../dao/contact.dao.js";

export const createContactService = async (data) => {
  return await contactDao.createContact(data);
};

export const getAllContactsService = async () => {
  return await contactDao.getAllContacts();
};

export const getContactByIdService = async (id) => {
  return await contactDao.getContactById(id);
};

export const updateContactStatusService = async (id, status) => {
  return await contactDao.updateContactStatus(id, status);
};

export const deleteContactService = async (id) => {
  return await contactDao.deleteContact(id);
};
