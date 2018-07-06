const express           =     require('express'),
        app             =     express(),
        mongoose        =     require('mongoose'),
        passport        =     require('passport'),
        keys            =     require('./api/config/keys'),
        session         =     require('express-session'),
        bodyParser      =     require('body-parser'),
        MongoStore      =     require('connect-mongo')(session);

require('./api/models/user');
require('./api/models/recipe');
require('./api/models/shoppinglist');
require('./api/models/meal');
require('./api/services/passport');
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, { useMongoClient: true });

app.use(
    session({
        secret: keys.cookieSecret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }));
    
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require('./api/routes/recipe')(app);
require('./api/routes/auth')(app);
require('./api/routes/shoppinglist')(app);
require('./api/routes/meal')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.DEVPORT || process.env.PORT;
app.listen(PORT, process.env.IP, function() {
    console.log("Recipe restful API started on: " + PORT);
});

