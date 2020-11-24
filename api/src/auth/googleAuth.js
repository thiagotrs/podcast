const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = passport => passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/redirect`
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile._json);
  }
));