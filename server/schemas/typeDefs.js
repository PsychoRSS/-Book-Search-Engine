const typeDefs = `
type User {
    id: ID!
    username: String!
    email: String!
    bookCount: String
    savedBooks: [Book]!
  }

type Book {
    bookId: ID
    authors: [String]!
    description: String!
    title: String!
    image: Stirng!
    link: String!
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
}

input bookInput {
    authors: [String!]!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String!
  }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username:String!, email: String!, password: String!): Auth
    saveBook(input: bookInput!): User
    removeBook(bookId: ID): User 
}
`