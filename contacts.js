const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
// const { log } = require("console");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  // console.log(contactsPath);
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
// listContacts();

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
  // console.log(result || null);
}
// getContactById("1DEXoP8AuCGYc1YgoQ6hw");

async function removeContact(contactId) {
  const contacts = await listContacts();
  // console.log(contacts);
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    // console.log(null);
    // return;
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // console.log(result);
  // return;
  return result;
}
// removeContact("rsKkOQUi80UsgVPCcLZZW");

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // console.log(newContact);
  // return;
  return newContact;
}

// addContact("name", "email", "phone");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
