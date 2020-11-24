const { celebrate, Joi, Segments } = require('celebrate')

module.exports = {
    validate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
              title: Joi.string().required(),
              description: Joi.string(),
              link: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
              enclosure: Joi.object().keys({
                  url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
                  duration: Joi.string()
              }),
              image: Joi.string().uri({ scheme: ['http', 'https'] })
            }),
            [Segments.PARAMS]: {
                id: Joi.number().positive().required()
            }
        })
    },

    validateParams() {
        return celebrate({
            [Segments.PARAMS]: {
                id: Joi.number().positive().required()
            }
        })
    },

    validateNestedParams() {
        return celebrate({
            [Segments.PARAMS]: {
                playlistId: Joi.number().positive().required(),
                episodeId: Joi.number().positive().required()
            }
        })
    }

}