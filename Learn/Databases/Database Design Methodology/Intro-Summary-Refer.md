# Intro
The methodology is presented as a step-by-step guide to the <u>three main phases of database design</u>, namely: **conceptual**, **logical**, and **physical** design.

- *Conceptual database design* - to build the conceptual representation of the database, which includes <u>***identification* of the important entities, relationships, and attributes**</u>.
- *Logical database design* - to <u>translate the conceptual</u> representation <u>to the logical</u> structure of the database, which inlcludes **designing relations**.
- Physical database design - to decide <u>how the logical structure is to be **physically implemented in the target DBMS**</u>.

## What Is a Design Methodology
A design methodology consists of phases each containing a number of steps that guide the designer in the techniques appropriate at each stage of the project.
- It also <u>helps the designer to **plan**, **manage**, **control**, and **evaluate** database development projects</u>.
- It is a *structured approach* <u>for **analyzing and modeling a set of requirements for a database** in a standardized and organized manner</u>.

## Conceptual, Logical, and Physical Database Design
> **Conceptual database design**\
The process of constructing a model of the data used in an enterprise, independent of all physical considerations.

> **Logical database design**\
The process of constructing a model of the data used in an enterprise <u>based on a specific data model (e.g. relational model)</u> , but *independent of a particular DBMS* (e.g. postgres, mysql) and other physical considerations.

> **Physical database design**\
The process of <u>producing a description of the implementation of the database on secondary storage;</u> it describes the **base relations**, **file organizations**, and **indexes** used to achieve efficient access to the data, and any associated **integrity constraints** and **security measures**. <u>It is tailored to a specific DBMS (e.g. postgres)</u>.


# Overview of the Database Design Methodology
## Conceptual database design
**Step 1** - Build conceptual data model

> **Objective**\
To build one (or more) conceptual data models of the data requirements of the enterprise.

**A conceptual data model comprises:** entity types | relationship types | attributes and attribute domains | primary keys and alternate keys | integrity constraints.

The conceptual data model is <u>supported by documentation</u>, including **ER diagrams** and **a data dictionary**, whichi is procuded throughout the development of the model.

The **tasks involved** in Step 1 are:

- *Step 1.1* - Identify entity types
  - 1.1.1 - Document entity types
- *Step 1.2* - Identify relationship types
  - 1.2.1 - Use ER diagrams
  - 1.2.2 - Determine the multiplicity constrants of relationship types
  - 1.2.3 - Check for fan and chasm traps
  - 1.2.4 - Document relationship types
- *Step 1.3* - Identify and associate attributes with entity or relationsip types
  - 1.3.1 - Simple/composite attributes
  - 1.3.2 - Sigle/multi-valued attributes
  - 1.3.3 - Derived attributes
  - 1.3.4 - Potential problems
  - 1.3.5 - Document attributes
- *Step 1.4* - Determine attribute domain
  - 1.4.1 - Document attribute domains
- *Step 1.5* - Determine candidate, primary, and alternate key attributes
  - 1.5.1 - Document primary and alternate keys
- *Step 1.6* - Consider use of enhanced modeling concepts (optional step)
- *Step 1.7* - Check model redundancy
  - 1.7.1 - Re-examine one-to-one (1:1) relationships
  - 1.7.2 - Remove redundant relationships
  - 1.7.3 - Consider time dimension
- *Step 1.8* - Validate conceptual data model against user transactions
  - 1.8.1 - Describing the transaction
  - 1.8.2 - Using transaction pathways
- *Step 1.9* - Review conceptual data model with user

## Logical database design <u>for the relational model</u>
**Step 2** - Build logical data model

> **Objective**\
To **translate** the conceptual data model into a logical data model and then to **validate** this model to check that it is structurally correct and able to support the required transactions.

