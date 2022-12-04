const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

// Sets the user in the session
passport.serializeUser((loggedInUser, cb) => {
  cb(null, { _id: loggedInUser._id, username: loggedInUser.username });
});

// Allows access to the user in req.user
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (error, userDocument) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null, userDocument);
  });
});

// Passport - Local Strategy
passport.use(
  new LocalStrategy(
    {
      // fields used in the login form:
      usernameField: 'email', // default is username
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        if (!bcrypt.compareSync(password, user.passwordHash)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Passport - Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          // Authenticate and persist in the session
          return done(null, user);
        }
      } catch (error) {
        done(error);
      }

      try {
        const newUser = await User.create({
          googleId: profile.id,
          username: profile.displayName
        });
        // Authenticate
        done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);
