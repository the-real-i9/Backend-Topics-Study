# Database Environment
The starting point for the design of a database must be an abstract and general description of the information requirements of the organization that is to be represented in the database.

## The Three-Level ANSI-SPARC Architecture
The ANSI-SPARC architecture (which is the architecture most commercial DBMSs available today is based, to some extent), identifies three distinct levels of abstraction at which data items can be described.
- The levels form a **three-level architecture** comprising 
  - an **external level** : this is the way your users perceive the data at the application level,
  - a **conceptual level** : this provides both the **mapping** (schema) and the desired **independence** between the external and internal levels,

  - and an **internal level** : this is the way the operating system perceives the data. The actual programming language code that represents your conceptual level data (your data definition schema using the DDL of your DBMS), translated by the DBMS software. That is the code your DBMS uses to speak to the computer to represent your schema in the computer storage. So your schema written in a DDL is converted to a data structre written in a programming language like, C.

![Three level DB Architecture](./imgs/three-level-db-architecture.png)

### External Level
This level describes the **part of the database that is relevant to the user**.
- It **consists of a number of different external views of the database**. 
- Each user has **a view of the "real world" represented in a form that is familiar for that user**.
- The external view **includes <u>only those entities, attributes, and relationsips in the "real world" that the user is interested in</u>**.
- Different views may have **different representations of the same data**. 
- Some views might include **derived or calculated data**.

A familiar way to think about this is, the data names you use in your application frontend.

### Conceptual Level
This level describes **<u>what</u> data is stored in the database and the relationships among the data**.

This level contains **the logical structure (DB Schema) of the entire database as seen by the DBA or Backend Developer**.

It is **a complete view of the data requirements of the organization** that is independent of any storage considerations.

The conceptual level represents:
- all entities, their attributes, and their relationships;
- the constraints on the data;
- semantic information about the data;
- security and integrity information;

The conceptual level supports each external view, in that **any data available to a user must be <u>contained in, or derivable from</u>, the conceptual level (_the DB Schema_)**.

The DB Schema here is the one implemented using a DDL.

> The two levels above are your only concern. Don't bother about the last one. Except you want to create your own DBMS sofware.

### Internal Level
This level describes **<u>how</u> the data is stored in the database**.

This level contains the actual programming language code structure that speaks to your computer for file organization in the system running the DBMS software.

There's also a physical level that may be managed by the OS under the direction of the DBMS.

