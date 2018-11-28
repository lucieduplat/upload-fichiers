var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Définir les conditions de l'image
const upload = multer({
  dest: "tmp/",
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image/png")) {
      cb(new Error("Mauvais format de fichier"));
    }
    cb(null, true);
  }
});

// Routes : get (Afficher dans le navigateur) et post (Envoyer des informations = Postman)
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/monupload", upload.array("monfichier"), (req, res, next) => {
  console.log(req.files);
  res.end();
});

module.exports = router;
