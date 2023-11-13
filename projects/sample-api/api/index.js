import config from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./server/routes/index";

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.API_PORT || 8000;

app.use("/v1", indexRouter);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to " + process.env.API_PROJECT,
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
