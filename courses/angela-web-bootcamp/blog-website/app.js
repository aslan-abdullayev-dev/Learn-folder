const express = require("express");
const lodash = require("lodash");

const port = 3000;
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.render("pages/home", { homeStartingContent, posts });
});

app.get("/about", (_, res) => {
  res.render("pages/about", { aboutContent });
});

app.get("/contact", (_, res) => {
  res.render("pages/contact", { contactContent });
});

app.get("/compose", (_, res) => {
  res.render("pages/compose", { contactContent });
});

app.post("/compose", (req, res) => {
  const newPublish = {
    title: req.body.composeTitle,
    content: req.body.composePost,
    slug: lodash.kebabCase(`${req.body.composeTitle}`),
  };
  posts.push(newPublish);
  res.redirect("/");
});

app.get("/posts/:postSlug", (req, res) => {
  const postSlug = req.params.postSlug;
  const selectedPost = posts.find((post) => post.slug == postSlug);

  if (selectedPost) {
    res.render("pages/post", { data: selectedPost });
  } else {
    res.redirect("/");
  }
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});
