const fs = require("fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

path.dirname("contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((elem) => elem.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((elem) => elem.id === id);
  if (contactIndex === -1) {
    return console.log(null);
  } else {
    const newContactList = contacts.splice(contactIndex, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContactList;
  }
};

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};