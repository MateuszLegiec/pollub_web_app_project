const statuses = require('../models/status.model');
const verifyToken = require('../util/verifyToken');
const auth = require('../util/verifyAuth');
let Task = require('../models/task.model');

const router = require('express').Router();

router.route('/statuses').get(verifyToken, (req, res) => {
    auth.verifyUserAuth(req,res, () => res.json(statuses));
});

router.route('/all').get(verifyToken, (req, res) => {
    auth.verifyUserAuth(req,res, () => Task.find().sort({'priority' : 'desc'})
        .then(task => res.json(task))
        .catch(err => res.json(err)));
});

router.route('/add').post(verifyToken, (req, res) => {
    auth.verifyAdminAuth(req,res,(authData) => {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            creationDate: new Date(),
            deadline: req.body.deadline,
            priority: req.body.priority,
            orderedBy: authData.email,
            assignedUser: req.body.assignedUser,
            status: 'New',
            version: 0
        });
        newTask.save()
            .then(() => res.json("Task saved successfully"))
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000)
                    res.json('Task with this title already exist');
                else if (err.name === 'ValidationError')
                    res.json(err._message);
                else
                    console.log(err);
            });
    })
});

router.route('/:id').get(verifyToken, (req, res) =>
    auth.verifyUserAuth(req,res,() => Task.findById(req.path.substring(1))
        .then(task => res.json(task)))
);

router.route('/update').put(verifyToken, (req, res) =>
    auth.verifyUserAuth(req,res,() => {
        Task.findById(req.body._id)
            .then(task => {
                if (task.version === req.body.version) {
                    task.deadline = req.body.deadline;
                    task.assignedUser = req.body.assignedUser;
                    task.status = req.body.status;
                    task.version = task.version + 1;
                    task.save()
                        .then(() => res.json("Task saved successfully"))
                } else {
                    res.json("Your version of task was outdated")
                }
            })
            .catch(err => res.json('Error:' + err))
    })
);

router.route('/:id/add-comment').post(verifyToken, (req, res) =>
    auth.verifyUserAuth(req,res,(authData) => {
        Task.findById(req.path.substring(1,req.path.lastIndexOf('/')))
            .then(task => {
                    task.comments.push({
                        content: req.body.content,
                        user: authData.firstName + ' ' + authData.lastName + ' ' + ' (' + authData.email + ')',
                        creationDate: new Date()
                    });
                    task.save()
                        .then(res.json("ok"))
            })
            .catch(err => res.json('Error:' + err))
    })
);

module.exports = router;
