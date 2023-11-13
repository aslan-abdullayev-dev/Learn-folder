const superheroes = require("superheroes");

const getSuperHeroName = () => {
  return superheroes.random();
};

module.exports = {
  getSuperHeroName,
};
