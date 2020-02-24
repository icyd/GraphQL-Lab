import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema.js';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
app.use(cors());
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://test:1234@localhost:27017/mydb?authSource=admin', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening on port 4000.');
});
