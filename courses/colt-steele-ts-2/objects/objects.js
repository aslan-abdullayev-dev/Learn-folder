var myDog = {
    id: 1,
    name: "Elton",
    breed: "Australian Shepherd",
    age: 5,
    titles: ["Australia Champion"],
    years_of_experience: 2,
};
function printDog(dog_obj) {
    var breed = dog_obj.breed, name = dog_obj.name, age = dog_obj.age;
    var dogInfoStr = "".concat(name, " (").concat(age, " years old): ").concat(breed);
    console.log(dogInfoStr);
}
printDog(myDog);
var a = {
    color: "",
    radius: 5
};
var myAnimal = {
    age: 7,
    breed: "Husky",
    numLives: 7,
};
