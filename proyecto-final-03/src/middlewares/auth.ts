import express from "express";

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  done: express.NextFunction
) => {
  console.log("Is Authenticated");
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: "Unathorized" });

  done();
};
