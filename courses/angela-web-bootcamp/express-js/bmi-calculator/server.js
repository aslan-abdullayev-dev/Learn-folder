const express = require("express");
const bodyParser = require("body-parser");

const utils = require("./utils/index");

const app = express();
const PORT_NUM = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/bmicalculator", (req, res) => {
  res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post("/bmicalculator", (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);
  const bmi = utils.calculateBMI(weight, height / 100);
  res.send(`Your BMI score is ${bmi}`);
});

app.listen(PORT_NUM, () => console.log("Server is running on port " + PORT_NUM));
