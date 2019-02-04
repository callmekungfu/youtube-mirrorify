const express = require('express');
const grapqlHTTP = require('express-graphql');
const {
  buildSchema,
} = require('graphql');

const test = require('./testing');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello World',
};

app.use('/graphql', grapqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.status(200).json(test());
  res.end();
});
