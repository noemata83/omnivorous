const express           =     require('express'),
        app             =     express(),
        mongoose        =     require('mongoose'),
        passport        =     require('passport'),
        keys            =     require('./api/config/keys'),
        session         =     require('express-session'),
        bodyParser      =     require('body-parser');
require('./api/models/user');
require('./api/models/recipe');
require('./api/services/passport');
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURL, { useMongoClient: true });

app.use(
    session({
        secret: keys.cookieSecret,
        resave: false,
        saveUninitialized: false
    }));
    
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require('./api/routes/recipe')(app);
require('./api/routes/auth')(app);
const PORT = process.env.DEVPORT || process.env.PORT;
app.listen(PORT, process.env.IP, function() {
    console.log("Recipe restful API started on: " + PORT);
});