- *Step 2.1* - Derive relations for logical data model
  - 2.1.1 - Strong entity types
  - 2.1.2 - Weak entity types
  - 2.1.3 - one-to-many (`1:*`) binary relationship types
  - 2.1.4 - one-to-one (`1:1`) binary relationship types
    - (a) - *mandatory* participation on *both* sides of `1:1` relationship
    - (b) - *mandatory* participation on *one* sides of `1:1` relationship
    - (b) - *optional* participation on *one* sides of `1:1` relationship
  - 2.1.5 - one-to-one (`1:1`) recursive relationship types
  - 2.1.6 - superclass/subclass relationship types
  - 2.1.7 - many-to-many (`*:*`) binary relatioship types
  - 2.1.8 - complex relationship types
  - 2.1.9 - multi-valued attributes
  - 2.1.10 - Document relations and foreigh key attributes
- *Step 2.2* - Validate relations using normalization
- *Step 2.3* - Validate relations against user transactions
- *Step 2.4* - Check integrity constraints
  - 2.4.1 - required data
  - 2.4.2 - attribute domain constraints
  - 2.4.3 - multipicity
  - 2.4.4 - entity integrity
  - 2.4.5 - referential integrity
  - 2.4.6 - general constraints
  - 2.4.7 - Document all integrity constraints
- *Step 2.5* - Review logical data model with user
- *Step 2.6* - Merge logical data models into global model (optional step)
  - 2.6.1 - Merge local logical data models into global logical data model
  - 2.6.2 - Validate global logical data model
  - 2.6.3 - Review global logical data model with users
- *Step 2.7* - Check for future growth

## Physical database design <u>for relational databases</u>
**Step 3** - Translate logical data model for target DBMS

> **Objective**\
To produce a relational database schema from the logical data model that can be implemented in the target DBMS.

- *Step 3.1* - Design base relations
  - 3.1.1 - Implementing base relations
  - 3.1.2 - Document design of base relations
- *Step 3.2* - Design representation of derived data
  - 3.2.1 - Document design of derived data
- *Step 3.3* - Design general constraints
  - 3.3.1 - Document design of general constraints
- *Step 3.4* - Design File Organizations and Indexes

**Step 4** - Design file organizations and indexes
- *Step 4.1* - Analyze transactions
  - 4.1.1 - Map all transaction paths to relations
  - 4.1.2 - Determine frequency information
  - 4.1.3 - Analyze data usage
- *Step 4.2* - Choose file organizations
  - 4.2.1 - Document choice of file organizations
- *Step 4.3* - Choose indexes
  - 4.3.1 - Specifying indexes
  - 4.3.2 - Choosing secondary indexes
  - 4.3.3 - Guidelines for choosing a "wish-list" of indexes
  - 4.3.4 - Removing indexes from the wish-list
  - 4.3.5 - Updating the database statistics
  - 4.3.6 - Document choice of indexes
- *Step 4.4* - Estimate disk space requirements

**Step 5** - Design user views
> **Objective**\
To design the user views that were identified during the requirements collection and analysis stage of the database system development lifecycle.
- 5.1 - Document design of user views

**Step 6** - Design security mechanisms
> **Objective**\
To design the security mechanisms for the database as specified by the users during the requirements and collection stage of the database system development lifecycle.
- 6.1 - Document design of security mesasures

**Step 7** - Consider the introduction of controlled redundancy (denormalization)
> **Objective**\
To determine <u>whether introducing redundancy in a controlled manner</u> by relaxing the normalization rules **will improve the performance** of the system.
- *Step 7.1* - Combining one-to-one (`1:1`) relationships
- *Step 7.2* - Duplicating non-key attributes in one-to-many (`1:*`) relationships to reduce joins
- *Step 7.3* - Duplicating foreign-key attributes in one-to-many (`1:*`) relationships to reduce joins
- *Step 7.4* - Duplicating attributes in many-to-many (`*:*`) relationships to reduce joins
- *Step 7.5* - Introducing repeating groups
- *Step 7.6* - Creating extract tables
- *Step 7.7* - Partitioning relations
- Consider implications of denormalization
- Document introduction of redundancy

**Step 8** - Monitor and tune the operational system
> **Objective**\
To monitor the operational system and **improve the performance** of the system to **correct inappropriate design decisions** or **reflect changing requirements**.
- *Step 8.1* - Understanding system resources
  - Main memory, CPU, Disk I/O, Network
- *Step 8.2* - Document tuning activity
