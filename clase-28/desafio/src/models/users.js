import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Cuando guardemos algo en algun documento, antes de hacer el guardado vamos a ejecutar esta funcion (por eso se llama PRE-SAVE)
//Esta funcion va a agarrar la contraseña que le pasemos y la va a encriptar usando bcrypt
//De ese modo, cuando veamos la contraseña en la db va a estar encriptada y es mas seguro
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  console.log("encrypting!!!");
  this.password = hash;
  console.log("en pre:");
  console.log("user: ", user);
  console.log("hash: ", hash);
  next();
});

//Crearemos un metodo nuevo en nuestro modelo de Users para validar contraseña.
//Donde le pasaremos la contraseña normal y usando bcrypt vamos a compararla con la
//que esta encriptada. Esto nos va a devolver true o false
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export const UserModel = mongoose.model("user", UserSchema);
