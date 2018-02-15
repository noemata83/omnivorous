const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', 
      passport.authenticate('google', { // 'google' is an internal identifier within the Passport strategy code - 'google' tells Passport to use... Google!
         scope: ['profile', 'email'] // what we are asking for from Google: access to profile and email
      })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/recipes');
    });
    
    app.get('/auth/google/logout', (req, res) => {
        req.logout();
    });
    
    app.get('/api/current_user', (req, res) => {
       res.send(req.user);
    });
}