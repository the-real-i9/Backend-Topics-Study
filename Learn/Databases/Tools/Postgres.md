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
### JSON
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

There are **JSON functions**, you can call on your json data. The arguments can be the whole json data (`jsonColumn`) or an inner value accessed with `column -> objVal` or `column ->> textVal`
```sql
-- expand the outer-most object referenced into key-value pairs
json_each(jsonColumn), json_each_text(jsonColumn -> 'objVal')

-- get the keys of the object referenced
json_object_keys(column -> 'objVal')

-- get the type of value
json_typeof(column ->> 'val')

/* There many other functions too */
```

### HSTORE
Say, you need a column with with a data that contains key:value pairs, like, `{key: value, key: value, ...}`. **As you can see this ain't a JSON data.**

To use this, you first install the extension
```sql
CREATE EXTENSION hstore
```
or install the `pg-hstore` library for Sequelize.

Now when you create your table, specify the `hstore` as data-type or use `DataTypes.HSTORE` in case of sequelize.

Here's how the value looks like
```sql
'"key1" => "value1", "key2" => "value2"'
```
and here's how you access it.
```sql
SELECT column -> 'key1', column -> 'key2' from table_name
```

Just like JSON, you can use it anywhere you need an attribute value.

***Check the documentation if you need more.*** You can do a lot more, like 
- *updating, adding, removing* a key:value pair.
- *checking for the **existence of a key, multiple keys, or a key:value pair*** as a **condition**.
- getting the keys or values of all rows in an hstore column.


 ### ARRAY
Check the documentation to learn more. It's simple.

---

> Advanced
# Indexes
