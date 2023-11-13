const express = require("express");
const path = require("path");
const redditJson = require("./constants/data.json");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/rand", (req, res) => {
  const randomNum = Math.floor(Math.random() * 100);
  res.render("random", { randomNum });
});

app.get("/cats", (req, res) => {
  const cats = ["garfield", "blue", "stephanie"];
  res.render("cats", { cats });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const pageData = redditJson[subreddit];
  res.render("reddit", { ...pageData });
});

app.get("*", (req, res) => {
  res.render("notFound");
});

app.listen(3000, () => console.log("server running on port 3000"));
