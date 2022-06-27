import db from './db/connect.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import session from 'express-session';


// var express = require('express');
var app = express();
app.use(cors({
  'origin': "http://localhost:3000",
  'methods': ['GET,POST', 'PUT'],
  'credentials': true,
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session(
  {
    key: "user_id",
    secret: "kutti nayanthara",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24
    }
  }
))
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

app.use(express.json());
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/GrpEmp", (req, res) => {

  const dept = req.body.dept;
  const jobtitle = req.body.jobTitle;

  const payGrade = req.body.payGrade;

  console.log(dept, jobtitle, payGrade)
  const sqlSelect = "SELECT * from employee where department_id=? and jobTitle=? and payGrade=?;";

  db.query(sqlSelect, [dept, jobtitle, payGrade], (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ message: "error"});
    } else {
      res.send(result);
      console.log(result)

    }
  })


})

app.get("/api/logout", (req, res) => {
  res.clearCookie('user_id');

  res.send({ message: "cookie cleared" });
});

app.get("/api/leave", (req, res) => {
  const supervisor_id = "125";
  const stat = "SELECT * FROM leave_table where leave_status='Pending' and supervisor_id=?;";
  db.query(stat, supervisor_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });


});


app.get("/api/getdeptsalary", (req, res) => {
  const stat = "SELECT department_id, SUM(salary) as total_salary FROM employee GROUP BY department_id;";
  db.query(stat, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });


});

app.get("/api/getjobage", (req, res) => {
  const date = new Date();
  // CAST(select GETDATE() AS Date )
  const stat = "SELECT jobTitle, AVG(DATEDIFF(?, dob)/365) as avgAge FROM employee GROUP BY jobTitle;";
  db.query(stat, date, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });


});


app.get("/api/getpaysalary", (req, res) => {
  const stat = "SELECT payGrade, SUM(salary) as total_salary FROM employee GROUP BY payGrade;";
  db.query(stat, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });


});





app.get("/api/getleave/:empId", (req, res) => {

  const employee_id = req.params.empId;
  const stat = "SELECT * FROM leave_table where employee_id=?";
  db.query(stat, employee_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });
});

app.get("/api/getPayGradeLeaves", (req, res) => {

  const stat = "SELECT payGrade,leaves from paygrade_leave;";
  db.query(stat, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });




});

app.get("/api/getBalanceLeave/:empId", (req, res) => {

  const employee_id = req.params.empId;
  console.log(employee_id)

  const stat = "SELECT Leaves_left FROM employee where employee_id=?";

  db.query(stat, employee_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result[0]['Leaves_left']);
      res.send(result[0]);

    }
  });
});







app.get("/api/getemps/:Username", (req, res) => {
  const email = req.params.Username;
  const sqlSelect = "select * from employee left outer join supervisor using (employee_id) where email = ?";
  // console.log(email);
  db.query(sqlSelect, email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      res.send(result[0]);

    }
  })
})

app.get("/api/getemps2/:id", (req, res) => {
  const employee_id = req.params.id;
  const sqlSelect = "select * from employee left outer join supervisor using (employee_id) where employee_id = ?";
  // console.log(employee_id);
  db.query(sqlSelect, employee_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      res.send(result[0]);

    }
  })
})

// app.post("/api/getEmployee", (req, res) => {

//   const email = req.body.email;
//   console.log(email);
//   const sqlSelect = "select * from employee where email = ?;";
//   db.query(sqlSelect, email, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {      
//       res.send(result[0]);

//     }
//   })
// })

