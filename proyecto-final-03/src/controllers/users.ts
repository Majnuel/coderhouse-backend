import express from "express";

export const userLogin = (req: express.Request, res: express.Response) => {
  try {
    console.log(req.body);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
