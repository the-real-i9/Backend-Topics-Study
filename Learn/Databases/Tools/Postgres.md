> Note: Documented here are new things I come across

**Query CLAUSE arrangement:**\
`SELECT` >> `DISTINCT` >> `FROM` >> `... JOIN` >> `GROUP BY` >> `HAVING` >> `WHERE` >> `ORDER BY` >> `LIMIT`

**Query CLAUSE evaluation order:**\
`... JOIN` >> `FROM` >> `WHERE` >> `GROUP BY` >> `HAVING` >> `SELECT` >> `DISTINCT` >> `ORDER BY` >> `FETCH/LIMIT`

---

What is listed after the `SELECT` statement (asides `*`) are actually, comma-separated list of **expressions**. Column names are just substituted with their corresponding values.

---

The `ORDER BY` clause allows you to sort rows returned by a `SELECT` clause in ascending or descending order <u>based on a *sort expression*</u>.
- This sort expression is like the one that does follow the `SELECT` clause. A sort expression is optionally followed by `ASC`ending or `DESC`ending.
- With multiple comma-separated expressions, `n-th + 1` expression is executed on the sorted result of `n-th` expression.
- Due to the order of evaluation, if you have a column alias in the `SELECT` clause, you can use it in the `ORDER BY` clause.
- If the attribute you order by contains `NULL`(s), `NULL` cannot be executed so as to determine where it should go (up or down). Using one of the clauses `NULLS FIRST` or `NULLS LAST`, you can specify whether rows with the `NULL` attribute should all come first or come last in the sort.

---

The `SELECT DISTINCT column ...` clause removes duplicates of `column` from the result set retured by `SELECT`.
- With multiple comma-separated columns, `DISTINCT` uses the combination of both columns to evaluate duplicates.
- `SELECT DISTINCT ON (column) ...` includes/keeps the first row in each of the duplicate group
- It is a **good practice** to always use the `ORDER BY` clause with the `DISTINCT ON (expression)` to make the result set predictable.
  - Because, now that we'll have duplicates of two, this will keep the duplicates together, hence, a predictaable result.
- The `DISTINCT ON` expression must match the leftmost expression in the `ORDER BY` clause.

---

`WHERE condition`
- The `WHERE` clause uses the `condition` to **filter** the rows of the table. For use by `SELECT`.
- The <u>condition must evaluate to</u> **true**, **false**, or **unknown**. Whatever expression evaluates to a boolean can be constructed.
- The query returns only rows that satisfy the `condition` in the `WHERE` clause. Which means the `condition` is tested for each row.
- <u>It is evaluated after the `FROM` clause and before the `SELECT` and `ORDER BY` clause</u>. Therefore, if you use column aliases in the `SELECT` clause, you cannot use them in the `WHERE` clause.

To form the <u>**condition** in the `WHERE` clause</u>, you use *comparison and logical operators*:
> `IN`

You use `IN` operator in the `WHERE` clause to chack <u>if a **value** *matches any* value "in" **a list of values**</u>. In other words, <u>if **value** is included in **a list of values**</u>.

```sql
value IN (value1, value2, ...)

-- negation
value NOT IN (value1, value2, ...)
```

The **list of values** can be a list of literal values such as <u>numbers</u>, <u>strings</u>, or a <u>result of a `SELECT` statement</u> (which is a list of values for a *single column*).

> `BETWEEN`

```sql
value BETWEEN low AND high

-- negation
value BETWEEN low AND high
```

> `LIKE`

```sql
value LIKE pattern

--negation
value NOT LIKE pattern

-- case insensitivity
value ILIKE pattern
value NOT ILIKE pattern
```
- Percent sign <kbd>`%`</kbd> matches any sequece of zero or more characters.
- Underscore <kbd>`_`</kbd> maches any single character.

> `NULL`

Don't test a value for `NULL` with the `=` sign. Rather use `value IS NULL`. <del>NULL is not equal to NULL</del>

```sql
-- wrong
value = NULL

-- correct
value IS NULL

-- negation
value IS NOT NULL
```

---

