import express from "express";

const admin = false;
function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (admin) {
    next();
  } else {
    res.status(401).json({ msg: "not authorized" });
  }
}

export { isAdmin };
