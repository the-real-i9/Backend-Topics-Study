-- Find the minimun
SELECT "fName", "lName", "salary" FROM learn."Staffs" WHERE "salary" <= ALL
(SELECT "salary" FROM learn."Staffs")