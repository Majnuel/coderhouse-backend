import { messagesDBConfig } from "../../db/knexConfig";
const knex = require("knex")(messagesDBConfig);

class Messages {
  constructor() {}
  init() {
    console.log("messages DB up");
    knex.schema.hasTable("messages").then((exists: boolean) => {
      if (exists) return;
      console.log("messages table doesnt exist, creating table...");
      knex.schema
        .createTable("messages", (table: any) => {
          table.increments("id");
          table.string("author").notNullable();
          table.string("message").notNullable();
          table.timestamps(true, true);
        })
        .then(() => console.log("messages table created"))
        .catch((err: any) => console.log("there has been an error", err));
    });
    knex("messages")
      .select("*")
      .then((products: any) =>
        console.log(`found ${products.length} message-records in messages-DB`)
      );
  }
  addMessage(data: any) {
    knex("messages")
      .insert(data)
      .then(() => console.log("message saved in message-DB"))
      .catch((err: any) =>
        console.log("there was an error in [addMessage]: ", err)
      );
  }
}

const messageResources = new Messages();

export default messageResources;
