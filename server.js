const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const cors = require("cors");
const logger = require("morgan");
const User = require("./models/user");

require("dotenv").config();
require("./config/database");

const newItem = "hehe";
const app = express();

app.use(logger("dev"));
app.use(express.json());
// must be configured to serve from the build folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

// Middleware to verify token and assign user object to req.user
// Be sure to mount before routes
app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.get("/profile/:id", function (req, res) {
//   User.findById(req.params.id, function (err, foundUser) {
//     if (foundUser) {
//       res.send(foundUser);
//     } else {
//       res.send("That caregiver was not found");
//     }
//   });
// });

// app.post("/profile", function (req, res) {
//   const newUser = new User({
//     name: req.body.name,
//     email: req.body.email,
//     age: req.body.age,
//     about: req.body.about,
//     location: req.body.location,
//     phone_number: req.body.phone_number,
//     best_time: req.body.best_time,
//     rate: req.body.rate,
//     credentials: req.body.credentials,
//     linkedin: req.body.linkedin,
//     facebook: req.body.facebook,
//     instagram: req.body.instagram,
//     experiences: req.body.experiences,
//     password: req.body.password,
//     profile_image: req.body.profile_image,
//   });
//   newUser.save(function (err) {
//     if (!err) {
//       res.send("Successfully added new user");
//     } else {
//       res.send(err);
//     }
//   });
// });

// app.patch("/profile/:id", function (req, res) {
//   User.updateOne({ _id: req.params.id }, { $set: req.body }, function (err) {
//     if (!err) {
//       res.send("Successfully updated user");
//     } else {
//       res.send(err);
//     }
//   });
// });
// app.delete("/profile/:id", function (req, res) {
//   User.deleteOne({ _id: req.params.id }, function (err) {
//     if (!err) {
//       res.send("Successfully deleted");
//     } else {
//       res.send(err);
//     }
//   });
// });

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
