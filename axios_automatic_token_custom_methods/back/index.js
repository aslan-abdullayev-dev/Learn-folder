const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const JWT_SECRET = "my-secret-token";
const JWT_ACCESS_EXPIRES = 60;
const JWT_REFRESH_EXPIRES = 120;

//* get token and refredh token (requires username, password)
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("username ===>", username);

  //* Generate a JWT token
  const accessToken = jwt.sign(
    { username, password },
    JWT_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRES } //* 1 minute
  );

  //* Generate a refresh token
  const refreshToken = jwt.sign(
    { username, password },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES } //* 1 minute
  );

  //* Send the token back to the client
  res.json({ accessToken, refreshToken });
});

//* get new token by refresh token
app.post("/get-new-access-token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    //* Verify the refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const { username, password } = decoded;

    //* Generate a new access token
    const accessToken = jwt.sign(
      { username, password },
      JWT_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRES } //* 1 minute
    );

    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

app.get("/data", async (req, res) => {
  // Check if the user is authenticated
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // Verify the JWT token
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(422).send("Invalid token");
  }

  // Return the data
  res.json({
    data: [1, 2, 3, 4, 5],
  });
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});
