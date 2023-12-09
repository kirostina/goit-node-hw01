
const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');



async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Error reading contacts:', error.message);
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);

  if (index === -1) {
    return null; 
  }

  const removedContact = contacts.splice(index, 1)[0];

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.error('Error writing contacts:', error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: Date.now().toString(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error('Error writing contacts:', error.message);
    return null;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
