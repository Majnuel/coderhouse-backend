const mongoose = require("mongoose");
import bcrypt from "bcrypt";
import express from "express";

const usersCollection = "users";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, max: 100 },
    password: { type: String, required: true },
    name: { type: String, required: true, max: 120 },
    address: { type: String, required: true, max: 120 },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

//Cuando guardemos algo en algun documento, antes de hacer el guardado vamos a ejecutar esta funcion (por eso se llama PRE-SAVE)
//Esta funcion va a agarrar la contraseña que le pasemos y la va a encriptar usando bcrypt
//De ese modo, cuando veamos la contraseña en la db va a estar encriptada y es mas seguro
userSchema.pre(
  "save",
  async function (this: typeof userSchema, next: express.NextFunction) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    console.log("encrypting!!!");
    this.password = hash;
    console.log("en pre:");
    console.log("user: ", user);
    console.log("hash: ", hash);
    next();
  }
);

//Crearemos un metodo nuevo en nuestro modelo de Users para validar contraseña.
//Donde le pasaremos la contraseña normal y usando bcrypt vamos a compararla con la
//que esta encriptada. Esto nos va a devolver true o false
userSchema.methods.isValidPassword = async function (password: any) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const userModel = mongoose.model(usersCollection, userSchema);

export { userModel };
