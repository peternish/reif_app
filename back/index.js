const express = require('express')
const app = express();
require('dotenv').config({ path: '.env.local' })

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});