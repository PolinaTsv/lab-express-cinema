const express = require("express");
const router = express.Router();
const MovieModel = require("../models/Movie.model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/movies", async (req, res, next) => {
  try {
    const allTheMoviesFromDB = await MovieModel.find();
    res.render("movies.hbs", { allMovies: allTheMoviesFromDB }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
  } catch (error) {
    console.log("Error while getting the movies from DB: ", error);

    // Call the error-middleware to display the error page to the user
    next(error);
  }
});

//SAME PROMISE WITH THEN/CATCH

// router.get("/movies", (req, res, next) => {
//   MovieModel.find()
//     .then((allTheMoviesFromDB) => {
//       // -> allTheBooksFromDB is a placeholder, it can be any word
//       //   console.log("Retrieved movies from DB:", allTheMoviesFromDB);

//       // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
//       res.render("movies.hbs", { allMovies: allTheMoviesFromDB }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
//     })
//     .catch((error) => {
//       console.log("Error while getting the movies from DB: ", error);

//       // Call the error-middleware to display the error page to the user
//       next(error);
//     });
// });

router.get("/movies/:movieID", async (req, res) => {
  const { movieID } = req.params;
  console.log("The ID from the URL is: ", movieID);
  try {
    const movie = await MovieModel.findById(movieID);
    res.render("movie-details", { movie });
  } catch (error) {
    console.log(error);
  }
});

//SAME PROMISE WITH THEN/CATCH

// router.get("/movies/:movieID", (req, res) => {
//   const { movieID } = req.params;
//   console.log("The ID from the URL is: ", movieID);
//   MovieModel.findById(movieID)
//     .then((movie) => {
//         res.render("movie-details", { movie });
//     })
//     .catch((error) => {
//       console.log("Error while getting the movie from DB: ", error);

//       // Call the error-middleware to display the error page to the user
//       next(error);
//     });
// });

module.exports = router;
