const { celebrate, Joi, Segments } = require('celebrate')

module.exports = {
    validate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
              feed: Joi.string().uri({ scheme: ['http', 'https'] }).required()
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