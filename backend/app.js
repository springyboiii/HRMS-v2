var express = require('express');
var app = express();
var mysql=require('mysql');
var cors=require('cors');
const bodyParser = require('body-parser');

const db=mysql.createPool({
  host:"localhost",
  user:"root",
  password:"",
  database:"lab"
});

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended:true}));


app.post("/api/insert",(req,res)=>{

  const startDate=req.body.startDate;
  const duration=req.body.duration;
  // console.log(startDate);
  const stat="INSERT INTO leave_app (startDate,duration) values (?,?);";
  db.query(stat,[startDate,duration],(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");

    }
  });

  
});

app.listen(3001,()=>{
  console.log("running on port 3001");
})


// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
