-- MySQL dump 10.13  Distrib 5.7.22, for Win64 (x86_64)
--
-- Host: fall2018dbchirag.cu2xufztrpge.us-east-2.rds.amazonaws.com    Database: Food_Manufacturing
-- ------------------------------------------------------
-- Server version	5.7.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED='';

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `customer_id` int(5) NOT NULL AUTO_INCREMENT,
  `business_name` varchar(35) NOT NULL,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `customers_contact_number` varchar(15) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `zip_code` varchar(10) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,'Moet et Chandon','Sam','Christian','2903337679','132 Fieldstone Ave.','','70605'),(2,'BlackBerry','Gabriella','Johnston','9440335189','69 Randall Mill St.','','44024'),(3,'Burberry','Irene','Nixon','7691512522','8774 North Church Lane ','','21401'),(4,'Google','Kasey','Herman','6662160504','55 East Mulberry Lane','','37379'),(5,'Chase','Cannon','Kirby','9758281146','7560 Iroquois Ave. ','','34786'),(6,'Nintendo','Ana','Tate','6295181411','982 Paris Hill Dr.','','48174'),(7,'Honda Motor Company, Ltd','Issac','Ryan','5185218030','8367 Brown Lane','','08096');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `employee_id` varchar(255) NOT NULL,
  `first_name` varchar(35) NOT NULL,
  `LAST_name` varchar(35) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `contact_number` varchar(15) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `zip_code` varchar(10) NOT NULL,
  `department_id` int(2) NOT NULL,
  `designation` char(30) NOT NULL,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES ('AD0001','Mark','Campos','1987-05-19','1234567890','fviegas@yahoo.com','695 Harvard Ave.','Winston Salem','15102',1,'Admin'),('EM0001','Adrien','Patton','1985-03-13','5678901234','ducasse@aol.com','34 Valley Farms Lane','Capitol Heights','02453',2,'Employee'),('EM00010','Coral','Severance','1987-04-28','8278535984','pkilab@gmail.com','43 Warren Ave.','Rome','13440',2,'Employee'),('EM00011','Tyler','Tuley','2011-05-02','6939014922','whimsy@att.net','8859 Bohemia Dr','Venice','34293',3,'Employee'),('EM00012','Brande','Batman','2003-06-22','9159062518','chaffar@gmail.com','769 Pierce St.','Beachwood','44122',4,'Employee'),('EM00013','Charity','Roche','2000-07-21','2266218823','sbmrjbr@icloud.com','459 Nicolls Court','Independence','41051',2,'Employee'),('EM00014','Verdell','Bateman','2001-08-30','5501713982','jemarch@msn.com','9793 Market Lane','Gulfport','39503',3,'Employee'),('EM00015','Linda','Haberman','2002-09-10','5103992996','psharpe@gmail.com','75 Sycamore Drive','Long Beach','11561',4,'Employee'),('EM0002','Phoenix','Mcdonald','1969-04-01','6789012345','ilial@me.com','1 Bow Ridge Lane','Northbrook','53204',3,'Employee'),('EM0003','Cohen','Valenzuela','2004-08-09','7890123456','arebenti@att.net','44 Sulphur Springs Street','Mableton','42431',4,'Employee'),('EM0004','Marcus','Lloyd','1970-08-30','8901234567','boser@yahoo.ca','75 Front Lane','Rome','53151',2,'Employee'),('EM0005','Mckinley','Chase','1972-12-21','9012345678','squirrel@aol.com','9770 Briarwood Ave. ','Petersburg','46383',3,'Employee'),('EM0006','Marisa','Richards','2008-10-03','5193916083','kspiteri@outlook.com','7645 Mayfield Ave.','Villa Rica','44720',4,'Employee'),('EM0007','Rosario','Dressel','1990-01-01','0254763520','cderoove@yahoo.ca','53 Mayfield Street ','Enfield','06082',2,'Employee'),('EM0008','Joshua','Jagodzinski','1991-02-07','4315396926','onestab@hotmail.com','9078 Heritage St.','Greenwood','29646',3,'Employee'),('EM0009','Alaine','Carswell','1989-03-09','0901232374','gerlo@msn.com','7368 E. County Street','Indianapolis','46201',4,'Employee'),('MG0001','Shayla','Chavez','1976-08-21','2345678901','sagal@aol.com','549 Old Thorne St.','Meadville','43035',2,'Manager'),('MG0002','Cason','Peters','1988-07-22','3456789012','tubajon@hotmail.com','9149 Rocky River St.','Los Banos','42001',3,'Manager'),('MG0003','Kobe','Finley','1969-01-11','4567890123','hamilton@yahoo.com','8082 Oak Dr.','Oswego','84119',4,'Manager');
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Product` (
  `product_id` int(5) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(35) NOT NULL,
  `type_of_food` varchar(255) NOT NULL,
  `product_price` decimal(6,2) NOT NULL,
  `products_sold` int(10) DEFAULT NULL,
  `number_products_produced` int(10) DEFAULT NULL,
  `profit_percentage` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Pizza','Bread',8.00,2434,3000,60.00),(2,'Pasta','salads',6.00,1434,1500,50.00),(3,'Desert','sweet',15.00,2800,3000,80.00),(4,'Sandwiches','vegetables',7.00,4434,5000,60.00),(5,'Chicken Wings','Chicken',20.00,4414,4500,90.00);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TASK`
