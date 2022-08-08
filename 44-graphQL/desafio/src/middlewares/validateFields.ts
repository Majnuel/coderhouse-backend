import express from "express";

const validateFields = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.redirect("/missing-fields");
  }
  next();
};

export default validateFields;
