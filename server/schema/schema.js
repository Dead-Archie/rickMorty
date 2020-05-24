const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data

const books = [
  { name: "Name of the winds", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "1" },
  { name: "I am kalam", genre: "auto-Biography", id: "3", authorId: "3" },
  { name: "discovery of India", genre: "Sci-Fi", id: "4", authorId: "2" },
];

const authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "J L Neheu", age: 69, id: "2" },
  { name: "APJ Kalam", age: 87, id: "3" },
];

const bookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: authorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const authorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: bookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: function (obj, args, context, info) {
        // get data from db / other source
        console.log(args);
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: authorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
