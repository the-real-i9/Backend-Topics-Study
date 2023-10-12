# Intro
A transaction is **a logical unit of work** <u>consisting of an action or series of actions (CRUD) on the database</u>, carried out by a single user or application program.

> ***from the context of the application program***, a logical unit of work could be a real-world task to execute which may consist of *one or more SQL statements*. 
> - For example, a bank money transfer, which involves DEBITing one account and CREDITing the other.
> - Till the receiver's account is credited, this transaction is not yet successful. Any interruption must cause past database operations to rollback.

>***from the perspective of the DBMS software***, a logical unit of work could be a *single SQL statement*, which will consist of one or more operations including, database and non-database operations.
> - For example, an UPDATE operation, which involves finding the table, scanning the table until we find the matching row, executing the update operation on the current data.
> - The underlying high-level code will also go through a series of statements.
> - The underlying assembly code will also go through a series of commands.

A transaction should always transform the database from one consistent state to another.

A transaction either <u>completes successfully</u>, in which case the transactin is said to have **COMMITED** and the database reaches a new consistent state, or it <u>fails</u>, in which case the transaction is **ABORTED**.
- If a transaction is <u>aborted in response to failure</u>, the database must be **restored to the consistent state is was in before** the transaction started. Such transaction is **ROLLBACK**ed.

The DBMS has no way of knowing which updates are group together as a single logical transaction. Thus, a method to allow the user **indicate the boundaries of a transaction** is provided. 
- The keywords `BEGIN`, `COMMIT` and `ROLLBACK` (or something similar) are available in many DMLs to delimit transactions.
- If these delimiters are not used, the entirea program is regarded as a single transaction. `COMMIT` and `ROLLBACK` is then done at the DMBSs level.

So far, the keywords, `ACTIVE`, `COMMITTED` and `ABORTED` shows the possible states of a transcation. In addition to this, there a two more worth noting:
- `PARTIALLY COMMITTED` : This occurs after the final `COMMIT` statement has been executed, <u>just before we go into into the `COMMITED` state</u>.
  - At this point, we may encounter **serializability violation** or **integrity constraint violation** by the transaction, OR we may encounter a **system failure** and any data updated may not have been safely recorded on secondary storage. <u>In such cases</u>, the transaction will go into the `FAILED` state and would have to be aborted.
  - If the transaction has been <u>successful</u>, any updates can be safely recorded and the transaction can go to the `COMMITTED` state.

- `FAILED` : the transaction cannot go into the `COMMITTED` state (as discussed above) or it was aborted while in the `ACTIVE` state (by the user OR as a result of the concurrency control protocol ensuring serializability).


# ACID: The properties of a DB transaction.
## Atomicity
This is known "all or nothing" property. 

A transaction is <u>an indivisible unit</u> that is **either performed in its entirety or is not performed at all**.

It is the responsibility of **the recovery subsystem of the DBMS** to <u>ensure atomicity</u>.

## Consistency
A transaction must transform the database from one consistent state to another consistent state.

It is the responsibility of both **the DBMS and the application developers** to <u>ensure consistency</u>.
- The DBMS must enforce all the constraints that have been specified on the database schema.
- The application developer must avoid logical errors.

## Isolation
Multiple concurrent transactions execute independently of one another. <u>The partial effects of incomplete transactions should not be visible to other transactions</u>.

It is the resposibility of **the concurrency control susbsystem** to <u>ensure isolation</u>.

## Durability
The effects of a *successfully completed (committed) transaction* are permanently recorded in the database and *must not be lost because of a subsequent failure*.

It is the responsibility of the **recovery subsystem** to <u>ensure durability</u>.