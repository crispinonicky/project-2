require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
const flash         = require("connect-flash");

const ensureLogin = require("connect-ensure-login");
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;


const session       = require("express-session");
const bcrypt        = require("bcryptjs");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User          = require('./models/User')


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/project-2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// passport.use(new GoogleStrategy({
//   clientID: process.env.google_client_id,
//   clientSecret: process.env.google_client_secret,
//   callbackURL: "/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//   console.log(profile)
//   User.findOne({ googleID: profile.id })
//   .then((user, err) => {
//     if (err) {
//       return done(err);
//     }
//     if (user) {
//       return done(null, user);
//     }

//     const newUser = new User({
//       googleID: profile.id
//     });

//     newUser.save()
//     .then(user => {
//       done(null, newUser);
//     })
//   })
//   .catch(error => {
//     console.log(error)
//   })

// }));

app.use(flash());

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));


app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Mario\'s Italian Restaurant';



const index = require('./routes/index');
app.use('/', index);

const orderroutesFile = require('./routes/orders');
app.use('/', orderroutesFile);

const itemroutesFile = require('./routes/items');
app.use('/', itemroutesFile);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

const charactersroutesFile = require('./routes/characters');
app.use('/', charactersroutesFile);

const profileRoutes = require('./routes/profiles');
app.use('/', profileRoutes);

const checkoutRoutes = require('./routes/orders');
app.use('/', checkoutRoutes);

const reviewRoutes = require('./routes/reviews');
app.use('/', reviewRoutes);

authRoutes.get("/checkout", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("checkout", { user: req.user });
});

authRoutes.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = app;

// app.listen(2000);