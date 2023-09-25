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