// =================================================================
// NATIVE NODE FS MODULE
// =================================================================
const file_system_fs = require("./file_system_fs");
file_system_fs.copySyncFile();

// =================================================================
// EXTERNAML (NPM) MODULE / PACKAGE
// =================================================================
const npm_superheroes = require("./npm_superheroes");
const mySuperHero = npm_superheroes.getSuperHeroName();
// console.log("mySuperHero --->>", mySuperHero);
