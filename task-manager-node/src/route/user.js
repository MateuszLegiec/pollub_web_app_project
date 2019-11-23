const userMapper = require('../util/userMapper');
const generatePassword = require('../util/passwordGenerator');
const auth = require('../util/verifyAuth');
const verifyToken = require('../util/verifyToken');

const router = require('express').Router();
const bcrypt = require('bcrypt');

let User = require('../models/user.model');

router.route('/add').post(verifyToken, (req, res) => {
    auth.verifyAdminAuth(req, res,async () => {
        const password = await generatePassword();
        const salt = await bcrypt.genSalt(10, "b");
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin,
            password: hash
        });

        newUser.save()
            .then(() => res.json({password: password}))
            .then(() => {
                const role = (newUser.isAdmin) ? "admin" : "user";
                console.log("Added " + role + " with email: " + newUser.email)
            })
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    res.json({error: 'User with email: ' + newUser.email +  ' already exit'})
                } else if (err.name === 'ValidationError') {
                    res.json({error: err._message});
                } else
                    console.log(err)
            })
    });
});

router.route('/all').get(verifyToken,(req, res) => {
    auth.verifyUserAuth(req,res,() => User.find({}).sort({'isLocked':'ascending'})
        .then(users => res.json(users.map(user => userMapper(user))))
        .catch(err => res.json(err)));
});

router.route('/:email/lock').put(verifyToken, (req, res) => {
    const email = req.path.substring(1,req.path.lastIndexOf('/'));
    auth.verifyAdminAuth(req,res,(authData) => User.findOneAndUpdate({email: email}, {isLocked: true})
        .then(() => console.log('User with email: ' + email + ' locked by admin: ' + authData.email))
        .then(() => res.json("OK!"))
        .catch((err) => res.json(err)));
});

router.route('/:email/unlock').put(verifyToken, (req, res) => {
    const email = req.path.substring(1,req.path.lastIndexOf('/'));
    auth.verifyAdminAuth(req,res,(authData) => User.findOneAndUpdate({email: email}, {isLocked: false})
        .then(() => console.log('User with email: ' + email + ' unlocked by admin: ' + authData.email))
        .then(() => res.json("OK!"))
        .catch((err) => res.json(err)));
});

router.route('/:email/reset').put(verifyToken, (req, res) => {
    const email = req.path.substring(1,req.path.lastIndexOf('/'));
    auth.verifyAdminAuth(req,res,async (authData) => {

        const password = await generatePassword();
        const salt = await bcrypt.genSalt(10, "b");
        const hash = await bcrypt.hash(password, salt);

        User.findOneAndUpdate({email: email}, {$set:{password: hash, havePasswordUpdated: false}})
            .then(() => console.log('User with email: ' + email + ' had password reset by admin: ' + authData.email))
            .then(() => res.json(res.json({password: password})))
            .catch((err) => res.json(err));
    })
});

router.route('/password/update').put(verifyToken,(req, res) => {
    auth.verifyUserAuth(req,res,async (authData) => {
        const password = req.body.password;
        const confirmedPassword = req.body.confirmedPassword;
        if (password === confirmedPassword && /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{6,}$/.test(password)) {
            const salt = await bcrypt.genSalt(10, "b");
            const hash = await bcrypt.hash(password, salt);
            User.findOneAndUpdate({email: authData.email}, {$set:{password: hash, havePasswordUpdated: true}})
                .then(user => console.log(user))
                .then(() => {
                    res.json("Password changed successfully! Please login again.");
                    console.log("User with email: " + authData.email + " changed password");
                })
                .catch((err) => res.json(err))
        } else {
            await res.json("Something gone wrong. Please login again");
        }
    });
});

module.exports = router;
