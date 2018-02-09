const passport          =       require('passport'),
      GoogleStrategy    =       require('passport-google-oauth20').Strategy,
      keys              =       require('../config/keys'),
      mongoose          =       require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile.id);
        User.findOne({ googleId: profile.id })
            .then( (existingUser) => {
                console.log(existingUser);
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    console.log("adding new user...?");
                    new User({ googleId: profile.id})
                        .save()
                        .then(user => done(null, user));
                }
            });
    })
);