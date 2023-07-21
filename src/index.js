const express = require("express");
const app = express();
const users = require("../users.json");
module.exports = app;

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

//Example endpoint
app.get("/foo", (req, res) => {
  res.send(`foo`);
});

//Write your code here
app.get("/users", (req, res) => {
  const { id } = req.query;
  if (id) {
    const user = users.find((user) => user.id === id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: `User with ID ${id} not found` });
    }
  }

  res.status(200).json(users);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
});
