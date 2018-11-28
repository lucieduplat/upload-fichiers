var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const router = express.Router();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//permet d'afficher dans le navigateur
/*app.get("/uploaddufichier", (req, res) => {
  res.render("form"), { title: "upload" };
});

//Envoyer des informations (postman)
app.post(
  "/uploaddufichier",
  upload.single("juliaroberts"),
  (req, res, next) => {
    // traitement du formulaire
    console.log(req.file);

    //Permet de déplacer le fichier et le renommer (nom original)
    fs.rename(req.file.path, "public/images/" + req.file.originalname, err => {
      if (err) {
        res.send("problème durant le déplacement");
      } else {
        res.send("Fichier uploadé avec succès");
      }
    });
  }
);
*/

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
