# Terminology
The relational model is based on the mathematical concept of a **relation**, which is physically represented as a table.

## Relational Data Structure
> **Relation**\
A relation is <u>a table with columns and rows</u>.

> **Attribute**\
An attribute is <u>a named column of a relation</u>.

> **Domain**\
A domain is <u>the set of allowable values for one or more attributes</u>.

> **Tuple**\
A tuple is <u>a row of a relation</u>.
The elements of a relation are the rows or *tuples* in the table.

> **Degree**\
The degree of a relation is <u>the number of attributes it contains</u>.

A relation with only one attribute would have degree one and be called a **unary** relation or one-tuple. 2 == binary, 3 == ternary, > 3 == $n$-ary relation.

The degree of a relation is a property of the *intension* of the relation.

> **Cardinality**\
The cardinality of a relation is <u>the number of tuples it contains</u>.

The cardinality of a relation is a property of the *extension* of the relation.

> **Relational database**\
A <u>collection of **normalized (appropriately structured) relations** with distinct relation names</u>.

## Relational Keys
> **Superkey**\
An attribute, or set of attributes, that uniquely identifies a tuple within a relation.

> **Candidate key**\
A superkey such that no proper subset is a superkey within the relation.

A candidate key $K$ for a relation $R$ has two properties:
- *Uniqueness*. In each tuple of $R$, the value"s" of $K$ uniquely identify that tuple.
- *Irreducibility*. No proper subset of $K$ has the uniqueness property. i.e. If we remove one from the values of $K$, it would no longer be unique.

There may be several candidate keys for a relation. When a key consists of more than one attribute, we call it a **composite key**.

<u>Identifying a candidate key requires that *we know the "real-world" meaning of the attribute(s) involved*</u> so that we can decide whether duplicates are possible. Only by using this semantic information can we be certain that an attribute combination is a candidate key. For instance, in the real-world, we know that everybody's email and phone number are unique, and therefore can be can be considered a candidate key.

> **Primary key**\
The candidate key that <u>is selected</u> to identify tuples uniquely within the relation.

> **Alternate key**\
Unselected candidate keys, after which the primary key has been selected within the relation.

> **Foreign key**\
An attribute, or set of attributes, within one relation that matches the candidate key of some (possibly the same) relation.

<u>When an attribute appears in more than one relation</u>, its appearane usually **represents a relationship** between tuples of the two relations.

# Integrity Constraints
## Null
Represents <u>a value for an attribute that is currently unknown or is not applicable for this tuple</u>.

For example,
- If one or two user info is not required, you can set null for it if not provided. (`allowNull: true`)
- If one or two users is yet to be verified, you would have a `verfToken` attribute with a real value. On the contrary, if a user has been verified, you would set its `verfToken` attribute to null, as this attribute is not applicable to the user.

## Domain Integrity
These are constraints that form restriction on the set of values allowed for the attributes of relations.

These are data types, min and max length of values.

## Entity Integrity
The first integrity rule only applies to primary keys.

**The rule states that**, <u>in a base relation, no attribute of a primary key can be null</u>.

> **Base relation???**\
A base relation, is a relation that corresponds to an entity in the conceptual schema.

If you're selecting an attribute as a primary key, for safety, you should give it a unique general constraint (`unique: true`). This way, any new tuple with the same attribute value will be rejected.

## Referential Integrity
The second integrity rule applies to foreign keys.

**The rule states that**, if a foreign key exists in a relation, either <u>the foreign key value must match a candidate key value of some tuple in its home relation</u> or <u>the foreign key value must be wholly null</u>.

For example,
- It's not possible to create a `Post` with `user_id` Foreign key of `null`, as a post can never exist without a user. A referential constraint like this must never allow null
- In contrast, we can have a `Staff` with `branch_id` Foreign key of `null`, as we can have a staff that is yet to be allocated to a branch. A referential constraint like this can allow null.

## General Constraints
These are <u>additional rules specified by the users or database administrators of a database that define or constrain some aspect of the enterprise</u>.

This is done with the `CHECK` constraint.

# Views
## Terminology
> **Base relation**\
A named relation corresponding to an entity in the conceptual schema, <u>whose tuples are physically stored in the database</u>.

> **View**\
The dynamic <u>result of one or more relational operations (`SELECT` query) executed on one or more base relations to produce another relation</u>.\
\
A view is a *virtual relation* that does not necessarily exist in the database but can be <u>produced upon request by a particular user, at the time of request</u>.

A view is a relation that appears to the user to exist, <u>can be manipulated as if it were a base relation, but does not necessarily exist in storage in the sense that the base relations do</u>.

Any operations on the view are automaically translated into operations on the relations from which it is derived. Views are dynamic, changes made to its base relation are immediately reflected in the view and vice-versa.

## Purpose of Views
- It provides a powerful and flexible security mechanism by <u>hiding parts of the database from certain users</u>.
- It <u>permits users to access data in a way that is **customized to their needs**</u>, so that the **same data can be seen by different users in different ways**, at the same time.
- It can simplify complex operations on the base relations.

## Updating views ⚠
There are **restrictions on the types of modification that can be made through views**.
- Updates are allowed through a view defined using a simple <u>query involving a single base relation</u> and <u>containing either the primary key or candidate key of the base relation</u>.
- Updates are not allowed through <del>views involving **multiple base relations**</del>.
- Updates are not allowed through <del>views involving **aggregation or grouping operations**</del>.

## Disadvangates of View
- **Update restrition:** In some cases, a view cannot be updated.
- **Structure restriction:** The structure of a view is determined at the same time of its creation. If columns are subsequently added to the base table, then these columns will ot appear in the view, unless the view is dropped and recreated.
- **Performance:** <u>A view defined by a complex, multi-table query may take a long time to process</u>, as **the view resolution must join the tables together *each time the view is accessed***. View resolution requires additional computer resources.

## View Materialization
**The problem:**
Views defined by complex queries may take long time to perform view resolution, particularly if the view is accessed frequently.

View materialization, is to store the view as a temporary table in the database when the view is first queried. Thereafter, queries based on the materialized view can be much faster than recomputing the view each time. The speed difference may be critical in applicaitions where the query rate is high and the views are complex, so it is not pracitcal to recompute the view for every query.

Materialized view are useful in new applications such as data warehousing, replication servers, data visualization, and mobile systems.

The difficulty with materialized views is, maintaining the currency of the view while the base table(s) are being updated. 
- The process of updating a meterialized view in response to changes to the underlying data is called **view maintenance**.
- The basic aim of view maintenance is to apply only those changes necessary to the view to keep it current.