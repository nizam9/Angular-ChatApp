import express from 'express';
import createError from 'http-errors';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
const keys = require('./config/keys');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Error in connecting to MongoDB: ', err));
mongoose.set('useFindAndModify', false);
// Allowed all origin request via CORS
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// Middlewares123
// app.use(bodyParser.json());


app.use(logger('dev'));
app.use(express.json());
// Session Setup
app.use(session({

    // It holds the secret key for session
    secret: 'my_Secret_Key',

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport);

// Your Routings here
import UserRoutes from './app/modules/routes/user-route';
import ChatRoutes from './app/modules/routes/chat-route';
app.use('/api/v1', [UserRoutes, ChatRoutes]);

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.sendStatus(status);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


module.exports = app;