let movie_title: string = "Amadeus";
movie_title = "Arrival";
// movie_title.upper();
// movie_title = 9;

let num_cat_lives: number = 9;
num_cat_lives += 1;
// num_cat_lives = "zero"

let game_over: boolean = false;
game_over = true;
// game_over = "true"

// *--------------------------------------------
// * ------------- Type Inference --------------
// *--------------------------------------------
let tv_show = "olive Kitteridge";
tv_show = "The Other Two";
// tv_show = false

// *--------------------------------------------
// * ---------------- Any Type -----------------
// *--------------------------------------------
let thing: any = "hello";
thing = 1;
thing = false;
thing = [];
thing();
thing.toUpperCase();

// *--------------------------------------------
// * ------- Initializing Without Value --------
// *--------------------------------------------
const movies = ["Arrival", "The King", "Amadeus"];
let found_movie;
for (let movie of movies) {
  if (movie === "Amadeus") {
    found_movie = movie;
  }
}
found_movie();
found_movie = 1;
