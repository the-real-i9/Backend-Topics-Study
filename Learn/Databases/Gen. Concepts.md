# Database Environment
The starting point for the design of a database must be an abstract and general description of the information requirements of the organization that is to be represented in the database.

The ANSI-SPARC architecture (which is the architecture most commercial DBMSs available today is based, to some extent), identifies three distinct levels of abstraction at which data items can be described.
- The levels form a **three-level architecture** comprising 
  - an **external level** : this is the way your users perceive the data at the application level,
  - a **conceptual level** : this provides both the **mapping** (schema) and the desired **independence** between the external and internal levels,

  - and an **internal level** : this is the way the operating system perceives the data. The actual programming language code that represents your conceptual level data (your data definition schema using the DDL of your DBMS), translated by the DBMS software. That is the code your DBMS uses to speak to the computer to represent your schema in the computer storage. So your schema written in a DDL is converted to a data structre written in a programming language like, C.

