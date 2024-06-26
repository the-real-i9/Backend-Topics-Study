# Intro
A transaction is **a logical unit of work** <u>consisting of an action or series of actions (CRUD) on the database</u>, carried out by a single user or application program.

> ***from the perspective of the application program***, a logical unit of work is a be a real-world task to execute which may consist of *one or more SQL statements*. 
> - For example, a bank money transfer involves DEBITing one account and CREDITing the other. Each of these two involves performing a series of DML statements.
> - Till the receiver's account is credited, this transaction is not yet successful. Any interruption must cause past database operations to rollback.

>***from the perspective of the DBMS software***, a logical unit of work is a be a *single SQL statement*, which consists of one or more operations including, database and non-database operations.
> - For example, an `UPDATE` operation, involves finding the table, scanning the table until we find the matching row, and `SET`ing the new value in the specified column, which may involve updating the column based on the current value, in which case we have to first retrieve the current one.
> - The underlying high-level code will also go through a series of statements.
> - The underlying assembly code will also go through a series of commands.

A transaction should always transform the database from one consistent state to another. Although, while the transaction is ongoing we may temporarily have an inconsistent state; at the end of the transaction, it must be consistent.

![State transition diagram for a transaction](./imgs/transaction-state-transition.png)

A transaction either <u>completes successfully</u>, in which case the transaction is said to have **`COMMITED`** and *the database reaches a new consistent state*, or <u>completely fails</u>, in which case the transaction is **`ABORTED`**.
- If a transaction is <u>aborted in response to failure</u>, the database must be **restored to the consistent state is was in before** the transaction started. Such transaction is **ROLLBACK**ed, i.e. all changes made to the database by this incomplete transaction is undone.

The DBMS has no way of knowing which updates are group together as a single logical transaction. Thus, a method to allow the user **indicate the boundaries of a transaction** is provided. 
- The **keywords** `BEGIN`, `COMMIT`, and `ROLLBACK` (or something similar) are available in many DMLs to delimit transactions.
- If these delimiters are not used, the entire program is regarded as a single transaction. `COMMIT` and `ROLLBACK` is then done at the DMBS level only.

So far, the keywords, `ACTIVE`, `COMMITTED` and `ABORTED` shows the possible states of a transcation. In addition to these, two more are worth considering:
- `PARTIALLY COMMITTED` : This occurs after the final `COMMIT` statement has been executed, <u>just before we go into into the `COMMITED` state</u>, i.e. before changes are commited to disk.
  - At this point, we may encounter **serializability violation** or **integrity constraint violation** by the transaction, OR we may encounter a **system failure** and any data updated may not have been safely recorded on secondary storage. Basically, transaction errors detected at the DBMS level. <u>In such cases</u>, the transaction will go into the `FAILED` state and would have to be aborted.
  - If the transaction has been <u>successful</u>, any updates can be safely recorded and the transaction can go to the `COMMITTED` state.

- `FAILED` : the transaction cannot go into the `COMMITTED` state (as discussed above) or it was aborted while in the `ACTIVE` state (by the user OR as a result of the concurrency control protocol ensuring serializability).

# Transaction Errors
Errors that may occur during the execution of a transaction, in a non-ACID compliant database.

## Dirty Reads
If <u>a transaction is in the middle of updating some data and hasn't committed yet</u>, and <u>another transaction is allowed to read that uncommitted data</u>, which may be rolled back, the other transaction suffers the risk of getting the wrong data, as the first transaction may be aborted due to an error.

## Non-Repeatable Reads
If we have <u>two consecutive reads in one transaction</u> with <u>a concurrent update in between</u>, those reads are going to show different results even though they're part of the same transaction, as the other transaction would have perform an update.

## Phantom Reads
If a transaction reads data and then a cocurrent transaction inserts data that whould have been read in the original transaction.

# ACID: The properties of a DB transaction.
ACID are the four properties that ensures the reliability and correctness of database transactions.

They ensure that **transactions can fail safely** and multiple concurrent transactions **don't suffer synchronization errors**.

## Atomicity
This is known "all or nothing" property. 

A transaction is <u>an indivisible unit</u> of work that is **either performed in its entirety or is not performed at all**.

It must completely succeed, or completely fail (as if the transaction never occured) i.e. this requires that all changes made while active must be undone, if an error is encountered.

It is the responsibility of **the recovery subsystem of the DBMS** to <u>ensure atomicity</u>.

## Consistency
A transaction must transform the database from one consistent state to another consistent state.

It is the responsibility of both **the DBMS and the application developers** to <u>ensure consistency</u>.
- The DBMS must enforce all the constraints that have been specified on the database schema. <u>If a transaction violates integrity constraints, it must be aborted</u>.
- The application developer must avoid logical errors.

## Isolation
Multiple concurrent transactions must execute independently of one another. **The partial effects of incomplete transactions should not be visible to other transactions**.

It is the resposibility of **the concurrency control susbsystem** to <u>ensure isolation</u>.

## Durability
The <u>**effects of a *committed transaction* are permanently recorded in the database**</u> and <u>**must not be lost because of a subsequent failure**</u>.

Simply put, **the changes made to the database by a commited transaction must not be lost due to DBserver failure**.

To aid durability, an entry is added to the database transaction log for each successful transaction.

It is the responsibility of the **recovery subsystem** to <u>ensure durability</u>.

--- 

Databases use well-known synchronization mechanisms, such as, ***locking*** to enforce these properties on the database.

