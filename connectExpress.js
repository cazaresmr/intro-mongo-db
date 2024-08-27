const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { urlencoded, json } = require("body-parser");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    minlength: 10,
  },
});

const Note = mongoose.model("Note", noteSchema);

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/note", async (req, res) => {
  try {
    const notes = await Note.find({})
      .sort({ title: 1 })
      .skip(10)
      .limit(10);
    res.status(200).json(notes);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/note", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      body: req.body.body,
    });
    await note.save();
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/note/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/note/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/note/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect()
  .then(async (connection) => {
    app.listen(3001, () => {
      console.log("Server started");
    });
  })
  .catch((e) => {
    console.error(e);
  });