# Joins
Join is used to **combine columns frome one or more tables <u>based on the values of _the common colums between related tables_**</u>.
- The common columns are typically the primary key columns of the first table and foreign key of the second table.

```sql
SELECT 
  table1_col, 
  table2_col 
FROM 
  table1 
(INNER JOIN | LEFT JOIN | RIGHT JOIN | FULL OUTER JOIN)
  table2 
  ON table1_colX = table2_colX

```
**An intuitive way to think about this is:**
- first_table `INNER JOIN` second_table, constitutes the whole table taken by the `FROM` clause.
- The `ON` condition, acts like the `WHERE` clause, which <u>filters the joined table to the final table of the `FROM` clause</u>.
- The joined + filtered table of the `FROM` is the final table used by the rest of the clauses.

## `INNER JOIN`

- The inner join examines each row in the first table. 
- It compares the value in the selected column of the first table with the value in the selected column of the second table (`ON condition`).
- If these values are equal, the inner join creates a new row that contains columns from both tables and adds this new row to the result set.

After table is merged, it returns only the rows for columns that match the `ON condition`


## `LEFT JOIN`

In the left join context, the **first table** is called the <u>left table</u>  and the **second table** is called the <u>right table</u>.
- The left join starts selecting data from the left (first) table.
- It compares values in the selected column of the left (first) table with the values in the selected column of the right (second) table.
- If these values are equal, the left join creates a new row that contains columns of both tables and adds this new row to the result set.
- If the values do not equal, same thing happens. However, <u>it fills the columns of the right table with null</u>.

After table is merged, it returns all rows for both tables, but <u>fills unmatching columns of the right table</u> with `null`.


## `RIGHT JOIN`

To avoid redundancy, works like the `LEFT JOIN`, but **fills unmatching columns of the <u>left table instead with null</u>**.

In other words, it is the <u>reverse of `LEFT JOIN`</u>


## `FULL OUTER JOIN`

It combines the result of `INNER`, `LEFT` and `RIGHT` `JOIN`s

## Self-join

This is <u>when you use any of the `... JOIN` clauses with the **same table** operand</u>, **differentiated by alias names**.

In other words, you join a table to itself, as if they're two, differentated by alias names.

```sql
my_table AS this_table INNER JOIN my_table AS that_table

-- `my_table` is joined to itself, using different alias names.
```

## Table aliases
Table aliases lets you differentiate the table a column belongs to. 
- Most especially, <u>in cases where **two "join"ed tables have a selected column with common name**</u>.
- They are what makes **self-join** possible.

```sql
-- For anywhere a table name is required
FROM table_name [AS] table_alias

INNER JOIN table_name [AS] table_alias

-- `AS` is optional (for all aliases though) but ok for readablility purposes.
```

> The `USING` clause

In such <u>"join"ed-common-column-name cases</u> above, you can use the `USING (coulmn)` clause, to select and compare this column for both tables, so you don't have to use aliases.\
Also you don't have to use the `ON condition` clause, since `USING` does "`=`" comparison by default

```sql
table1 INNER JOIN table2 USING (common_column_name)
```

## Quick Recap
- A join clause takes a left and a right operand which are tables, same or different.
- In the case of same table, use alias names to differentiate them.
- When you compare columns with common column names in both tables, either make use of an alias, or make use of the `USING (common_column)` clause, after the right operand (table).
  - This way, you don't have to differentiate with aliases, netheir do you have to use the `ON condition` clause, since  the `USING` clause does this comparison by default.

## Joining more than two tables
- All doings like, column aliases and the `USING` clause still can apply.
- The syntax:
  ```sql
  FROM table1 
  INNER JOIN table2 
    ON condition 
  INNER JOIN table3 
    ON condition
  ```
- As we know, a `...JOIN` takes a left and a right table as operand. Here, the left operand of the second `...JOIN` is the resulting table from the first `...JOIN`.
- `table3`'s `...JOIN` uses the resulting table from `table1` and `table2`'s `...JOIN` as its left operand.

## `CROSS JOIN`
A `CROSS JOIN` clause allows you to produce a Cartesian Product of rows in two or more tables.

