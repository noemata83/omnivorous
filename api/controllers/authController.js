const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/register', function(req, res) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 12);
        
        User.create({
            username: req.body.username,
            password: hashedPassword
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.");
            
            // create a token
            var token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: 86400 });
            
            
            res.status(200).send({ auth: true, token: token });
        });
});

router.get('/me', function (req, res) {
    
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: "No token provided."});
    
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: "Failed to authenticate token."});
        
        User.findById(decoded.id, {password: 0 }, function(err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            
            res.status(200).send(user);
        });
    });
});

module.exports = router;

