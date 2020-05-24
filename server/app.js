const express = require("express");
const graphQlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  "/grpahql",
  graphQlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listing port 4000");
});
