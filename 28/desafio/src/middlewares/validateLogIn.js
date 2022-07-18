const validateLogIn = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) next();
  else res.redirect("/login");
};

export default validateLogIn;
