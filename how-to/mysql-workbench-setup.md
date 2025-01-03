# How to Setup MySQL Workbench

## Overview and Background

What is MySQL Workbench? Its visual tool that helps developers, database architects, and DBAs work with MySQL databases and servers.

Soooo, what is MySQL? It is an open-source relational database management system (RDBMS), and a RDBMS us just a piece of software that makes doing database things easier, and in this case, doing things to a SQL database. There are other flavors of RDBMS, some I'm sure you've heard of, like: MongoDB, DynamoDB, Redis, PostgreSQL, Oracle, MariaDB, SQLite ... (you get the idea).

And what is SQL you ask? Structured query language (SQL) is a programming language for storing and processing information in a relational database. W3 has a nice primer here: https://www.w3schools.com/sql/sql_intro.asp and Oracle has everything you need to know: https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Introduction-to-Oracle-SQL.html#GUID-049B7AE8-11E1-4110-B3E4-D117907D77AC. 

Ok last question; but what is a *relational database?* Relational databases are all SQL based, and store data in tabular format with rows and columns (think an Excel spreadsheet).  On the other hand, non-relational databases have a variety of systems. 
- Key/Value
- Document
- Graph 

I'll write something on these later. For now, thats all you need to know and then some.

Lets make a script for some dummy data. 
1. Go to a folder or wherever you want to store this script and open it
	1. ex: `cd ~ && touch pets.sql && vim pets.sql`
2. Paste in this script:
```
CREATE DATABASE IF NOT EXISTS `pet_directory`;
USE `pet_directory`;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;

CREATE TABLE `pet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `species` varchar(45) DEFAULT NULL,
  `owner_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `pet`
--

INSERT INTO `pet` VALUES 
	(1,'Buddy','Dog','leslie@luv2code.com'),
	(2,'Whiskers','Cat','emma@luv2code.com'),
	(3,'Polly','Parrot','avani@luv2code.com'),
	(4,'Nemo','Fish','yuri@luv2code.com'),
	(5,'Fluffy','Rabbit','juan@luv2code.com');
```
3. Save it
## Setup Steps
1. [Download MySQL workbench](https://dev.mysql.com/downloads/workbench/)
2. Open up file and install. Drag into your applications.
3. Make sure you have MySQL installed: `brew install mysql`
4. Start your MySQL server: `mysql.server start`
5. Open up your workbench, you should see your MySQL server under "MySQL Connections". Open it.
6. Go to File --> Open MySQL Script --> add your `pets.sql` script
7. Execute your script by clicking the lightning bolt icon
8. On the left hand side, under schemas, you should see your table.
9. Verify it is populated by right clicking --> Select Rows - Limit 1000 --> verifying data is returned. 
10. Now you have a database you can do stuff too!