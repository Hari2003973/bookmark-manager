const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let bookmarks = [];
let idCounter = 1;

// Add bookmark
app.post("/bookmarks", (req, res) => {
  const { title, url } = req.body;
  const bookmark = { id: idCounter++, title, url };
  bookmarks.push(bookmark);
  res.status(201).json(bookmark);
});

// View all bookmarks
app.get("/bookmarks", (req, res) => {
  res.json(bookmarks);
});

// Update bookmark
app.put("/bookmarks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookmark = bookmarks.find(b => b.id === id);

  if (!bookmark) {
    return res.status(404).json({ message: "Bookmark not found" });
  }

  bookmark.title = req.body.title;
  bookmark.url = req.body.url;
  res.json(bookmark);
});

// Delete bookmark
app.delete("/bookmarks/:id", (req, res) => {
  bookmarks = bookmarks.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Bookmark deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});