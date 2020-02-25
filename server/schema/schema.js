import { makeExecutableSchema } from 'graphql-tools';
import Book from '../models/book.js';
import Author from '../models/author.js';

const typeDefs = `
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    age: Int
    books: [Book]
  }

  type Query {
   book(id: ID!): Book
   author(id: ID!): Author
   books: [Book]
   authors: [Author]
  }
  type Mutation {
    addBook(
      name: String!
      genre: String!
      authorId: ID!
    ): Book
    addAuthor(
      name: String!
      age: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    books: () => Book.find(),
    authors: () => Author.find(),
    book: (_, { id }) => Book.findById(id),
    author: (_, { id }) => Author.findById(id),
  },
  Mutation: {
    addBook: (_, args) => {
      const book = new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      });

      return book.save();
    },
    addAuthor: (_, args) => {
      const author = new Author({
        name: args.name,
        age: args.age
      });

      return author.save();
    }
  },
  Book: {
    author: (book) => Author.findById(book.authorId),
  },
  Author: {
    books: (author) => Book.find({authorId: author.id}),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