<u>As opposed to other joins</u>, **it does not have a an `ON condition` predicate** .

## `NATURAL JOIN`
A natural join is a join that <u>**creates an implicit join based on the same column names**</u> in the joined tables.

```sql
SELECT select_list 
FROM table1
NATURAL [INNER, LEFT, RIGHT] JOIN table2

-- `INNER` is the default, if the type of join is omitted.

-- For example:
SELECT * FROM table1
NATURAL JOIN table2

-- is equivalent to

SELECT * FROM table1 INNER JOIN table2 USING (common_column_name)
```

In simpler terms, the `NATURAL JOIN` is just like the other joins. **The special thing about it** is that, <u>it automatically applies the `USING` clause, using all common columns of all joined tables</u>.
> And remember that, the `USING (common_column)` compares the columns for equality.

In the end, the joined table of the `FROM` clause, is the combination of the common columns of the tables, followed by other columns from both tables. `SELECT` can then pick desired columns.

> **However,** you should <u>**avoid using the `NATURAL JOIN` whenever possible**</u> because sometimes it may cause an unexpected result.

# GROUP BY
> **What I remember:**
- The `GROUP BY` clause, takes the combination of all the columns `(column 1, column2, ...)` specified in the `SELECT` clause.

- It then merges rows with same column-combined `(column1, column2, ...)` value.
- Since it combines all the columns you specify in `SELECT`, you must also specify those columns in the `GROUP BY`.
  - An exception to this are **aggregate functions** specified in `SELECT`, even if they have aliases, seeing that **they compute column aggregation for each merged rows**.
- **Caution!!!**: If you include a column for which the rows don't have same column, together with a column for which the rows have same column.
  - The column combination would cause adjacent rows to be different. Hence, no grouping is done. Unless we have one column combination that matches the column combination that matches that of another one or more.

For exmaple:
```sql
-- The number of students with same age and the sum of their ages.
SELECT age, COUNT(age), SUM(age)
FROM students
GROUP BY age
ORDER BY age --sorts the group

-- Like the previous, but including same class
-- `class` is in the form of (A | B | C | ...)
SELECT age, class, COUNT(class), SUM(age)
FROM students
GROUP BY age, class
ORDER BY age, class
```
You're correct!

The `GROUP BY` clause divides the rows returned from `SELECT` statement into groups. For each group, you can apply an aggregate function e.g. `SUM()` to calculate the sum of items or `COUNT()` to get the number of items in the groups.

The statement clause divides the rows by the values of the columns specified in the `GROUP BY` clause and calculates a value (aggregate) for each group.

> Note: Aliases used in `SELECT` cannot be used in this clause, due to evaluation order. It doesn't even make sense.

# HAVING Clause
> **My take:**\
The `HAVING` of `GROUP BY` is like, \
the `WHERE` of `FROM` and \
the `ON` of `... JOIN`

The `HAVING` clause specifies a check condition for a group or an aggregate. The `HAVING` clause is often used with the `GROUP BY` clause **to filter groups or aggregates based on a specified condition**.

Handle it just like `WHERE`. Plus, you **can use aggregate functions** in it, <del>as opposed to `WHERE`</del>.

> Note: As with `GROUP BY`, don't use <del>`SELECT` aliases</del> in it.

# Set Operations
```sql
SELECT table1_select_list FROM table_1 
[UNION | INTERSECT | EXCEPT]
SELECT table2_select_list FROM table_2
```
> **Rule:** The name, data type; the number and order of the columns in the select list of both queries must be the same.

## UNION
The `UNION` operator <u>**combines result sets of two or more `SELECT` statements into a single result set**</u>.

<u>`UNION`</u> **removes all duplicate rows** from the combined data set.\
To **retain duplicate rows**, use the <u>`UNION ALL`</u> instead.

The `UNION` operator may place the rows from the result set of the first query before, after, or between the rows from the result set of the second query.
<u>To sort rows in the final result set</u>, you **use the `ORDER BY` clause in the second query**.

**In practice**, you often use the `UNION` operator **to combine data from similar tables**, which are not perfectly normalized, in the data warehouse or business intelligence systems.