app.post("/api/insertEmployee", (req, res) => {

  const data = req.body.employeeData

  var leaves = 0;

  const sqlSelect = "select leaves from paygrade_leave where payGrade = ?";
  // console.log(employee_id);
  db.query(sqlSelect, data.payGrade, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      leaves = result[0]['leaves'];
      // console.log(leaves);
      const sqlInsert = "insert into employee (firstname,lastname,addressNo,street,city,payGrade,employmentStatus,partTime,jobTitle,supervisor,gender,dob,startDate,salary,email,department_id,leaves_left) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
      console.log(leaves);
      db.query(sqlInsert, [data.firstname, data.lastname, data.addressNo, data.street, data.city, data.payGrade, data.employmentStatus, data.partTime, data.jobTitle, data.supervisor, data.gender, data.dob, data.startDate, data.salary, data.email, data.department_id, leaves], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const sqlSelect = "select employee_id from employee where email=?;";
          db.query(sqlSelect, data.email, (err, resultid) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(result[0]['firstname']);
              // res.send(result[0]);
              if (data.supervisor_id !== '') {
                const sqlSelect3 = "select count(1) from employee where employee_id=?;";
                db.query(sqlSelect3, data.supervisor_id, (err, resultcount) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(resultcount)
                    if (resultcount[0]['count(1)'] === 1) {
                      const sqlSelect2 = "select supervisor from employee where employee_id=?;";
                      db.query(sqlSelect2, data.supervisor_id, (err, result) => {
                        if (err) {
                          // console.log(err);
                          res.send(err)
                        } else {
                          console.log(result[0]['supervisor']);
                          // res.send(result[0]);
                          if (result[0]['supervisor'] === 1) {
                            const sqlInsert2 = "insert into supervisor (supervisor_id,employee_id) values (?,?);"
                            db.query(sqlInsert2, [data.supervisor_id, resultid[0]['employee_id']], (err, result) => {
                              if (err) {
                                res.send(err);
                              } else {
                                res.send({ message: "Employee and supervisor successfully added" });

                              }
                            })
                          }
                          else {
                            res.send({ message: "Employee was added, but supervisor isn't a supervisor" });
                          }

                        }
                      })
                    }
                    else {
                      res.send({ message: "Employee was added, but supervisor wasn't added" });
                    }

                  }
                })






              }


            }
          })
        }
      })

    }
  })
})

app.put('/api/updateEmployee', (req, res) => {
  const data = req.body.employeeData
  const sqlUpdate = "update employee set addressNo=?, street=?, city=?, salary=?, department_id=?,payGrade=?,jobTitle=?,employmentStatus=?,partTime=?,supervisor=? where employee_id = ?"
  db.query(sqlUpdate, [data.addressNo, data.street, data.city, data.salary, data.department_id, data.payGrade, data.jobTitle, data.employmentStatus, data.partTime, data.supervisor, data.employee_id], (err, result) => {
    if (err) console.log(err);
    else {
      console.log(data.employee_id);
      // res.send({ message: "User details updated" });
    }
  })
  const sqlSelect = "select count(1) from supervisor where employee_id=?;";
  db.query(sqlSelect, data.employee_id, (err, resultcount) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      // res.send(result[0]);
      if (resultcount[0]['count(1)'] === 1) {
        if (data.supervisor_id === '') {
          const sqlDelete = "delete from supervisor where employee_id=?;";
          db.query(sqlDelete, data.employee_id, (err, result) => {
            if (err) console.log(err);
            else {
              // console.log(data.employee_id);
              res.send({ message: "Employee details updated and Supervisor table entry deleted successfully" });
            }
          })
        }
        else {
          const sqlSelect4 = "select count(1) from employee where employee_id=?;";
          db.query(sqlSelect4, data.supervisor_id, (err, resultcount3) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(resultcount3)
              console.log("Hi Prathu from update")
              if (resultcount3[0]['count(1)'] === 1) {
                const sqlSelect5 = "select supervisor from employee where employee_id=?;";
                db.query(sqlSelect5, data.supervisor_id, (err, result) => {
                  if (err) {
                    // console.log(err);
                    res.send(err)
                  } else {
                    console.log(result[0]['supervisor']);
                    // res.send(result[0]);
                    if (result[0]['supervisor'] === 1) {
                      const sqlUpdate2 = "update supervisor set supervisor_id=? where employee_id = ?"
                      db.query(sqlUpdate2, [data.supervisor_id, data.employee_id], (err, result) => {
                        if (err) console.log(err);
                        else {
                          console.log(data.employee_id);
                          res.send({ message: "Employee and supervisor details updated" });
                        }
                      })
                    }
                    else {
                      res.send({ message: "Employee details updated, but supervisor isn't a supervisor" });
                    }

                  }
                })
              }
              else {
                res.send({ message: "Employee details updated, but supervisor wasn't added" });
              }

            }
          })


        }
      }
      else {
        const sqlSelect3 = "select count(1) from employee where employee_id=?;";
        db.query(sqlSelect3, data.supervisor_id, (err, resultcount2) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(resultcount2)
            console.log("Hi Prathu")
            if (resultcount2[0]['count(1)'] === 1) {
              const sqlSelect2 = "select supervisor from employee where employee_id=?;";
              db.query(sqlSelect2, data.supervisor_id, (err, result) => {
                if (err) {
                  // console.log(err);
                  res.send(err)
                } else {
                  console.log(result[0]['supervisor']);
                  // res.send(result[0]);
                  if (result[0]['supervisor'] === 1) {
                    const sqlInsert2 = "insert into supervisor (supervisor_id,employee_id) values (?,?);"
                    db.query(sqlInsert2, [data.supervisor_id, data.employee_id], (err, result) => {
                      if (err) {
                        res.send(err);
                      } else {
                        res.send({ message: "Employee details updated and supervisor added successfully" });

                      }
                    })
                  }
                  else {
                    res.send({ message: "Employee details updated, but supervisor isn't a supervisor" });
                  }

                }
              })
            }
            else {
              res.send({ message: "Employee details updated, but supervisor wasn't added" });
            }

          }
        })
      }

    }
  })


})

