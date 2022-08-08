import express from "express";
import { retrieveUserData } from "../helpers/userDataFromReqObj";

function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (retrieveUserData(req) === undefined) {
    res.status(401).json({ msg: "you must login first" });
  } else if (retrieveUserData(req).admin) {
    next();
  } else {
    res.status(401).json({ msg: "not authorized, ADMIN status is needed" });
  }
}

export { isAdmin };
