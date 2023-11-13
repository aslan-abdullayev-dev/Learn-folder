const express = require("express");
const bodyParser = require("body-parser");

const weekObj = require("./constants/week");

let tasks = [];
let work = [];

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.render("list", { listTitle: "To do", tasks: tasks });
});
app.get("/work", (_, res) => {
  res.render("list", { listTitle: "Work", tasks: work });
});

app.post("/", (req, res) => {
  const newItem = req.body.taskInput;
  const list = req.body.list;

  if (list === "To do") {
    tasks.push(newItem);
    res.redirect("/");
  }
  if (list === "Work") {
    work.push(newItem);
    res.redirect("/work");
  }
});

// ! test this api endpoint from postman
app.post("/testJson", (req, res) => {
  res.status(200).json(req.body);
  //   res.send(req.body)
});

app.listen(3000, () => console.log("server is running on port 3000"));

/*
 * res.send(<h1>hi</h1>)
 * res.write(<h1>hi</h1>)
 * res.sendFile(`${__dirname}/index.html`)
 * res.render("about", {data: "data"})
 * res.redirect("/")
 * res.status(200).json({data: "data"})
 */
