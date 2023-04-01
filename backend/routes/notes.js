const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const router = express.Router();

//Route 1: Gets all the notes of the currently logged in user. Login Required. path:/api/notes/fetchallnotes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INternal Server error");
  }
});

//Route 2: Create new notes for the current user. Login Required. path:/api/notes/createnote
router.post(
  "/createnote",
  fetchUser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description must be atleast 5 characters long").isLength(
    { min: 5 }
  ),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ error: err.array() });
      }
      const note = new Notes({
        user: req.user,
        title,
        description,
        tag,
      });
      const savedNote = await note.save();

      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//Route 3: Finds a note and updates it. Login Required. path:/api/notes/updatenote/:id
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() != req.user) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

//Route 4: Finds a note and deletes it. Login Required. path:/api/notes/deletenote/:id
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() != req.user) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.send({ Message: "Deleted Successfully", id: req.params.id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});
module.exports = router;
