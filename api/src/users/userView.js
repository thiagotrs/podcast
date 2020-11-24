module.exports = {
    renderMany(users) {
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }))
    },

    renderOne(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}