app.put('/api/updateLeaves', (req, res) => {
  const data = req.body.employeeData
  const sqlUpdate = "update employee set leaves_left = ? where employee_id = ?"
  db.query(sqlUpdate, [data.Leaves_left, data.employee_id], (err, result) => {
    if (err) console.log(err);
    else {
      console.log(data.employee_id);
      res.send({ message: "Leave  details updated" });
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

app.post("/api/changePassword", (req, res) => {

  const email = req.body.email
  const password = req.body.password
  // console.log(email,password)
  const sqlUpdate = "UPDATE user_table SET password=? WHERE username=?"
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(sqlUpdate, [hash, email], (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ message: "User(Email) already exists" });
      } else {
        res.send(result);

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
  const status = req.body.status;

  // console.log(startDate);
  const stat = "INSERT INTO leave_table (duration,description,start_date,type,employee_id,supervisor_id,document,leave_status) values (?,?,?,?,?,?,?,?);";
  db.query(stat, [duration, description, startDate, type, employee_id, supervisor_id, document, status], (err, result) => {
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
            console.log(result[0].username);
            req.session.user = result[0].username;
            console.log(req.session.user)
            res.send(result);
          } else {
            res.send({ message: "Incorrect Username/Password." });

          }
        })
        // res.send(credentials.username);

      }
      else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.get("/api/login", (req, res) => {
  if (req.session.user) {
    const sqlSelect = "Select payGrade,jobTitle,supervisor from employee where email=?"
    db.query(sqlSelect, req.session.user, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result[0].payGrade);
        // res.send(result[0]);
        req.session.payGrade = result[0].payGrade;
        req.session.jobTitle = result[0].jobTitle;
        req.session.supervisor = result[0].supervisor;

        res.send({ loggedIn: true, user: req.session.user, payGrade: req.session.payGrade, jobTitle: req.session.jobTitle, supervisor: req.session.supervisor })

      }
    })
    // res.send({loggedIn:true,user:req.session.user})
  } else {
    res.send({ loggedIn: false })

  }
})

app.post("/api/sendApproval", (req, res) => {

  const status = req.body.status;
  const leave_id = req.body.leave_id;
  const employee_id = req.body.employee_id;
  const Leaves_left = req.body.Leaves_left;
  const sta = "Update leave_table set leave_status = ? where leave_id=? "
  const sta1 = "update employee set Leaves_left = ? where employee_id=?"

  db.query(sta, [status, leave_id], (err, result) => {
    if (err) {
      console.log(err);

    } else {

    }
  })


  db.query(sta1, [Leaves_left, employee_id], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(result);
      console.log(req.url);
    }
  })

});