## INTERSECT
Like UNION and EXCEPT, but the `INTERSECT` operator <u>returns any rows that are available in both result sets</u>.

## EXCEPT
Like, UNION and INTERSECT, but the `EXCEPT` operator <u>**returns distinct rows** from the first (left) query that are not in the output of the second (right) query</u>.

Like, the **subtration** math operation.

# Subquery
A sub-query is a `SELECT` query that **computes to a single colum with one (single value) or more (multiple values) rows**.

It is mostly used with the `WHERE` clause.

You can reference the table of the outer query from the subquery.

### Usage with the `EXISTS` operator
```sql
EXISTS subquery
```
A subquery can be the input of the `EXISTS` operator.
- If the subquery returns any row, the `EXISTS` operator returns true.
- If the subquery returns no row, the result of `EXISTS` operator is false.
- The `EXISTS` operator only cares about the number of rows returned from the subquery, not the content of the rows, therefore, the common coding conventon of `EXISTS` is
  ```sql
  EXISTS (SELECT 1 FROM my_table WHERE condition)

  -- negation
  NOT EXISTS (SELECT 1 FROM my_table WHERE condition)
  ```

### Usage with the `ANY` operator
```sql
expression comparison_operator ANY(subquery)
```
The `ANY` operator returns true if any value of the subquery meets the condition, else, it returns false.

### Usage with the `ALL` operator
```sql
expression comparison_operator ALL(subquery)
```
The `ALL` operator returns true if all values in the subquery meets the condition, else, it returns false.


# Common table expressions (CTE)
A common table expression is **a <u>temporary</u> result set which you can reference within another SQL statement**.

**Temporary** in the sense that, <u>they only exist during the execution of the query</u>

**Syntax:**
```sql
WITH cte_name (column_list) AS (
  CTE_query_definition -- the `SELECT` query that forms your table.
)
statement -- the (CRUD) statement you want to execute on the CTE table.

-- `column_list` is optional, if not specified, it inherits that of the `SELECT` in the `CTE_query_definition`.
```

CTEs are typically used to **simplify "complex joins" and "subqueries"**.\
Both activity <u>involves the creation of nested temporary tables</u>.\
**CTEs provides a way to separate those tables and refer to them by name**.
```sql
FROM table1 INNER JOIN join_table_cte USING(common_column_name)
WHERE column1 > ANY(subquery_table_cte)
```

# Recursive Query
A recursive query is **a query that refers to a <u>recursive CTE</u>**. They are useful in many situations such as querying hierarchical data like organizational structure, bill of materials, etc.

**Syntax:**
```sql
WITH RECURSIVE cte_name AS (

  CTE_query_definition -- non-recursive term

  UNION [ALL]

  CTE_query_definition -- recursive term

) SELECT * FROM cte_name;
```

> Ok so... **Here's how this works**.
- **First,** in execution of the non-recursive term on `tableX`, the resulting set represents the starting table of `cte_name`, **`cte_table_0`**.

- Next, in the execution of the recursive term, we `...JOIN` `tableX` with the current `cte_name` table, `cte_table_0`. The resulting set represents the next table of `cte_name`, **`cte_table_1`**.

- Next, the recursive term is again executed, and again we `...JOIN` `tableX` with the current `cte_name` table, `cte_table_[i]`. The resulting set represents the next table of `cte_name`, **`cte_table_[i+1]`**.
  - This step is <u>**repeated until**, the current `...JOIN` *execution results in an empty table*</u>.

- **Finally,** all resulting `cte_table`s are merged with the `UNION [ALL]` set operation, into a single table.

# Modifying Data
## INSERT
```sql
INSERT INTO table_name (column_list)
VALUES
  (value_list_1), -- row-1
  (value_list_2), -- row-2
  ...
  (value_list_n); -- row-n
```

## UPDATE
```sql
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition
```

## UPDATE join
Sometimes you need to **update data in a table <u>based on values in another table</u>**.
```sql
UPDATE table1
SET table1.column1 = new_value
FROM table2
WHERE table1.column2 = table2.column2
```

