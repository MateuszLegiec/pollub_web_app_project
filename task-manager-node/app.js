const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
const uri = 'mongodb+srv://test-manager:narzedzia-internetowe@taskmanager-2i6a8.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open',() => console.log('Successful connection with MongoDB'));

const authRouter = require('./src/route/auth');
const userRouter = require('./src/route/user');
const taskRouter = require('./src/route/task');

app.use('/api',authRouter);
app.use('/api/user',userRouter);
app.use('/api/task',taskRouter);

app.listen(5000, () => console.log('Server started on port 5000'));

//support.admin@gmail.com  password
//support.user@gmail.com password
