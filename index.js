require('dotenv').config()
const express = require('express')
const database = require('./db')
const PORT = process.env.PORT || 3000
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

const start = async () => {
    try {
        await database.authenticate()
        await database.sync()
        app.listen(PORT, console.log(`Server is working on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();