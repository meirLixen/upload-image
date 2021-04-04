const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
var cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.post("/upload", function (req, res) {
  console.log(req.files.File.name);
  req.files.File.mv("./uploads/" + req.files.File.name);
  res.send("WOW!");
});
app.listen(7000);
