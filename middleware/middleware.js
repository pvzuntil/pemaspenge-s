const MRes = require("../lib/MRes");
const jwt = require('jsonwebtoken');

const authRequire = (req, res, next) => {
    const token = req.header('api_token');
    
    if (!token) {
        return res.send(MRes(99, 'Api Token Invalid.'))
    }
    
    try {
        let checkToken = jwt.verify(token, process.env.JWT_KEY)
        req.currentUser = checkToken
        return next()
    } catch (error) {
        return res.send(MRes(99, 'Api Token Invalid.'))
    }
}

module.exports = authRequire