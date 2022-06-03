const validateFields = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.redirect("/missing-fields");
  }
  next();
};

export default validateFields;
