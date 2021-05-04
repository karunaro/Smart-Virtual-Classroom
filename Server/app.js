var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport");
var cors = require('cors')

require('dotenv').config()

var quizzRouter = require('./routes/quizz');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var meetopiaRouter = require('./routes/meetopia');
var projectRouter = require('./routes/project');
var questionsRouter = require('./routes/questions');
var groupRouter = require('./routes/group');
var validationsRouter = require('./routes/validations');
const classesController = require("./routes/classesController");
const seancesController = require("./routes/seancesController");
const classesGroupController = require("./routes/classesGroupController");
const CoursesController = require("./routes/coursesController");
const invitationController = require("./routes/invitationClassController");
const sectionController = require("./routes/sectionController");

var app = express();
 
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Quizzes', quizzRouter);
app.use('/users', usersRouter);
app.use('/Meetopia', meetopiaRouter);
app.use('/project', projectRouter);
app.use('/questions', questionsRouter);
app.use('/groups', groupRouter);
app.use('/validations', validationsRouter);
app.use("/class", classesController);
app.use("/seance", seancesController);
app.use("/classesGroup", classesGroupController);
app.use("/course", CoursesController);
app.use("/invitation", invitationController);
app.use("/section", sectionController);

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
console.log(process.env.mongoURI_NEJI)
mongoose.connect(process.env.mongoURI_NEJI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  

module.exports = app;