## DELETE
Delete row(s) from a table.
```sql
DELETE FROM table_name
WHERE condition;
```

## DELETE join
Delete row(s) from a table based on the data in another table. 

> With the `USING` clause.
```sql
DELETE FROM table1
USING table2 -- this references the other table
WHERE condition; -- a condition invlolving `table2`
```

> With subquery
```sql
DELETE FROM table1
WHERE condition_involving_subquery

-- Example
-- here, we delete from `contacts` table based on the `blacklist` table.
DELETE FROM contacts
WHERE phone IN (SELECT phone FROM blacklist)
```

---
---

# Filtering
## Limit & Offset (Pagination: non-standard)
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

## Fetch & Offset (Pagination: standard)
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

> Advanced
# Indexes
A database index is a data structure that improves the speed of data retrieval on a table at the cost of additional additional writes and storage space to maintain that structure.

They help us to quickly locate data without having to perform a full table scan each time a table is accessed.

## Non-clustered index
- The data is physically present in arbitrary order, but the logical ordering is specified by the index. 
- The data rows may be spread thoughout the table regardless of the value of the indexed column or expression. 
- The non-clustered index tree contains the index keys in sorted order, with the leaf level of the index containing the pointer to the record.
- Indexed columns are typically non-primary key columns used in `WHERE`, `JOIN` and `ORDER BY` clauses
- There can be more than one non-clustered index on a database table.

## PGSQL Index Methods
> B-TREE indexes
- Query planner will consider this type whenever index columns are involved in a comparison that uses one of the following operators (`>, <=, =, >=, BETWEEN, IN, IS NULL, IS NOT NULL`)
- It'll be considered with `LIKE` operators, <u>**only if**</u>, the patter starts with alphabetic characters e.g. `'foo%', 'bar%', '^foo'`,
- It is the most used type in RDMSs.
- <u>These are not my problem anyways</u>. It's the DBMSs problem. It's the default.
- **Create B-TREEs on unique columns, or create a composite index that makes it unique**.

> Hash indexes
- Hash indexes **can handle only <u>simple equality comparison</u>** ( `=` ).

> GIN (Generalized INverted) indexes:
- GIN indexes are most useful **when you have <u>multiple values stored in a single column</u>**, e.g. hstore, array, jsonb, and range types.

> BRIN (Block Range INdexes):
- BRIN is much smaller and **less costly to maintain** <u>in comparison with a B-tree index</u>.
- BRIN is **often used on a <u>column that has a linear sort order</u>**, for example, the created date column of the sales order table.

> GiST (Generalized Search Tree) indexes
- GiST indexes are **useful in indexing <u>geometic data types and full-text searches</u>**.

> SP-GiST (Space-partitioned GiST) indexes
- SP-GiST indexes are most useful **for data that <u>has a natural clustering element</u> to it and is also <u>not an equally balanced tree</u>**, e.g. GIS, multimedia, phone routing, and IP routing.


## Creating indexes
```sql
CREATE INDEX index_name [USING method]
ON table_name
(
  column_name [ASC | DESC] [NULLS {FIRST | LAST}],
  ...
)
```

## Dropping indexes
```sql
DROP INDEX [CONCURRENTLY]
[IF EXISTS] index_name, index_2, ...
[CASCADE /* deeply drop dependend objects */ | RESTRICT /* don't drop dependent opjects */]

-- basic usage
DROP INDEX index_name
```

## Create `UNIQUE` indexes
`UNIQUE` index enforces the uniqueness of values in one or multiple columns.
- Multiple unique indexes makes a composite unique index.
- A single or composite unique index in a table, cannot be duplicated in multiple rows.
- When you define a primary key or a unique constraint for a table, a corresponding `UNIQUE` index is automatically created for it.

PostgreSQL treats `NULL`s as distinct values, therefore, you can have multiple `NULL` values in a column with a `UNIQUE` index.

> **Note:** <u>**Only B-tree indexes can be declared as unique indexes**</u>.

```sql
CREATE UNIQUE INDEX index_name
ON table_name(column_name [...])
-- more columns can be specified to create composite unique index.
```

