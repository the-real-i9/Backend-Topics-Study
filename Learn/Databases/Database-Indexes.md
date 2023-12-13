# Introduction
An index is a data structure created on top of an existing table to speed up the retrieval of target data, by creating shortcuts to the target data.

The data stored in a table should be organized in a particular order to speed up various searches. **This is why indexes come into play**.

Definition: An index is a separated data structue that speeds up the data retrieval on a table *at the cost of additional writes and storage to maintain the index*.

Indexes should be created on the columnn(s) you want to include in the `WHERE` clause.

# CREATE INDEX
> Syntax:
```sql
CREATE [UNIQUE] INDEX index_name ON table_name [USING method]
(
  column_name [ASC | DESC] [NULLS {FIRST | LAST}]
  ...
  -- more columns
);
```
The `method` specifies the data structure to restructure the column's entire data into, for fast retrieval. *Think of changing an array into a binary search tree.* PostgreSQL uses `btree` by default.


# Example
```sql
SELECT * FROM address WHERE phone = '431223989523';
```
In this way, the database engine has to scan the whole address table to look of the address. You can proof this by prefixing the statement with `EXPLAIN ANALYZE`. There you'll see **`Seq Scan on address`**, to say, a ***sequential scan*** was done on the address table.

```sql
CREATE INDEX idx_address_phone ON address(phone);
```
This restructures the linear phone number list into a binary search tree (`btree`), which has faster searching.

Using the `EXPLAIN ANALYZE` on this shows, **`Index Scan usingidx_address_phone on address`**.

# DROP INDEX
Deletes the index data structure for the specified table column.

---
---

# Index Types
Each index type uses a different algorithm that is best suited to different types of queries. B-tree indexes is the default, which fit the most common situations.

## B-Tree
> Use case considerations:

- Equality and range queries on sortable data.
- When an indexed column is involved in a comparison of these kind: `<, <=, =, >=, >` or constructs equivalent to them, such as `BETWEEN` and `IN`. Also, `IS NULL` and `IS NOT NULL` conditions.
- Pattern matching operators `LIKE` and `~`, **if the pattern is a comstant and is anchored to the beggining of the string** e.g. `col LIKE 'foo%'` or `cool ~ '^foo'`, *but not* `col LIKE '%bar'`.
  - Note: if your database does not use the C local you will need to create the index with a special operator class to support indexing of pattern-matching queries;
- For `ILIKE` and `~*`, ***but*** only if the pattern starts with non-alphabetic characters, i.e., characters that are not affected by upper/lower case conversion.

## Hash
Can only handle simple equality comparisons.
- Used whenever an indexed column is involved in a comparison using the " `=` " operator.

---
# UNIQUE INDEX
The UNIQUE index enforces the uniqueness of values in one or more multiple columns.
```sql
CREATE UNIQUE INDEX ...
```

**Only B-tree indexes can be declared as unique indexes.**

When you define a primary key or a unique constraint for a table, PostgreSQL automatically creates a corresponding UNIQUE index. *This implies that, searching by UNIQUE columns is fast.*

---

# Partial Index
Partial index allows you to *specify the rows of a table that should be indexed*. It helps speed up the query while reducing the size of the index.

The partial index is useful **in case you have commonly used `WHERE` conditions that use constant values**. e.g.
```sql
SELECT * FROM table_name WHERE column_name = constant_value;
```
Although creating a normal index works, but then it includes values you won't need.

To define an index that includes only the value you'd search, you use the following statement:
```sql
-- partial index
CREATE INDEX idx_customer_inactive
ON table_name (column_name, ...)
WHERE condition;
```
In this syntax, the `WHERE` clause specifies which rows should be added to the index.

---
# Multicolumn indexes
When defining a multicolumn index, you should ***place the columns which are often used in the `WHERE` clause at the beginning of the column list*** and the columns that are less frequently used in the condition after.

Even though there are multiple colums in the index list, the chance of leveraging them reduces as the list approaches the right.
  - When you define a multicolumn index, you should always consider the business context to find which columns are often use for lookup and pace these columns at the beginning of the column list while defining the index.

---
---

# Best practices
- Create indexes on *unique single-colums* or *unique multiple-columns*
- Integer colums are scanned the fastest. They're the best column choice to creating indexes on.