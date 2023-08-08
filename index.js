// const { Command } = require("commander");
// const program = new Command();
const { program } = require("commander");

const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --contactId <type>", "user contactId")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, contactId, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    // break;

    case "get":
      const oneContact = await contacts.getContactById(contactId);
      return console.log(oneContact);
    // break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);
    // ... name email phone
    // break;

    case "remove":
      const deleteContact = await contacts.removeContact(contactId);
      return console.log(deleteContact);
    // ... id
    // break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// const { program } = require("commander");

// const books = require("./books");

// const invokeAction = async ({ action, id, title, author }) => {
//   switch (action) {
//     case "read":
//       const allBooks = await books.getAll();
//       return console.log(allBooks);
//     case "getById":
//       const oneBook = await books.getById(id);
//       return console.log(oneBook);
//     case "add":
//       const newBook = await books.add({ title, author });
//       return console.log(newBook);
//     case "updateById":
//       const updateBook = await books.updateById(id, { title, author });
//       return console.log(updateBook);
//     case "deleteById":
//       const deleteBook = await books.deleteById(id);
//       return console.log(deleteBook);
//     default:
//       return console.log("Unknown action");
//   }
// };

// program
//   .option("-a, --action, <type>")
//   .option("-i, --id, <type>")
//   .option("-t, --title, <type>")
//   .option("-at, --author, <type>");

// program.parse();

// const options = program.opts();
// invokeAction(options);