## PostgreSQL index on expression (Funtional-based index)
You can also create an index based on an expession that involves table columns. These are known as functional-based indexes.

```sql
CERATE INDEX index_name
ON table_name (expression)

CERATE INDEX index_name
ON table_name (LOWER(column_name))
```
PostgreSQL will consider using this index when the expression that defines this index appears in the `WHERE` clause or in the `ORDER BY` clause of the SQL statement.
```sql
SELECT column_1
FROM table_name
WHERE LOWER(column_name) === "value" -- here
```

**Note!!** Functional based indexes are expensive to maintain. You should only used then when retrieval speed is more critical than insertion and update speed.

## Partial Index
Partial index, allows you to **specify the rows of a table that should be indexed**. This helps speed up the query while reducing the size of the index.

The partial index is <u>useful in a case you have commonly used **`WHERE` conditions that use constant values**</u>.

```sql
SELECT * FROM table_name
WHERE column_name = constant_value
```

## `REINDEX`
An index might sometimes need a **rebuild**.
```sql
REINDEX INDEX index_name -- a specific index
REINDEX TABLE table_name -- all indexes in a table
REINDEX SCHEMA schema_name -- all indexes in a schema
REINDEX DATABASE database_name -- all indexes in a database
```

## Composite index or Multicolumn index
This is an index created on multiple columns/fields in a table at a time.
```sql
CREATE INDEX index_name
ON table_name (col1, col2, col3, ...)
```

_**Support:** Only `B-Tree`, `GiST`, `GIN` and `BRIN` support composite indexes._

When defining a composite index, **you should place the columns which are often used in the `WHERE` clause at the beginning of the column list and the columns that are less frequently used in the condition after**.
```sql
-- The chances of usage decreases from left to right
-- Specify the order here in order of priority in the condition below
ON table_name (col1, col2, col3, ...)

WHERE col1 = v1 AND col2 = v2 AND col3 = v3; -- OK
WHERE col1 = v1 AND col2 = v2; -- OK
WHERE col1 = v1; -- OK
-- Any different order in condition is bad, and would not be considered for index usage
```

**<u>A key takeaway:</u>** When you define a composite index, you should always consider the business context to **find which columns are often used for lookup and place the columns at the beginning of the column list while defining the index**.

> <u>Multicolumn indexes should be used sparingly</u>.

# Data types
## UUID
It is often found in the distributed systems because it guarantees a better uniqueness than the `SERIAL` data type which generates only unique values within a single database.

PostgreSQL allows you store and compare UUID values but it does not include functions for generating them. Instead, it relies on third-party modules that provides specific algorithmic functions to generate UUIDs.

```sql
-- To install third party module
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

-- usage as a default table value
CREATE TABLE table_name (
  column_name uuid DEFAULT uuid_generate_v4(),
  PRIMARY KEY (column_name)
)
```

## Array
```sql
-- creating array column
CREATE TABLE table_name (
  -- column_name DATATYPE []
  array_column1 INTEGER [],
  array_column2 TEXT [],
)

--- inserting to array column
INSERT INTO table_name (arr_col)
VALUES (ARRAY [4, 5, 6])
VALUES (ARRAY ['a', 'b', 'c'])
-- or use curly braces
VALUES ('{4, 5, 6}')
VALUES ('{"a", "b", "c"}')

/* querying array column */
SELECT array_col from table_name;

-- PostgreSQL uses 1-based indexing for array elements.
SELECT array_col [index] from table_name;

--- you can also use it in a WHERE clause
SELECT column from table_name;
-- equality
WHERE array_col [index] = some_value
-- searching
WHERE some_value = ANY (array_col)

/* Updating the array column */
UPDATE table_name
-- updating an index of the array
SET array_col [index] = new_value
-- updating the whole array
SET array_col = '{"d", "e", "f"}'
WHERE column_value = some_value
```

