To start, what is [MySQL](https://www.oracle.com/mysql/what-is-mysql/)?
The docs say:
> MySQL is an open source RDBMS that uses SQL to create and manage databases.

So...what is a RDBMS? It stands for "relational database management system". Basically a program to manage relational databases. Flavors of RDBMSs include: MySQL, PostgreSQL, MariaDB, Microsoft SQL Server, and Oracle Database. [Pick your poison](https://www.integrate.io/blog/which-database/) based on your use case. For this use case (making a db to connect a small app to as a learning excercise), MySQL is a good fit. 

What about non-relational database systems? Lets not get into that here. Mainly because I don't really work with databases much. I'm sure I'll write something on it in the future, but for now, you can [read Google's write up](https://cloud.google.com/learn/what-is-a-relational-database#what-is-a-relational-database).

Ok back to MySQL. So we know MySQL is a program. It uses SQL ("Structured Query Language") to create and manage databases. Here are some basics on [SQL](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Introduction-to-Oracle-SQL.html#GUID-049B7AE8-11E1-4110-B3E4-D117907D77AC) if you aren't familiar, but just know its a programming language like Python or Scala. Now, MySQL workbench is a tool used to design, develop, administer and visualize databases. It will make handling databases easier and more user friendly (who doesn't love a snappy little GUI?).

To set it up:
1. Download the appropriate version here: https://dev.mysql.com/downloads/workbench/
2. Unzip and double click to run installer
3. Drag application into your application folder
4. Double check you have MySQL installed: `brew install mysql`
5. Start a your MySQL server: `mysql.server start`
	1. You should see a response of `Starting MySQL .. SUCCESS!`
6. Open MySQL workbench
	1. You will see under "MySQL connections" a note that says there are no servers running or installed. 
7. Click the "+" next to MySQL Connections
	1. Give your connection a name
	2. Click "Configure Server Management" in the bottom left
	3. Go through the setup steps
8. In the home screen,  open that connection
9. Open your script: Go to File in to pbar --> Open SQL Script --> select script to import
10. You should see the SQL in your window now. Click the lightning bolt to execute. 
11. In the select panel, under schema, click the refresh button.
12. You should see your new database. 
13. Verify your data is in there by right clicking on your table --> "Select Rows - Limit 1000" and verify there is data returned.
