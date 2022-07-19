import passport from "passport";
import {
  Strategy,
  VerifyFunctionWithRequest,
  IStrategyOptionsWithRequest,
} from "passport-local";
import config from "../config";
import { userModel } from "../models/users";
import { logger } from "./logger";
import { EmailService } from "./mailer";

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

/**
 * Recibimos el objeto request, el username y el password
 * Buscando que haya un match en nuestra DB
 * Si sale todo bien llamamos a done pasando null como primer argumento y como segundo argumento la info del usuario que encontramos en la DB
 * Si no hay match pasamos como segundo argumento false (eso indica que no encontramos un usuario con esa data).
 * Opcionalmente podemos mandar como tercer argumento un mensaje de error
 */
const login: VerifyFunctionWithRequest = async (
  req: any,
  username: any,
  password: any,
  done: any
) => {
  logger.verbose("LOGIN");
  const user = await userModel.findOne({ username });
  logger.verbose("USER: ", user);
  logger.verbose(user);

  if (!user || (await user.isValidPassword(password)) === false) {
    return done(null, false, { message: "Invalid Username/Password" });
  }
  logger.verbose("Passport login function execution sucessful");
  return done(null, user);
};

/**
 * Recibimos el objeto request, el username y el password
 * Recibimos del body la info del nuevo usuario
 * Verificamos que el username o email no este tomado, caso contrario devolvemos false en done indicando que hubo un error
 * Creamos el usuario nuevo y devolvemos el usuario creado a done
 */
const signup: VerifyFunctionWithRequest = async (
  req: any,
  username: any,
  password: any,
  done: any
) => {
  try {
    logger.verbose("SIGN UP FUNCTION");
    const { username, password, name, phone, address, age } = req.body;
    logger.verbose("BODY IN SIGNUP FUNCTION IN AUTH.TS: ", req.body);
    // Nota: Username y password no se verifica porque ya lo hace passport:
    // if (!email || !firstName || !lastName) {
    //   console.log("Invalid body fields");
    //   return done(null, false, { message: "Invalid Body Fields" });
    // }

    const query = {
      $or: [{ username: username }, { password: password }],
    };

    const user = await userModel.findOne(query);

    if (user) {
      logger.verbose("User already exists");
      logger.verbose(user);
      return done(null, false, { message: "User already exists" });
    } else {
      const userData = {
        username,
        password,
        name,
        phone,
        address,
        age,
      };
      const newUser = await userModel.create(userData);
      EmailService.sendEmail(
        config.GMAIL_EMAIL,
        "Nuevo registro",
        `<h1>Nuevo registro</h1><h4>Datos:</h4><ul><li>username: ${username}</li><li>name: ${name}</li><li>phone: ${phone}</li><li>adress: ${address}</li><li>age: ${age}</li></ul>`
      );
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

export const loginFunc = new Strategy(strategyOptions, login);
export const signUpFunc = new Strategy(strategyOptions, signup);

/**
 * Express-session crea un objeto session en la request
 * passport agrega a req.session un objeto llamado passport para guardar la info del usuario
 * Cuando llamamos a done en login o en signup y pasamos el usuario lo siguiente que ocurre es que se ejecuta passport.serializeUser
 * Esta funcion agarra el usuario que recibio y lo guarda en req.session.passport
 * En este caso estamos creando una key llamado user con la info del usuario dentro de req.session.passport
 */
passport.serializeUser((user: any, done) => {
  logger.verbose("Se Ejecuta el serializeUser");
  //Notar que vamos a guardar en req.session.passport el id del usuario. nada mas
  done(null, user._id);
});

/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para crear el objeto req.user
 */
passport.deserializeUser((userId, done) => {
  logger.verbose("Se Ejecuta el desserializeUser");
  //Notar que recibimos el userId en la funcion (que es lo que mandamos en el done del serializedUser)
  //Buscamos el usuario con ese id y lo retornamos. El resultado va a estar en req.user
  userModel.findById(userId).then((user: any) => {
    return done(null, user);
  });
});