## JSON
When you a column is JSON-data type,
You can query it in two ways,
```sql
-- as json (->)
SELECT column_name -> 'objVal' AS alias FROM table_name
-- if you query as json, you can chain the access to go further down the hierarchy

-- as text (->>)
SELECT column_name ->> 'textVal' AS alias FROM table_name
-- if you query as text, or the last prop in the access chain is text, you cant go further, even though the text may look-like json.

-- chain the access
SELECT column_name -> 'obhVal' -> 'innerDictVal' ->> 'textVal' AS alias FROM table_name

-- you can have multiple columns
SELECT column_name -> 'objVal' AS alias_1, column_name ->> 'textVal' AS alias_2 FROM table_name
```

You can use it in a `WHERE` clause
```sql
WHERE colunm_name -> 'objVal' ->> 'textVal' = 'someText'
```

Basically, you can use it anywhere you can have an attribute.

> Apply aggregate functions

We can apply aggregate functions to JSON data. But note that you have to apply it to number strings in text format casted to integer e.g. 
```sql
MAX (CAST (->> 'num_column' AS INTEGER))
```

> JSON functions

There are **JSON functions**, you can call on your json data. The arguments can be the whole json data (`jsonColumn`) or an inner value accessed with `column -> objVal` or `column ->> textVal`
```sql
-- expand the outer-most object referenced into key-value pairs
json_each(jsonColumn),
json_each_text(jsonColumn -> 'objVal') -- if 'objVal' is of form {"key": "textValue"}

-- get the keys of the object referenced
json_object_keys(column -> 'objVal')

-- get the type of value
json_typeof(column ->> 'val')

/* There many other functions too */
```

## HSTORE
Say, you need a column with with a data that contains key:value pairs, like, `{key: value, key: value, ...}`. **As you can see this ain't a JSON data.**

```sql
-- To use this, you first install the extension
CREATE EXTENSION hstore

-- create column
CREATE TABLE table_name (
  hstore_column_name hstore
)

-- supply values
INSERT INTO table_name (hstore_column_name)
VALUES ('"key1" => "value1", "key2" => "value2"')

-- access hstore column, and query specific key
SELECT hstore_column1 -> 'key1', hstore_column1 -> 'key2' 
FROM table_name
```

<u>Just like JSON, you can use it anywhere you need a column value.</u>

***Check the documentation if you need more.*** You can do a lot more, like 
- *updating, adding, removing* a key:value pair.
- *checking for the **existence of a key, multiple keys, or a key:value pair*** as a **condition**.
- getting the keys or values of all rows in an hstore column.


# Create a table
```sql
CREATE TABLE [IF NOT EXISTS] table_name (
  column_name datatype(length) column_constraint,
  ...
  table_constraints
)

CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
)
```

# PostgreSQL Constraints
## Primary Key
A primary key is a column or a group of columns used to identify a row uniquely in a table.

Technically, a primary key constraint is the <u>combination of a `NOT NULL` constraint and a `UNIQUE` constraint</u>.

**A table can only have one primary key.** There's nothing like primary "keys" of a table.

A unique B-TREE index is created on the column or a group of columns used to define the primary key.

```sql
--- one column primary key
CREATE TABLE table_name (
  pk_column datatype PRIMARY KEY,
)

-- composite primary key
CREATE TABLE table_name (
  pk_column_1 datatype,
  pk_column_2 datatype,
  ...
  PRIMARY KEY (pk_column_1, pk_column_2)
  -- If you don't explicitly specify the name for primary key constraint, PostgreSQL will assign a default name of the form (`table_name_pkey`) to the primary key constraint.

  -- to assign a name to the constraint, do otherwise
  CONSTRAINT constraint_name PRIMARY KEY (pk_column_1, pk_column_2)
)
```

Adding and removing primary key on existing tables
```sql
-- add a new column with primary key constraint
ALTER TABLE table_name ADD COLUMN colum_name datatype PRIMARY KEY

-- add primary key constraint to existing table
ALTER TABLE table_name ADD PRIMARY KEY (column_1, ...)

-- delete constraint on table
ALTER TABLE table_name DROP CONSTRAINT table_name_pkey;
```

