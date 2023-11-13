const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
  response.send("<h1>Hello, world!</h1>");
});

app.get("/test", (request, response) => {
  response.contentType("json");
  response.send(JSON.stringify({ page: "test" }));
});

app.listen(PORT, () => console.log("server started at " + PORT));
