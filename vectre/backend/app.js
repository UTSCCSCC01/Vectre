var createError = require('http-errors');
var express = require('express');
var config = require('./config');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'),
    postsRouter = require('./routes/posts'),
    notificationsRouter = require('./routes/notifications')
    communitiesRouter = require('./routes/communities')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: config.frontendBaseUrl,
    credentials: true
}
app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/notifications', notificationsRouter);
app.use('/communities', communitiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// close neo4j-driver when node.js app exits
app.use(function neo4jSessionCleanup(req, res, next) {
    res.on('finish', function () {
        if (req.neo4jSession) {
            req.neo4jSession.close();
            delete req.neo4jSession;
        }
    });
    next();
});

module.exports = app;