## Foreign Key
A foreign key is a column or a group of columns in a table that reference the primary key of another table.
- The table that contains the foreign key is called the child table. And the table referenced by the foreign key is called the parent table.
- A table can have multiple foreign keys depending on its relationships with other tables.
- The foreign key constraint helps to maintain the referential integrity of data between the child and parent tables.
- A foreign key constraint indicates that values in a column or a group of columns in the child table equal the values in a column or a group of columns of the parent table.

```sql
CONSTRAINT fk_name -- for explicit naming
  FOREIGN KEY (fk_columns)
  REFERENCES parent_table(parent_key_columns)
  [ON DELETE {SET NULL | SET DEFAULT | RESTRICT | NO ACTION | CASCADE}]
  [ON UPDATE {SET NULL | SET DEFAULT | RESTRICT | NO ACTION | CASCADE}]
```
- `CASCADE` : When a parent row is deleted the corresponding child row is deleted. This is what you mostly want.
- `SET NULL` : When a parent row is deleted, the foreign key that links them in the child table is set to null
- `SET DEFAULT` : It works like SET NULL, except there's a default value to replace it.
- `NO ACTION` (default)

Modify existing tables
```sql
ALTER TABLE table_name 
ADD 
-- just as it is in table creation
CONSTRAINT constraint_name 
FOREIGN KEY(fk_columns) REFERENCES parent_table(parent_columns) 
-- optional deleting and updating
[ON DELETE CASCADE]
```

## Check constraint
This constraint allows you to specify if **values in a column must meet a specific requirement**.

The `CHECK` constraint **uses a conditional expression to validate the values** before they are inserted or updated to the column.

```sql
CREATE TABLE table_name (
  -- arbitrary value
  column_1 datatype CHECK (column_1 > some_value)
  -- column value
  column_2 datatype CHECK (column_2 = column_1)

  -- the above uses implicit naming of the form `table_name_column_1_check`

  -- to use explicit naming
  column_3 datatype CONSTRAINT constraint_name CHECK(condition)
)
```
If supplied value for the column in `INSERT` or `UPDATE` does not match the condition, you will receive an error message.

Modifying existing tables
```sql
ALTER TABLE table_name
ADD
-- as it is in table creation
CONSTRAINT constraint_name CHECK (condition)
```

## Unique constraint
When you add a `UNIQUE` constraint to a column or a group of columns, PostgreSQL will automatically create a unique index on the column or the group of columns.

```sql
CREATE TABLE table_name (
  column_1 datatype UNIQUE,
)

-- composite unique constraint
CREATE TABLE table_name (
  column_1 datatype,
  column_2 datatype,
  column_3 datatype,
  UNIQUE (column_2, column_3)
  -- There must only be (column_2, column_3) in the table. That is, if another row has an existing value for column_2, it must have a different value for column_3.
)
```

## Not Null Constraint
```sql
CREATE TABLE table_name (
  column_name datatype NOT NULL
)
```

Modifying existing table
```sql
CREATE TABLE table_name (
  column_name datatype
)

ALTER TABLE table_name 
ALTER COLUMN column_name 
SET NOT NULL
```

> Note: If a nullable (optional) column already contains `null`, before modifying it to `NOT NULL`, make sure to update it with a value.

# Create a new table from the result set of a query
```sql
CREATE TABLE new_table AS [(optional_colum_names...)]
(SELECT * FROM existing_table [WHERE ... ORDER BY ...])
-- the result of the second line becomes the contents of `new_table`.
-- It can be any type of query, as long as it generates a result set.
```



# Sequences
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


# Identity Column
The `GENERATED AS IDENTITY` constraint is **the SQL standard-conformming variant** of the good old `SERIAL` column.

Like `SERIAL` it uses, the `SEQUENCE` object above internally.

```sql
CREATE TABLE ...
column_name data_type GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ (sequence_option) ]
```
- The `data_type` can be `SMALLINT`, `INT`, `BIGINT`
- If `GENEATED ALWAYS` is used, you cannot insert or update values in this column.
- If `GENERATED BY DEFAULT` is used, if you supply a value for the column, the value is used, if no value is supplied, the system generates a default value.
- You can optionally specify sequencing options, to control program how the values should be generated.

# Views