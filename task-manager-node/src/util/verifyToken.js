const verifyToken = (req, res, next) => {
    if(typeof req.headers['authorization'] !== 'undefined') {
        req.token = req.headers['authorization'];
        next();
    } else
        res.sendStatus(403);
};

module.exports = verifyToken;
