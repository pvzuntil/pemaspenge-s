const route = require('express').Router()
const validationSchema = require('../validation')
const mvalid = require('../lib/MValid')
const mres = require('../lib/MRes')
const User = require('../model/Users')
const bcrypt = require('bcrypt')

route.post('/login', async (req, res) => {
    const data = req.body

    let { error } = validationSchema.userLogin(data)
    if (error) {
        return res.send(mres(0, mvalid(error)))
    }

    if (data.password != data.repass) {
        return res.send(mres(0, 'password confirmation must same with password'))
    }

    let getUserByEmail = await User.findOne({
        email: data.email
    })
    if(getUserByEmail){
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

    return res.send(mres(1, 'masuk'))
});

module.exports = route