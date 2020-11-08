const route = require('express').Router()
const validationSchema = require('../validation')
const mvalid = require('../lib/MValid')
const mres = require('../lib/MRes')
const User = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

route.post('/signup', async (req, res) => {
    const data = req.body

    let { error } = validationSchema.userSignup(data)
    if (error) {
        return res.send(mres(0, mvalid(error)))
    }

    if (data.password != data.repass) {
        return res.send(mres(0, 'password confirmation must same with password'))
    }

    let getUserByEmail = await User.findOne({
        email: data.email
    })
    if (getUserByEmail) {
        return res.send(mres(0, 'email sudah terdaftar'))
    }

    let saltBcrypt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(data.password, saltBcrypt)

    try {
        const user = User({
            name: data.name,
            email: data.email,
            password: securePass
        })
        await user.save()
    } catch (error) {
        return res.send(mres(0, 'ada yang aneh'))
    }

    return res.send(mres(1, 'berhasil mendaftar'))
});


route.post('/signin', async (req, res) => {
    const data = req.body

    let { error } = validationSchema.userSignin(data)
    if (error) {
        return res.send(mres(0, mvalid(error)))
    }

    let getUserByEmail = await User.findOne({
        email: data.email
    })

    if (!getUserByEmail) {
        return res.send(mres(0, 'email dan password anda salah'))
    }

    let comparePass = await bcrypt.compare(data.password, getUserByEmail.password)
    if (!comparePass) {
        return res.send(mres(0, 'email dan password anda salah'))
    }

    let token = jwt.sign({
        name: getUserByEmail.name,
        email: getUserByEmail.email,
        id: getUserByEmail._id
    }, process.env.JWT_KEY)

    return res.send(mres(1, 'berhasil masuk', {
        token
    }))
});

module.exports = route