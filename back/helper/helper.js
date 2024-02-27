const con = require('../dbcon/dbcon');
const geoip = require('geoip-lite')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var saltRounds = parseInt(process.env.SALT)
var secret_key = process.env.SECRET_KEY

// query db
module.exports.executeQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        con.query(query, data, function (err, retrievedData) {
            if (err) {
                reject(err);
            } else {
                resolve(retrievedData);
            }
        });
    })
}

// helper function which hashes password
module.exports.hashPassword = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.log('Error during password hash', err);
                reject(err);
            } else {
                resolve(hashedPassword);
            }
        });
    });
};

// compare password
module.exports.comparePasswords = (plainPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
            if (err) {
                console.log('Error during password comparison', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// handle error
module.exports.handleError = (err, res) => {
    console.log(err.stack)
    res.status(500).json({
        message: 'Internal Server Error.'
    })
}

// get user timezone
module.exports.getTimeZone = (ip) => {
    return new Promise((resolve, reject) => {
        if (ip.includes('::ffff:')) {
            ip = ip.split(':').reverse()[0];
        }

        const lookedUpIP = geoip.lookup(ip);
        let timezone = null;

        if (lookedUpIP && lookedUpIP.ll) {
            timezone = lookedUpIP.timezone;
        }

        resolve(timezone);
    });
};

// generate json webtoken which contains user id
module.exports.generateAuthToken = (userId, userRole) => {
    const payload = {
        userId: userId,
        userRole: userRole
    };

    const options = {
        expiresIn: Math.floor(Date.now() / 1000) + (100 * 365 * 24 * 60 * 60)
    };

    const token = jwt.sign(payload, secret_key, options);
    return token;
};

// get current node
module.exports.getCurrentNode = (nodeIdArr, categoryData) => {
    let currentNode = categoryData;
    for (let nodeId of nodeIdArr.slice(1)) {
        currentNode = currentNode['children'][nodeId];
    }
    return currentNode;
}
// get parent node
module.exports.getParentNode = (nodeIdArr, categoryData) => {
    let currentNode = categoryData;
    for (let nodeId of nodeIdArr.slice(1, nodeIdArr.length - 1)) {
        currentNode = currentNode['children'][nodeId];
    }
    return currentNode;
}