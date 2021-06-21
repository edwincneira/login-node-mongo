import { Router } from "express"
import passport from "passport";
import User from "../models/User";

const routerNotes = Router();

// Routes
routerNotes.get("/users/signup", (req, res) => {
  res.render("users/signup")
});

routerNotes.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  let errors = new Array;
  if (password !== confirm_password) {
    errors.push({ text: "Password do not match" })
  }
  if (password.length < 5) {
    errors.push({ text: "Password must have more than 4 characters" })
  }
  if (errors.length > 0) {
    res.render("users/signup", { errors, name, email, password, confirm_password })
  } else {
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    req.flash("success_msg", "You are registered");
    res.redirect("/users/signin");
  }
});

routerNotes.get("/users/signin", async (req, res) => {
  res.render("users/signin")
});

routerNotes.post("/users/signin", passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true
}));

routerNotes.get("/users/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now")
  res.redirect("/users/signin");
});

export default routerNotes;