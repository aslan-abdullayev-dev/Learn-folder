const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("getpost");
});

app.get("/tacos", (req, res) => {
  console.log("GET / tacos req ===>>", req.body);
  res.send("GET / tacos response");
});

app.post("/tacos", (req, res) => {
  console.log("POST / tacos req ===>>", req.body);
  res.send("POST / tacos response");
});

app.get("/by", (req, res) => {
  res.send("by");
});

app.listen(3000, () => console.log("server is running on port 3000"));
