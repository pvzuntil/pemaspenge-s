const Joi = require('@hapi/joi')

const validation = {
    userSignup: (data) => {
        return Joi.object({
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6),
            repass: Joi.string().required().label('password confirmation')
        }).validate(data)
    },
    userSignin: (data) => {
        return Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6),
        }).validate(data)
    },
    createUpdateKas:(data)=>{
        return Joi.object({
            name: Joi.string().required().min(3),
            id: Joi.allow()
        }).validate(data)
    }
}

module.exports = validation