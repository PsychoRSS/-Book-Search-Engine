const { User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query :{
        user: async () => {
            return User.findOne()
        },
        Book: async (parent, { username }) => {
            return User.findOne({username}).populate('savedBooks')
        },
        me: async (parent, args, context) => {
            return User.findOne({id: context.user.id})
        }
    },

    Mutaions: {
    
              addUser: (_, { username, email, password }) => {
                const { token, user } = addUserFunction(username, email, password);
                return {
                  token,
                  user,
                };
              },
    }
}