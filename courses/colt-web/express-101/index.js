const express = require("express");

const port = 3000;

const app = express();

app.use((req, res) => {
  //   console.dir(res);
  res.send("this is the response");
});

app.listen(port, () => console.log("server is running on port " + port));
