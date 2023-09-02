const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contactsActions = require("./contacts");

const invokeActions = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsActions.listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await contactsActions.getContactById(id);
      return console.table(oneContact);
    case "remove":
      const remove = await contactsActions.removeContact(id);
      return console.table(remove);
    case "add":
      const add = await contactsActions.addContact(name, email, phone);
      return console.table(add);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeActions(argv);