import db from './db/connect.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import multer from 'multer';



// var express = require('express');
var app = express();
// var mysql = require('mysql');
// var cors = require('cors');
// const bodyParser = require('body-parser');
// var bcrypt = require("bcrypt");
var saltRounds = 10;
// var multer = require('multer');
var fileName = "";

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "hrms3"

// });

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

  app.get("/api/getleavesleft", (req, res) => {

    const stat = "SELECT Employee_id,Firstname,Lastname,Leaves_left from employee ;";
    db.query(stat, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
  
      }
    });
  


});

app.get("/api/getemps/:id", (req, res) => {
  const employee_id =req.params.id;
  const sqlSelect = "select * from employee where employee_id = ?";
  db.query(sqlSelect, employee_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result[0]['firstname']);
      res.send(result[0]);

    }
  })
})

app.post("/api/insertEmployee", (req, res) => {

  const data = req.body.employeeData
  const sqlInsert = "insert into employee (firstname,lastname,addressNo,street,city,payGrade,employmentStatus,partTime,jobTitle,supervisor,gender,dob,startDate,salary,email,department_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  db.query(sqlInsert, [data.firstname, data.lastname, data.addressNo, data.street, data.city, data.payGrade, data.employmentStatus, data.partTime, data.jobTitle, data.supervisor, data.gender, data.dob, data.startDate, data.salary, data.email, data.department_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  })
})

app.put('/api/updateEmployee', (req,res)=>{
  const data = req.body.employeeData
  const sqlUpdate = "update employee set email=?, addressNo=?, street=?, city=?, salary=?, department_id=?,payGrade=?,jobTitle=?,employmentStatus=?,partTime=?,supervisor=? where employee_id = ?"
  db.query(sqlUpdate, [data.email,data.addressNo,data.street,data.city,data.salary,data.department_id,data.payGrade,data.jobTitle,data.employmentStatus,data.partTime,data.supervisor,data.employee_id], (err,result)=>{
      if (err) console.log(err);
      else {
        console.log(data.employee_id);
        res.send({message: "User details updated"});
      }
  })
})

app.post("/api/insertUser", (req, res) => {

  const data = req.body.employeeData
  const defaultPassword = data.email + "password";
  // console.log(defaultPassword)
  const sqlInsert = "insert into user_table (username,password) values (?,?);"
  bcrypt.hash(defaultPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(sqlInsert, [data.email, hash], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "User(Email) already exists" });
      } else {
        res.send(data.email);

      }
    })
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
  const status=req.body.status;

  // console.log(startDate);
  const stat = "INSERT INTO leave_table (duration,description,start_date,type,employee_id,supervisor_id,document,leave_status) values (?,?,?,?,?,?,?,?);";
  db.query(stat, [duration, description, startDate, type, employee_id, supervisor_id, document,status], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      // console.log(req.file.filename)
    }
  })
  //     }
  //   });



  // });

});

app.post("/api/login", (req, res) => {
  const credentials = req.body.credentials;
  // console.log(credentials)
  const sqlSelect = "SELECT * from user_table where username= ?;";
  db.query(
    sqlSelect,
    [credentials.username],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      } if (result.length > 0) {
        bcrypt.compare(credentials.password, result[0].password, (err, response) => {
          if (response) {
            res.send(result);
          } else {
            res.send({ message: "Wrong Username/Password! Recheck your credentials please" });

          }
        })
        // res.send(credentials.username);

      }
      else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
})

app.post("/api/sendApproval", (req, res) => {

  const status=req.body.status;
  const leave_id=req.body.leave_id;
  const sta = "Update leave_table set leave_status = ? where leave_id=?";

  db.query(sta,[status,leave_id], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(result);
      console.log(req.url);
    }})

});

app.post("/api/saveLeaveChanges", (req, res) => {

  const emp_id=req.body.emp_id;
  const leavesLeft=req.body.leavesLeft;
  const sta = "Update employee set Leaves_left = ? where Employee_id=?";

  db.query(sta,[leavesLeft,emp_id], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(result);
      console.log(leavesLeft);
    }})

});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    fileName = file.originalname
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      //  return res.status(500).json(err)
    } else if (err) {
      //  return res.status(500).json(err)
    }
    var imgsrc = fileName
    res.send(imgsrc)
    // return res.status(200).send(req.file)

  })



});
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