const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

module.exports = passport => passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, { id: jwt_payload.sub });
}));