app.get("/api/leaveReport", (req, res) => {

  const fromdate = new Date(req.query.fromdate);
  const todate = new Date(req.query.todate);
  const department_id = req.query.department_id;

  // const v1 = "create view v1 as select leave_id, start_date, duration from leave_table left outer join employee using (employee_id) where start_date>=? and DATEADD(dd, duration, start_date)<=? and department_id=?;";
  // const v2 = "create view v2 as select leave_id, start_date, datediff(day,start_date,?) as duration from leave_table left outer join employee using (employee_id) where start_date>=? and start_date <= ? and DATEADD(dd, duration, start_date)>=? and department_id=?;";
  // const v3 = "create view v3 as select leave_id, start_date, datediff(day,?,DATEADD(dd, duration, start_date)) as duration from leave_table left outer join employee using (employee_id) where start_date<=? and DATEADD(dd, duration, start_date) >= ? and DATEADD(dd, duration, start_date)<=? and department_id=?;";
  // const sqlselect = "select sum(duration) from v1 union all select sum(duration) from v2 union all select sum(duration) from v3;";

  const sqlSelect = "select leave_id, start_date, duration, employee_id from leave_table left outer join employee using (employee_id) where department_id=?;";

  const getDateString = (dateString) => {
    var dateString = new Date(dateString);
    const dd = String(dateString.getDate()).padStart(2, "0");
    const mm = String(dateString.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = dateString.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  db.query(sqlSelect, department_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['leave_id'])
      // console.log(typeof(fromdate));
      var count = 0;
      for (var i = 0; i < result.length; i++) {
        // console.log(getDateString(result[i]['start_date']))        
        var startdate = new Date(getDateString(result[i]['start_date']));
        var duration = result[i]['duration']
        var enddate = addDays(startdate, duration)
        // enddate.setDate(enddate.getDate() + duration);
        // console.log(startdate)
        // console.log(enddate)
        // console.log((startdate <= fromdate) && (enddate >= todate))
        // console.log(fromdate);
        if (startdate >= fromdate && enddate <= todate) {
          count += duration;
        }
        else if (startdate >= fromdate && startdate <= todate && enddate >= todate) {
          count += getDifferenceInDays(startdate, todate)
        }
        else if (startdate <= fromdate && enddate >= fromdate && enddate <= todate) {
          count += getDifferenceInDays(fromdate, enddate)
        }
        else if (startdate <= fromdate && enddate >= todate) {
          count += getDifferenceInDays(fromdate, todate)
        }

      }
      console.log(count);
      res.send({ count: count });

    }
  })

  // db.query(v2, [todate, fromdate, todate, todate, department_id], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {

  //   }
  // })

  // db.query(v3, [fromdate, fromdate, fromdate, todate, department_id], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {

  //   }
  // })

  // db.query(sqlselect, (err, result) => {
  //   if (err) {
  //     console.log(err);

  //   } else {
  //     res.send(result);
  //     console.log(result);
  //   }
  // })

});

app.post("/api/sendRejection", (req, res) => {

  const status = req.body.status;
  const leave_id = req.body.leave_id;

  const sta = "Update leave_table set leave_status = ? where leave_id=? "

  db.query(sta, [status, leave_id], (err, result) => {
    if (err) {
      console.log(err);

    } else {
      res.send(result);

    }
  })

});

app.post("/api/savePaygradeLeaveChanges", (req, res) => {

  const payGrade = req.body.payGrade;
  const leaves = req.body.leaves;
  const sta = "Update paygrade_leave set leaves = ? where payGrade=?";

  db.query(sta, [leaves, payGrade], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(leaves);
    }
  })

});

app.get("/api/getdeptemp/:dept", (req, res) => {
  const deptNo = req.params.dept;
  const sqlSelect = "select * from employee where department_id = ?";
  // console.log(email);
  db.query(sqlSelect, deptNo, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      res.send(result);

    }
  })
})
app.get("/api/grpemp/:dept", (req, res) => {
  const deptNo = req.params.dept;
  const sqlSelect = "select * from employee where department_id = ?";
  // console.log(email);
  db.query(sqlSelect, deptNo, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      res.send(result);

    }
  })
})


app.get("/api/geteId/:Username", (req, res) => {
  const emp_user = req.params.Username;
  const sqlSelect = "select employee_id from employee where email = ?";
  db.query(sqlSelect, emp_user, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      res.send(result[0]);

    }
  })
})

app.get("/api/supeId/:empId", (req, res) => {
  const emp_id = req.params.empId;
  const sqlSelect = "select supervisor_id from supervisor where employee_id = ?";
  db.query(sqlSelect, emp_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result[0]['firstname']);
      res.send(result[0]);

    }
  })
})

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