--

DROP TABLE IF EXISTS `TASK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TASK` (
  `task_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_id` int(5) NOT NULL,
  `Quantity` int(5) NOT NULL,
  `customer_name` varchar(35) NOT NULL,
  `status` varchar(70) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `TASK_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TASK`
--

LOCK TABLES `TASK` WRITE;
/*!40000 ALTER TABLE `TASK` DISABLE KEYS */;
INSERT INTO `TASK` VALUES (1,5,20,'BlackBerry','Under Production'),(2,2,30,'Google','Under Transportation unit'),(3,1,30,'BlackBerry','Under Packaging unit');
/*!40000 ALTER TABLE `TASK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TASK_EMPLOYEE`
--

DROP TABLE IF EXISTS `TASK_EMPLOYEE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TASK_EMPLOYEE` (
  `task_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_id` int(5) NOT NULL,
  `Quantity` int(5) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `status` varchar(70) NOT NULL,
  PRIMARY KEY (`task_id`,`employee_id`),
  KEY `product_id` (`product_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `TASK_EMPLOYEE_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `TASK` (`product_id`),
  CONSTRAINT `TASK_EMPLOYEE_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TASK_EMPLOYEE`
--

LOCK TABLES `TASK_EMPLOYEE` WRITE;
/*!40000 ALTER TABLE `TASK_EMPLOYEE` DISABLE KEYS */;
/*!40000 ALTER TABLE `TASK_EMPLOYEE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `Task_info_TRANSPORTATION`
--

DROP TABLE IF EXISTS `Task_info_TRANSPORTATION`;
/*!50001 DROP VIEW IF EXISTS `Task_info_TRANSPORTATION`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Task_info_TRANSPORTATION` AS SELECT 
 1 AS `task_id`,
 1 AS `product_id`,
 1 AS `Quantity`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `Task_info_production`
--

DROP TABLE IF EXISTS `Task_info_production`;
/*!50001 DROP VIEW IF EXISTS `Task_info_production`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Task_info_production` AS SELECT 
 1 AS `task_id`,
 1 AS `product_id`,
 1 AS `Quantity`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `password` varchar(8) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('AD0001','AD0001'),('EM0001','EM0001'),('EM00010','EM00010'),('EM00011','EM00011'),('EM00012','EM00012'),('EM00013','EM00013'),('EM00014','EM00014'),('EM00015','EM00015'),('EM0002','EM0002'),('EM0003','EM0003'),('EM0004','EM0004'),('EM0005','EM0005'),('EM0006','EM0006'),('EM0007','EM0007'),('EM0008','EM0008'),('EM0009','EM0009'),('MG0001','MG0001'),('MG0002','MG0002'),('MG0003','MG0003');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Food_Manufacturing'
--

--
-- Final view structure for view `Task_info_TRANSPORTATION`
--

/*!50001 DROP VIEW IF EXISTS `Task_info_TRANSPORTATION`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`cjain4`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `Task_info_TRANSPORTATION` AS select `t1`.`task_id` AS `task_id`,`t1`.`product_id` AS `product_id`,`t1`.`Quantity` AS `Quantity`,`t1`.`status` AS `status` from `TASK` `t1` where (`t1`.`status` = 'Under Transportation unit') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Task_info_production`
--

/*!50001 DROP VIEW IF EXISTS `Task_info_production`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`cjain4`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `Task_info_production` AS select `t1`.`task_id` AS `task_id`,`t1`.`product_id` AS `product_id`,`t1`.`Quantity` AS `Quantity`,`t1`.`status` AS `status` from `TASK` `t1` where (`t1`.`status` = 'Under Production') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-29 19:19:11
