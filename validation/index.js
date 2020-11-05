const Joi = require('@hapi/joi')

const validation = {
    userLogin: (data) => {
        return Joi.object({
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6),
            repass: Joi.string().required().label('password confirmation')
        }).validate(data)
    }
}

module.exports = validation