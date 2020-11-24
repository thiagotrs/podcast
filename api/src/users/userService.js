const knex = require('../database')
const bcrypt = require('bcrypt')

module.exports = {
    async findAll() {
        return await knex('users').select()
    },

    async findOne(user_id) {
        return await knex('users')
            .where('id', user_id)
            .first()
    },

    async store({ name, email, pass, role }) {
        const hashedPass = await bcrypt.hash(pass, 10);
        
        return await knex('users')
            .insert({ name, email, pass: hashedPass, role })
            .then(result => {
                const [ id ] = result
                return { id, name, email, role }            
            })
    },

    async destroy(user_id) {
        return await knex('users')
            .where('id', user_id)
            .del()
    }
}