const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT_NUM = 3000;

// when accessing the from data, urlencoded is used,
// so it is possible to access req.body

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {  
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const result = num1 + num2;
  res.send("The result is " + result);
});

app.listen(PORT_NUM, () => `server is running at port ${PORT_NUM}`);
