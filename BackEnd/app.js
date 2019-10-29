var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const index = require('./routes/index');
const submitBlog = require('./routes/submitblog');
const getBlogs = require('./routes/getblogs');
const getBlog = require('./routes/getblog');
const deleteBlog = require('./routes/deleteblog');
const updateBlog = require('./routes/updateblog');
const uploadImage = require('./routes/uploadimage');
const auth = require('./routes/auth');
const authkey = require('./routes/authkey');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '5mb',
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/auth', auth);
app.use('/api/submitblog', submitBlog);
app.use('/api/getblogs', getBlogs);
app.use('/api/getblog', getBlog);
app.use('/api/deleteblog', deleteBlog);
app.use('/api/updateblog', updateBlog);
app.use('/api/uploadimage', uploadImage);
app.use('/api/authkey', authkey);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;