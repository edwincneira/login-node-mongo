import { Router } from "express"
import { Modelo } from "../models/Note.js"

const routerNotes = Router();

// New Note
routerNotes.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

routerNotes.post("/notes/new-note", (req, res) => {
  const { title, description } = req.body;
  let errors = new Array;
  if (!description) {
    errors.push({ text: "Please Write a Title" });
  }
  if (errors.length > 0) {
    req.flash("error_msg", "Error")
    res.render("notes/new-note", { errors, title, description });
    console.log('enviados los errores')
  }else {
    const note = new Modelo({ title, description })
    console.log("id ", req.user.id)
    note.user = req.user.id;
  }



  // res.redirect("/notes")
});

routerNotes.get('/notes', (req, res) => {
  res.render("notes/all-notes")
})

export default routerNotes;
