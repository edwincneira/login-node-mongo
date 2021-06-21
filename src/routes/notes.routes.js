import { Router } from "express"
import Note from "../models/Note.js"
import { isAuthenticatedd } from "../helpers/auth.js";

const routerNotes = Router();

// New Note
routerNotes.get("/notes/add", isAuthenticatedd, (req, res) => {
  res.render("notes/new-note");
});

routerNotes.post("/notes/new-note", isAuthenticatedd, async (req, res) => {
  const { title, description } = req.body;
  let errors = new Array;
  if (!description) {
    errors.push({ text: "Please Write a Title" });
  }
  if (errors.length > 0) {
    req.flash("error_msg", "Error")
    res.render("notes/new-note", { errors, title, description });
    console.log('enviados los errores')
  } else {
    const note = new Note({ title, description })
    note.user = req.user.id;
    await note.save();
    res.redirect("/notes")
  }
});

routerNotes.get('/notes', isAuthenticatedd, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).lean()
  res.render("notes/all-notes", { notes });
})

routerNotes.get('/notes/edit/:id', isAuthenticatedd, async (req, res) => {
  const note = await Note.findById(req.params.id).lean()
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized")
    return res.redirect("/notes")
  }
  res.render("notes/edit-note", { note })
})

routerNotes.put("/notes/edit-note/:id", isAuthenticatedd, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description })
  req.flash("success_msg", "Note Update");
  res.redirect("/notes");
})

routerNotes.delete("/notes/delete/:id", isAuthenticatedd, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  req.flash("success_msg", "Your note is delete")
  res.redirect("/notes");
})



export default routerNotes;
