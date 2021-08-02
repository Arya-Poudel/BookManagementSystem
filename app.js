const express =  require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const indexRouter = require('./routes/index');

//setup monoDb connection
const mongoDb = process.env.MONGODB_URI;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Book management system listening at port: ${port}`)
})