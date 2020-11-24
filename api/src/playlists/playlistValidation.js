const { celebrate, Joi, Segments } = require('celebrate')

module.exports = {
    validate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().empty('')
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