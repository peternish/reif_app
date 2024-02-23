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