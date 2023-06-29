# Querying Data
## Column Aliases
- Assign a column or an expression a column alias using the syntax `column_name AS alias_name` or `expression AS alias_name`.
- The `AS` keyword is **optional**.
- Use double quotes (") to surround a column alias that contains spaces.
```sql
-- SYNTAX
SELECT {column_name | expression} [AS] {alias_name | "alias name"} FROM table_name
```

---

## Select Distinct
> DISTINCT ON
```sql
SELECT DISTINCT ON (column_1) column_1, column_2
FROM table_name
ORDER BY column_1, column_2
```
- Using the `DISTINCT ON`, selects distinct values just for the specified column in the `ON(...)` ***(after ordering based on that column or using the expression in the `ORDER BY` clause, if specified)*** and merely includes corresponding column values. This is in contrast to calculating the distinct based on the combination of multiple columns.

- If `ORDER BY` will be used, the *first or only column* in the order by must be the one used in the `ON(...)`.

---
---

# Filtering

## Limit & Offset (non-standard)
> LIMIT
```sql
SELECT ... FROM ... ORDER BY ...
LIMIT row_count
-- Limits the number returned rows to the specified `row_count`.
```
> LIMIT ... OFFSET
```sql
SELECT ... FROM ... ORDER BY ...
LIMIT row_count OFFSET offset_count
-- How many rows do you want to skip before returning the number of rows in the specified in `LIMIT`?
```
This obviously is can used for **pagination**. Moreso, it makes sense to specify the ordering (sort) in a situation like this; otherwise you'll have an unsorted data, which is not likely to be the desired result.

**For example**, you want to get the *best-five students with the highest score*.
```sql
-- Ex.
SELECT s_name, s_score FROM students
ORDER BY s_score DESC
LIMIT 5
-- This'll do the trick!
```

## Fetch & Offset (standard)
```
OFFSET offset_count {ROW | ROWS}
FETCH {FIRST | NEXT} [row_count] {ROW | ROWS} ONLY
```

```sql
SELECT ... FROM ... ORDER BY ...

FETCH FIRST ROW ONLY
FETCH FIRST 5 ROWS ONLY

-- fetching after offsetting
OFFSET 1 ROW
OFFSET 5 ROWS
FETCH NEXT 5 ROWS ONLY
```
The `{ROW | ROWS} {FIRST | NEXT}` are just like grammatical semantics. They can be used interchangeably, we just want to makes sense of the query.

This is the standard version of PostgreSQL LIMIT.

---
---

# Common table expressions or CTEs
A CTE is a temporary (they only exist during the execution of the query) result set which you can reference within another SQL statement.

```sql
-- specify the name of the cte followed by an optional column list
WITH cte_name (column_list) AS (
  -- a query that returns a result set. (Kind of a query-derived table)
  CTE_query_definition
)
-- the statement that uses this temporarily generated table.
statement;
```
This `WITH` block only exists for the lifetime of the transaction execution.

CTEs are typically used to simplify complex joins and subqueries in PostgreSQL.

We can use this like any table: **DML queries**, **Sub queries**, **Joins**. 

Example:
```sql
-- A complex join
SELECT s.staff_id,
    first_name,
    last_name,
    COUNT(rental_id) rental_count
FROM staff s INNER JOIN rental USING (staff_id)
GROUP BY s.staff_id, first_name, last_name

-- WITH alternative
WITH cte_rental AS (
    SELECT staff_id, COUNT(rental_id) rental_count
    FROM   rental
    GROUP  BY staff_id
)
SELECT s.staff_id,
    first_name,
    last_name,
    rental_count
FROM staff s INNER JOIN cte_rental USING (staff_id)
-- This simplifies the grouping, having done it in the rental table.
-- Having to group by the names seems redundant but necessary in the first case. We eliminate that redundancy.
```
---
---
# NEW TABLE stuffs
## Copy table, query result into a new table
```sql
CREATE TABLE new_table AS [(optional_colum_names...)]
(SELECT * FROM existing_table [WHERE ... ORDER BY ...])
-- the result of the second line becomes the contents of `new_table`.
-- It can be any type of query, as long as it generates a result set.
```

---

## Sequences
Say you need a column that gets sequentially unique values from for each row.
```sql
CREATE SEQUENCE [ IF NOT EXISTS ] sequence_name
    -- data type, (default: BIGINT)
    [ AS { SMALLINT | INT | BIGINT } ]
    -- increment: number (defult: 1). Positive value will make an asc sequence, while a negetive value will make a desc sequence.
    [ INCREMENT [ BY ] increment ]
    -- deault: 1 [for asc], min-datatype-value [for desc]
    [ MINVALUE minvalue | NO MINVALUE ] 
    -- deault: max-datatype-value [for asc], -1 [for desc]
    [ MAXVALUE maxvalue | NO MAXVALUE ]
    -- start: minvalue [for asc], maxvalue[for desc]
    [ START [ WITH ] start ] 
    [ CACHE cache ] 
    -- allows you specify whether to rollover when limit is reached or not (which is the default, throws an error on limit-reached).
    [ [ NO ] CYCLE ]
    -- associate this with a column in a table
    [ OWNED BY { table_name.column_name | NONE } ]
```
This is the technique used by `AUTO_INCREMENT` or `SERIAL`.

---

## Identity Column
An alternative to `AUTO_INCREMENT` or `SERIAL` that allows you to specify how the uniqueness is generated, specifically with the **sequencing options above**.
```sql
CREATE TABLE ...
column_name data_type GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ (sequence_option) ]
```
Check the documentation if you'll need it.

---

## Data types