# Introdction
A transaction is a single unit of work, consisting of one or more database operations.

***It is a must for any real application.***

>I see this from two perspectives,
>- *from the perspective of the application developer*, a single unit of work is the real-life task to execute which will consist of one-or-more SQL statements.
>- *from the perspective of the DBMS software*, a single unit of work is *one SQL statement*, which will consist of one or more operations including, database and non-database operations.


# How it works
```sql
-- To begin a transaction

BEGIN;
-- execute statement 1
-- execute statement 2
-- execute more statements

-- after executing the statements involved in your transaction, you commit the changes.
COMMIT;

-- when an error occurs "before you commit", in an error-handling block, you should rollback changes. The DBMS software is not aware of an errors in your programming language.
ROLLBACK;

-- you can't rollback changes that have been commited
```

> At DBMS software level, a transaction (one SQL statement) has this internally implemented.\
>To the DBMS software, that is the definition of a single unit of work.


# ACID: The properties of a DB transaction.
