
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `building` varchar(100) NOT NULL,
  `head_id` int(11) NOT NULL,
  PRIMARY KEY (`department_id`)
) ;
INSERT INTO `department` VALUES (1,'Sumanadasa',2),(2,'ENTC',3),(3,'Civil Auditorium',4);

CREATE TABLE `paygrade_leave` (
  `payGrade` varchar(2) NOT NULL,
  `leaves` int NOT NULL,
  PRIMARY KEY (`payGrade`)
) ;
INSERT INTO `paygrade_leave` VALUES (1,20),(2,30),(3,40);


DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `addressNo` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `payGrade` varchar(2) NOT NULL,
  `employmentStatus` varchar(2) NOT NULL,
  `partTime` tinyint(1) NOT NULL,
  `jobTitle` varchar(2) NOT NULL,
  `supervisor` tinyint(1) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `dob` date NOT NULL,
  `startDate` date NOT NULL,
  `resignedDate` date DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `leaves_left` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  FOREIGN KEY (`payGrade`) REFERENCES `paygrade_leave` (`payGrade`)
) ;

DROP TABLE IF EXISTS `employee_phone`;
CREATE TABLE `employee_phone` (
  `employee_id` int(11) NOT NULL,
  `phone_no` int(11) NOT NULL,
  PRIMARY KEY (`employee_id`,`phone_no`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ;

DROP TABLE IF EXISTS `supervisor`;
CREATE TABLE `supervisor` (
  `supervisor_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`supervisor_id`,`employee_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ;

DROP TABLE IF EXISTS `leave_table`;
CREATE TABLE `leave_table` (
  `leave_id` int(11) NOT NULL AUTO_INCREMENT,
  `duration` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `start_date` date NOT NULL,
  `type` tinyint(4) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `supervisor_id` int(11) NOT NULL,
  `document` varchar(255) DEFAULT NULL,
  `leave_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`leave_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`employee_id`)
) ;

DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ;
