const { User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query :{
        user: async () => {
            return User.findOne()
        },
        Book: async ( parent, { username }) => {
            return User.findOne({username}).populate('savedBooks')
        },
        me: async ( parent, args , context) => {
            return User.findOne({id: context.user.id})
        }
    },

    Mutaions: {
        addUser: async ( parent , args, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },

          login: async (parent, args ,{ email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },

          saveBook: async ( parent, args, { userId, input }) => {
            try {
              const user = await User.findById(userId);
      
              if (!user) {
                throw new Error('User not found');
              }
      
              user.books.push({
                authors: input.authors,
                description: input.description,
                title: input.title,
                bookId: input.bookId,
                image: input.image,
                link: input.link,
              });

              await user.save();
      
              return user;
            } catch (error) {
              console.error(error);
              throw new Error('Failed to save book');
            }
          },
        },

        removeBook: async ( parent, args ,{ bookId, userId}) =>{
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }

                user.books = user.books.filter((book) => book.bookId !== bookId);

                await user.save();

                return user;

            } catch (error) {
            console.error(error);
            throw new Error('Failed to save book');
            }
        }
};

module.exports = resolvers;