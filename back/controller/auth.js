const { handleError, getTimeZone, executeQuery, hashPassword } = require("../helper/helper")

module.exports.signup = async (req, res) => {
    try {
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
            signupDate: 'CURDATE()',
            lastLogin: 'CURDATE()',
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

        let q_signup = `
            INSERT INTO users
            (${columns.join(', ')})
            VALUES (${Array(columns.length).fill('?').join(', ')})
        `

        await executeQuery(
            q_signup,
            Object.values(userData)
        )

    } catch (err) {
        handleError(err, res)
    }
}