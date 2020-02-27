"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import graphqlHTTP from 'express-graphql';
// import schema from './schema/schema';
// import mongoose from 'mongoose';
// import cors from 'cors';
var app = express_1.default();
// app.use(cors());
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect('mongodb://test:1234@localhost:27017/mydb?authSource=admin', { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//     console.log('conneted to database');
// });
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true
// }));
//
console.log(typeof app);
console.log(app.type);
app.use('/', function (req, res) {
    res.send('Hello world');
});
app.listen(4000, function () {
    console.log('Listening on port 4000.');
});
