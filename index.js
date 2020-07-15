//requiring libraries
const express = require("express");
const app = express();
// const route = express.Router();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');


// //MIDDLEWARE
app.use(express.static("public"));

app.use(session({secret: 'atomicbomb'}))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Process application/json
app.use(bodyParser.json());

//for using pug
app.set("view engine", "pug"); // view engine => configuration variable

//use config module to get the privatekey, if no private key set, end the application
mongoose
  .connect("mongodb://localhost/db")
  .then(() => console.log("Connected"))
  .catch(err => console.error("Could not Connect", err));

//SCHEMA
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  genre: Array,
  lead: String,
  rating: Number,
  imagelink: String,
  videolink: String,
  trailerlink: String,
  comments: Array
});

const Film = mongoose.model("servers", movieSchema);

//CONTROLLER

//ROUTES

//HOMEPAGE

app.get('/', function (req, res) {
  res.render('login');
});  

app.post('/', function (req, res) {
  var post = req.body;
  if (post.username === 'admin' && post.pass ==='admin') {
    req.session.user_id = 123;
    res.redirect('/index');
  } else {
    res.send('Bad user/pass');
  }
});

app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/');
});  


app.get("/index", checkAuth, async function(req, res) {
  Film.find({}, function(err, allMovies) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { movie: allMovies });
    }
  })
    .sort({ $natural: -1 })
    .limit(8);
});

//ALL MOVIES - GALLERLY
app.get("/allmovies", checkAuth, async function(req, res) {
  // const pageNumber = 2;
  // const pageSize = 4;
  // .skip((pageNumber-1*pageSize)).limit(4);
  Film.find({ genre: "Action" }, function(err, Action) {
    if (err) {
      console.log(err);
    } else {
      Film.find({ genre: "Adventure" }, function(err, Adventure) {
        if (err) {
          console.log(err);
        } else {
          Film.find({ genre: "Comedy" }, function(err, Comedy) {
            if (err) {
              console.log(err);
            } else {
              Film.find({}, function(err, allMovies) {
                if (err) {
                  console.log(err);
                } else {
                  res.render("allmovies", {
                    movie: allMovies,
                    action: Action,
                    adventure: Adventure,
                    comedy: Comedy
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

//MOVIE PAGE
app.get("/movie/:title",  checkAuth, async function(req, res) {
  Film.find({ title: req.params.title }, function(err, Movie) {
    if (err) {
      console.log(err);
    } else {
      // console.log(Movie{title})
      res.render("movie", { movie: Movie });
    }
  });
});

app.get("/commentpost",  checkAuth,(req, res) => {
  res.render("commentpost");
  // console.log(req.params.name);
});

app.post("/commentpost", function(req, res) {
  // Do something, like query a database or save data
  // console.log(req.body.name, req.body.message, req.body.title)

  updateMovie(req.body.title, req.body.name, req.body.message);
  // console.log(movie)
  res.render("commentpost");
});

//SEARCH PAGE
app.get("/Search", checkAuth, (req, res) => {
  res.render("Search");
  // console.log(req.params.name);
});

app.get("/SearchResults/:name", checkAuth, async function(req, res) {
  Film.find({ title: new RegExp(req.params.name, "i") }, function(err, Movie) {
    if (err) {
      console.log(err);
    } else {
      res.render("SearchResults", { movie: Movie });
    }
  });
});

app.get("/addmovie",  checkAuth, (req, res) => {
  res.render("addmovie");
  // console.log(req.params.name);
});

app.get("/movieadded",  checkAuth, (req, res) => {
  res.render("addmovie");
  // console.log(req.params.name);
});

app.post("/movieadded",  function(req, res) {
  // Do something, like query a database or save data
  console.log(req.body);
  // AddMovie(req.body.title, req.body.name, req.body.message);
  // console.log(movie)
  addMovie(
    req.body.title,
    req.body.year,
    req.body.rating,
    req.body.lead,
    req.body.image,
    req.body.video,
    req.body.trailer,
    req.body.genre
  );
  res.render("movieadded");
});

app.get("/editmovie/:title",  checkAuth, (req, res) => {
  Film.find({ title: req.params.title }, function(err, Movie) {
    if (err) {
      console.log(err);
    } else {
      // console.log(Movie{title})
      res.render("editmovie", { movie: Movie });
    }
  });
});

app.get("/movieedited",  checkAuth, (req, res) => {
  res.render("movieedited");
  // console.log(req.params.name);
});

app.post("/movieedited", (req, res) => {
  editMovie(
    req.body.title,
    req.body.year,
    req.body.rating,
    req.body.lead,
    req.body.image,
    req.body.video,
    req.body.trailer,
    req.body.genre
  );
  res.render("movieedited");
});



//FUNCTIONS

async function updateMovie(titlee, namee, messagee) {
  const movie = await Film.updateOne(
    { title: titlee },
    {
      $push: {
        comments: [[namee, messagee]]
      }
    }
  );
  console.log(movie);
}

async function editMovie(
  titlee,
  yearr,
  ratingg,
  leadd,
  imagelinkk,
  videolinkk,
  trailerlinkk,
  genree
) {
  const movie = await Film.updateOne(
    { title: titlee },
    {
      $set: {
        title: titlee,
        year: yearr,
        genre: genree,
        lead: leadd,
        rating: ratingg,
        imagelink: imagelinkk,
        videolink: videolinkk,
        trailerlink: trailerlinkk
      }
    }
  );
  console.log(movie);
}

async function addMovie(
  titlee,
  yearr,
  ratingg,
  leadd,
  imagelinkk,
  videolinkk,
  trailerlinkk,
  genree
) {
  const movie = new Film({
    title: titlee,
    year: yearr,
    genre: genree,
    lead: leadd,
    rating: ratingg,
    imagelink: imagelinkk,
    videolink: videolinkk,
    trailerlink: trailerlinkk
  });

  const result = await movie.save();
  console.log(result);
}

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.render('login');
  } else {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
}

//DEFAULT PAGE ERROR PAGE
app.use(function(req, res, next) {
  res.status(404).render("404", { title: "Sorry, page not found" });
});

//STARTING SERVER
app.listen("3000", () => {
  console.log("Server started at http://localhost:3000/");
});
