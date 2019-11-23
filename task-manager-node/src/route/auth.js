const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const userMapper = require('../util/userMapper');
const appSecret = require('../util/secret');
let User = require('../models/user.model');

router.route("/login").post((req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                        if (result) {
                            jwt.sign(userMapper(user), appSecret, {expiresIn: '1h'}, (err, token) => {
                                res.json({token: token});
                            })
                        }
                        else
                        {
                            res.json('Bad credentials');
                        }
                    }
                )
        })
        .catch(() => {
            console.log("User with email:" + req.body.email + ' not found');
            res.json('Bad credentials');
        }
    )
});

module.exports = router;
