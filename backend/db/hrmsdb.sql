
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
  `salary` int(11) DEFAULT NULL,
  `leaves_left` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  FOREIGN KEY (`payGrade`) REFERENCES `paygrade_leave` (`payGrade`),
  CHECK (`salary` >= 20000 AND `salary` <= 400000) 
) ;

INSERT INTO `user_table` (`username`, `password`) VALUES
('managerone@gmail.com', '$2b$10$jAdWB80x0Mh3w0xCxRDpAuozFsHzBhLfT5or6bNOAVZFkzJeCfpsG');

INSERT INTO `employee` (`employee_id`, `firstname`, `lastname`, `addressNo`, `street`, `city`, `payGrade`, `employmentStatus`, `partTime`, `jobTitle`, `supervisor`, `gender`, `dob`, `startDate`, `salary`, `leaves_left`, `email`, `department_id`) VALUES
(1, 'Manager', 'One', '60', 'flower road', 'Kandy', '3', '3', 0, '3', 1, 1, '1985-06-29', '2022-03-10', 200000, 50, 'managerone@gmail.com', 1);


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
  `supervisor_id` int(11) DEFAULT NULL,
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

DELIMITER //
CREATE PROCEDURE deptemp (IN dept INTEGER)
BEGIN
  select * from employee where department_id = dept;
END//;

delimiter // 
create trigger paygrade_leave_after_update after update on paygrade_leave for each row begin update employee set leaves_left=if(new.leaves+leaves_left-old.leaves>=0,new.leaves+leaves_left-old.leaves,0) where employee.payGrade=new.payGrade;
end//;

delimiter //
CREATE TRIGGER employee_BEFORE_UPDATE BEFORE UPDATE ON employee FOR EACH ROW
BEGIN
	DECLARE old_leaves INT;
    DECLARE new_leaves INT;
    IF OLD.payGrade <> new.payGrade THEN
		select leaves into old_leaves from paygrade_leave where payGrade = OLD.payGrade;
        select leaves into new_leaves from paygrade_leave where payGrade = new.payGrade;        
        set new.leaves_left = if(new_leaves+OLD.leaves_left-old_leaves>=0,new_leaves+OLD.leaves_left-old_leaves,0);         
    END IF;
END//;

delimiter //
CREATE TRIGGER employee_AFTER_UPDATE AFTER UPDATE ON employee FOR EACH ROW
BEGIN
	IF OLD.supervisor <> new.supervisor AND new.supervisor = 0 THEN
		delete from supervisor where supervisor_id = new.employee_id;     
    END IF;
END//;


