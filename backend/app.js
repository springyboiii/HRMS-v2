var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
const bodyParser = require('body-parser');
var bcrypt =require("bcrypt");
var saltRounds=10;

const db=mysql.createPool({
  host:"localhost",
  user:"root",
  password:"",
  database:"hrms"

});

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/leave", (req, res) => {

  const stat = "SELECT * FROM leave_table where leave_status='Pending';";
  db.query(stat, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });


});


app.get("/api/getleave", (req, res) => {

  const stat = "SELECT * FROM leave_table;";
  db.query(stat, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });


});

app.post("/api/insertEmployee", (req, res) => {

  const data = req.body.employeeData

// app.post("/api/insert",(req,res)=>{

//   const startDate=req.body.startDate;
//   const duration=req.body.duration;
//   const description=req.body.description;
//   const type=req.body.type;
//   const employee_id=req.body.employee_id;

//   const supervisor_id=req.body.supervisor_id;
//   const document=req.body.document;
//   // console.log(startDate);
//   const stat="INSERT INTO leave_table (duration,description,start_date,type,employee_id,supervisor_id,document) values (?,?,?,?,?,?,?);";
//   db.query(stat,[duration,description,startDate,type,employee_id,supervisor_id,document],(err,result)=>{
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("Values Inserted");
  const sqlInsert = "insert into employee (first_name,last_name,address_no,address_street,ADDRESS_CITY,pay_grade,employment_status_type,is_parttime,title,is_supervisor,gender,dob,joined_date,salary,email,department_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  db.query(sqlInsert, [data.firstName, data.lastName, data.addressNo, data.street, data.city, data.payGrade, data.employmentStatus, data.partTime, data.jobTitle, data.supervisor, data.gender, data.dob, data.startDate, data.salary, data.email, data.department], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }  })
})
app.post("/api/insertUser", (req, res) => {

  const data = req.body.employeeData
  const defaultPassword=data.email+"password";
  // console.log(defaultPassword)
  const sqlInsert="insert into user_table (username,password) values (?,?);"
  bcrypt.hash(defaultPassword,saltRounds,(err,hash)=>{
    if(err){
      console.log(err);
    }
    db.query(sqlInsert, [data.email,hash], (err, result) => {
      if (err) {
        console.log(err);
        res.send({message:"User(Email) already exists"});
      } else {
        res.send(data.email);
  
      }  })
  })
  
})

app.post("/api/insert", (req, res) => {

  const startDate = req.body.startDate;
  const duration = req.body.duration;
  const description = req.body.description;
  const type = req.body.type;
  const employee_id = req.body.employee_id;

  const supervisor_id = req.body.supervisor_id;
  const document = req.body.file;
  
  // console.log(startDate);
  const stat = "INSERT INTO leave_table (duration,description,start_date,type,employee_id,supervisor_id,document) values (?,?,?,?,?,?,?);";
  db.query(stat, [duration, description, startDate, type, employee_id, supervisor_id, document], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      // console.log(req.file.filename)
    }})
//     }
//   });


  
// });

});

app.post("/api/login",(req,res)=>{
  const credentials=req.body.credentials;
  // console.log(credentials)
  const sqlSelect="SELECT * from user_table where username= ?;";
  db.query(
    sqlSelect,
    [credentials.username],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      } if(result.length>0){
        bcrypt.compare(credentials.password,result[0].password,(err,response)=>{
          if(response){
            res.send(result);
          }else{
            res.send({message:"Wrong Username/Password! Recheck your credentials please"});

          }
        })
        // res.send(credentials.username);

      }
      else {
        res.send({message:"User doesn't exist"});
      }
    }
  );
})

app.listen(3001, () => {
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
