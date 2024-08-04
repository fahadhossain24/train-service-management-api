const User = require("./user.model")

const userService = {
    createUser: async (data) => {
        return await User.create(data)
    },

    getUser: async(email) => {
        return await User.findOne({email})
    }
}

module.exports = userService

