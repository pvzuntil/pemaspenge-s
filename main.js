const dotenv = require('dotenv')
const express = require('express');
const serv = express()
const mongoose = require('mongoose');
const authRequire = require('./middleware/middleware');

const authRoute = require('./route/auth');
const kasRoute = require('./route/kas');

dotenv.config()

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('DB SAFE');
})

serv.use(express.json())

serv.get('/', (req, res) => {
    res.send('MASUK')
})

serv.use('/auth', authRoute)
serv.use('/api/kas', authRequire, kasRoute)

serv.listen('3000', () => console.log('RUN !'))