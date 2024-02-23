const { handleError, getTimeZone, executeQuery, hashPassword, generateAuthToken, comparePasswords } = require("../helper/helper")

module.exports.signup = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);

        let ip = req.ip

        let name = req.body.name;
        let companyName = req.body.companyName;
        let employeeNumber = req.body.employeeNumber;
        let email = req.body.email;
        let passwordHash = await hashPassword(req.body.password);
        let accountStatus = 'active'
        let userRole = 'free_user'
        let phoneNumber = req.body.phoneNumber
        let timezone = await getTimeZone(ip)

        let userData = {
            name: name,
            companyName: companyName,
            employeeNumber: employeeNumber,
            email: email,
            passwordHash: passwordHash,
            signupDate: currentDate,
            lastLogin: currentDate,
            accountStatus: accountStatus,
            userRole: userRole,
            phoneNumber: phoneNumber,
            timezone: timezone
        }

        let columns = [
            'name',
            'company_name',
            'employee_number',
            'email',
            'password_hash',
            'signup_date',
            'last_login',
            'account_status',
            'user_role',
            'phone_number',
            'timezone'
        ]

        let q_email_check = `
            SELECT COUNT(*) as count
            FROM users
            WHERE email = ?
        `

        let q_signup = `
            INSERT INTO users
            (${columns.join(', ')})
            VALUES (${Array(columns.length).fill('?').join(', ')})
        `

        let q_get_user = `
            SELECT *
            FROM users
            WHERE email = ?
        `

        let duplicatedData = await executeQuery(
            q_email_check,
            [email]
        )

        if (duplicatedData[0].count != 0) {
            res.status(409).json({
                message: 'Sorry, this email address is already in use. Please try using a different email or log in with your existing account.'
            })
        }
        else {
            await executeQuery(
                q_signup,
                Object.values(userData)
            )
            let retrievedData = await executeQuery(
                q_get_user,
                email
            )
            let userId = retrievedData[0].id
            let userRole = retrievedData[0].user_role
            let authToken = generateAuthToken(userId, userRole)
            res.status(200).json({
                authToken: authToken
            })
        }

    } catch (err) {
        handleError(err, res)
    }
}

module.exports.signin = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);
        const email = req.body.email
        const password = req.body.password

        let q_get_user = `
            SELECT *
            FROM users
            WHERE email = ?
        `
        let q_update_user_last_login = `
        UPDATE users
        SET last_login = ?
        WHERE email = ?
    `

        let retrievedUserData = await executeQuery(
            q_get_user,
            [email]
        )

        if (retrievedUserData.length != 0) {
            let userId = retrievedUserData[0].id
            let userRole = retrievedUserData[0].user_role

            let passwordHash = retrievedUserData[0].password_hash
            let passwordCheck = await comparePasswords(password, passwordHash)
            if (passwordCheck) {
                await executeQuery(
                    q_update_user_last_login,
                    [currentDate, email]
                )
                let authToken = generateAuthToken(userId, userRole)
                res.status(200).json({
                    authToken: authToken
                })
            }
            else {
                res.status(401).json({
                    message: "Password doesn't match."
                })
            }
        }
        else {
            res.status(401).json({
                message: "Email doesn't exit."
            })
        }

    } catch (err) {
        handleError(err)
    }
}