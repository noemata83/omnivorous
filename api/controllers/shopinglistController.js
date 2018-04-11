'use strict'

const mongoose = require('mongoose'),
User = mongoose.model('users'),
ShoppingList = mongoose.model('ShoppingList');

const getShoppingLists = (req, res) => {
    User.findById(req.user._id).then( user => {
        User.populate(user, { path: 'lists', populate: 'list'}, (err, user) => {
            res.json(user.lists);        
        });
    });
}

const getShoppingList = (req, res) => {
    ShoppingList.findById(req.params.id).then(list => {
        if (list._ownedby.toHexString() === req.user.id) {
            res.status(200).send(list);
        } else {
            res.status(403).send("User id does not match list owner id");
        }
    })
}

const makeShoppingList = (req, res) => {
    User.findById(req.user._id).then(user => {
        if (!user) {
            res.status(401).send({});
        }
        const newShoppingList = req.body;
        newShoppingList._ownedby = req.user._id;
        ShoppingList.create(newShoppingList).then( list => {
            list.save();
            user.lists.push(list);
            user.save();
            res.json(list);
        });
    });
}

const deleteShoppingList = (req,res) => {
    User.findById(req.user._id).then(user => {
        if (!user) {
            res.send("Something went wrong.");
        } else {
            const targetIndex = user.lists.map(list => list._id.toHexString()).indexOf(req.params.id);
            user.lists.splice(targetIndex, 1);
            user.save();
            ShoppingList.findByIdAndRemove(req.params.id, err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Shopping List Deleted."});
            });
        }
    });
}

const updateShoppingList = (req, res) => {
    ShoppingList.findByIdAndUpdate(req.params.id, req.body, {new: true}).then( (err, list) => {
        if (err) {
            res.send(err);
        } 
        else 
        {
            res.json(list);
        }
    });
}

module.exports = {
    getShoppingLists,
    getShoppingList,
    makeShoppingList,
    deleteShoppingList
}