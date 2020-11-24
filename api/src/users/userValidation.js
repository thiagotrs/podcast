const { celebrate, Joi, Segments } = require('celebrate')
const Roles = require('../auth/userRoles')

module.exports = {
    validate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                pass: Joi.string().required(),
                role: Joi.string().valid(...Object.values(Roles)).required()
            }),
        })
    },

    validateParams() {
        return celebrate({
            [Segments.PARAMS]: {
                id: Joi.number().positive().required()
            }
        })
    }
}