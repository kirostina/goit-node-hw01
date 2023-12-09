const fs = require('fs/promises');
const path = require('path');
const argv = require('yargs').argv;


const contactsModule = require('./contacts');



function invokeAction({ action, id, name, email, phone }) {
  const { listContacts, getContactById, removeContact, addContact } = contactsModule;

  switch (action) {
    case 'list':
      listContacts().then((contacts) => console.table(contacts));
      break;

    case 'get':
      getContactById(id).then((contact) => console.log('Contact by ID:', contact));
      break;

    case 'add':
      addContact(name, email, phone).then((newContact) => console.log('New Contact:', newContact));
      break;

    case 'remove':
      removeContact(id).then((removedContact) => console.log('Removed Contact:', removedContact));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);