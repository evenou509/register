// require("dotenv").config();
var express = require('express');

// var session = require('express-session');
// var passport = require('passport');
const routes = require('./routes');
// const passportSetup = require('./config/passport-setup');
// const cookieSession = require('cookie-session');

// const apiRoutes = require("./routes/api/user");


// require("dot-env");
var db = require('./models');

var app = express();
var PORT = process.env.PORT || 5001;




// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: "anyThing"
// }));


// app.use(passport.initialize());
// app.use(passport.session());


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("client/public"));
}

// Routes
app.use(routes);
// app.use("/api", apiRoutes);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "development") {
  syncOptions.force = true;
}


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;