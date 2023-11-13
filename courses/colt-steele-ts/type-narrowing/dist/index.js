"use strict";
//  ! ========================================================================================================================
//  ! ============================================== NARROWING WITH IN OPERATOR ==============================================
//  ! ========================================================================================================================
function getRuntime(media) {
    if ("numEpisodes" in media) {
        // * ts understands media can only be TVShow type
        media.numEpisodes = 10;
    }
}
//  ! ========================================================================================================================
//  ! ========================================== NARROWING WITH INSTANCEOF OPERATOR ==========================================
//  ! ========================================================================================================================
function printFullDate(date) {
    if (date instanceof Date) {
        return date.toUTCString();
    }
    return new Date(date).toUTCString();
}
// ================================================
class User {
    constructor(userName) {
        this.userName = userName;
    }
}
class Company {
    constructor(name) {
        this.name = name;
    }
}
function printName(entity) {
    if (entity instanceof User) {
        return entity.userName;
    }
}
function isCat(animal) {
    // * this syntax is binding return type with the logic of the function (function must return boolean)
    // * if function return true then ts willknow that returned value is the type of Cat
    // * if we delete "animal is Cat" part, then ts would not know what is the return type (check it on makeNoise function below)
    return animal.numLives !== undefined;
}
function makeNoise(animal) {
    if (isCat(animal)) {
        return "meow";
    }
    return "woof";
}
function getFarmAnimalSound(animal) {
    if (animal.kind === "Pig") {
        // * ts will know here that animal object is Rooster interface
        return "Oink";
    }
    if (animal.kind === "Cow") {
        return "Moo";
    }
    if (animal.kind === "Rooster") {
        return "Doodldoo";
    }
    const shouldNeverGetHere = animal;
    return shouldNeverGetHere;
    // * we should never make it here if all cases handled correctly
    // * comment out last if option to see how ts will warn you
    // * it is because not all cases going to be handled and animal can not be assigned to type never
    // * so, assigning to type never as default makes sure that all cases are handled above
}
console.log("getFarmAnimalSound ===>", getFarmAnimalSound({ name: "steevie", weight: 2, age: 1.2, kind: "Rooster" }));
