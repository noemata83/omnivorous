const mongoose = require('mongoose');
const User = mongoose.model("users");
module.exports = (req, res, next) => {
    User.findById(req.user._id).then( user => {
        if (!user) {
            return Promise.reject();
        }

        next();
    }).catch( e => {
        res.status(401).send(e);
    });
}