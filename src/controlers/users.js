const User = require("../models/User");
const passport = require("passport");

const renderSignUpForm = (req, res) => res.render("users/signup");

const singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password); //almaceno en newUser.password
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/users/signin");
    }
  }
};

const renderSigninForm = (req, res) => res.render("users/signin");

//autentica con passport de forma local
const signin = passport.authenticate("local", {
  successRedirect: "/notes", //autenticacion correcta lo direcciona a /notes
  failureRedirect: "/users/signin", //autenticacion erronea lo devuelve
  failureFlash: true, //enviar mensajes flash
});

const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

module.exports = { renderSignUpForm, singup, renderSigninForm, logout }