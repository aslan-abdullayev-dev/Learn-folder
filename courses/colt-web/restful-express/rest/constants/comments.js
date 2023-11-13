const { v4: uuidv4 } = require("uuid");

const comments = [
  {
    id: uuidv4(),
    username: "Todd",
    comment: "Lol that is so funny",
  },
  {
    id: uuidv4(),
    username: "Skyler",
    comment: "I like to go birdwatching",
  },
  {
    id: uuidv4(),
    username: "Sk8boi",
    comment: "Plz delete your account",
  },
  {
    id: uuidv4(),
    username: "Onlysaywoof",
    comment: "woof woof woof",
  },
];

module.exports = comments;
