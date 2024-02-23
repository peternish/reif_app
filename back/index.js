const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: '.env.local' })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Acess-Control-Allow-Headers,Authorization,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

require('./dbcon/dbcon')

app.use('/auth', router)
app.use('/api', router)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});