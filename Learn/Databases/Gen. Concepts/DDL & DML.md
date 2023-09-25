> Note: Documented here are new things I come across

**Query CLAUSE execution order:**\
`FROM` >>> `JOIN`s >>> `WHERE` >>> `SELECT` >>> `ORDER BY`

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

## Joins
Join is used to **combine columns frome one or more tables <u>based on the values of _the common colums between related tables_**</u>.
- The common columns are typically the primary key columns of the first table and foreign key of the second table.

```sql
SELECT 
  table1_col, 
  table1_col 
FROM 
  table1 
(INNER JOIN | LEFT JOIN | RIGHT JOIN | FULL OUTER JOIN)
  table2 
  ON table1_colX = table2_colX
```

> `INNER JOIN`

After table is merged, it returns only the rows for columns that match the `ON condition`

> `LEFT JOIN`

After table is merged, it returns all rows for both tables, but fills unmatching columns of the right table with `NULL`s.

> `FULL OUTER JOIN`

It combines the result of `INNER`, `LEFT` and `RIGHT` `JOIN`s