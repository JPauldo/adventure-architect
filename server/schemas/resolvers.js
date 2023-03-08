const { User } = require('../models');

const resolvers = {
    Query: {
        // Get all users in DB
        getAllUsers: async (parent, args) => {
            return await User.find({});
        }
    }
}

module.exports = resolvers;