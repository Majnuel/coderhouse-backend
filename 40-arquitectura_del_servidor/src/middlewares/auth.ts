import express from "express";
import { logger } from "../services/logger";

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  done: express.NextFunction
) => {
  logger.verbose(`req.IsAuthenticated() ---> ${req.isAuthenticated()}`);
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: "Unathorized, please log in" });

  done();
};

// this tells TS that there is a passport property in SessionData:
declare module "express-session" {
  export interface SessionData {
    passport: { [key: string]: any };
  }
}
