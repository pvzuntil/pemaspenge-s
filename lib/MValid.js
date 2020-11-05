const message = {
    required: (label) => `${label} is required.`,
    email: (label) => `${label} must be a valid email.`,
    empty: (label) => `${label} is not allowed to be empty.`,
    min: (label, min) => `${label} length must be at least ${min} characters long.`,
    string: (label) => `${label} must be a string.`,
}
const getMessage = function (obj) {
    let error = obj.details[0]
    // return error
    let finalMessage
    let type = error.type
    let ctx = error.context
    let label = ctx.label

    switch (type) {
        case 'any.required':
            finalMessage = message.required(label)
            break;
        case 'string.empty':
            finalMessage = message.empty(label)
            break;
        case 'string.email':
            finalMessage = message.email(label)
            break;
        case 'string.min':
            let min = ctx.limit
            finalMessage = message.min(label, min)
            break;
        case 'string.base':
            finalMessage = message.string(label)
            break;
    }
    return finalMessage
    // return message.typeEmail('sasa')
}

module.exports = getMessage