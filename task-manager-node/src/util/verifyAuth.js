const appSecret = require('../util/secret');
const jwt = require('jsonwebtoken');

module.exports = {

    verifyUserAuth: function (req, res, func) {
        jwt.verify(req.token, appSecret, (err, authData) => (err || authData.isLocked) ? res.sendStatus(403) : func(authData))
    },

    verifyAdminAuth: function (req, res, func) {
        jwt.verify(req.token, appSecret, (err, authData) => (err || !authData.isAdmin || authData.isLocked) ? res.sendStatus(403) : func(authData))
    }
};
