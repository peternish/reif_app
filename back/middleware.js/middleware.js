var jwt = require('jsonwebtoken')
const { handleError } = require('../helper/helper')
var secret_key = process.env.SECRET_KEY

module.exports.authCheck = (req, res, next) => {
    try {
        var token = req.headers.authorization
        if (!token) {
            res.status(401).json({
                message: "Unauthorized User."
            })
        }
        else {
            jwt.verify(token, secret_key, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: 'Invalid Auth Token.'
                    })
                }
                else {
                    var userId = decoded.userId;
                    var userRole = decoded.userRole;
                    req.userId = userId;
                    req.userRole = userRole;
                    next()
                }
            })
        }
    } catch (err) {
        handleError(err, res)
    }
}