# Intro
ER modeling is a top-down approach to database design that <u>begins by identifying</u> the important data called ***entities*** and ***relationships*** between the data **that must be represented in the model**</u>. We than add more details, such as the information we want to hold about the entities and relationships called ***attributes*** and any ***constraints*** on the entities, relationshipts, and attributes.

**<u>ER modeling is an important technique for any database designer to master.</u>**

UML is currently recognized as the de facto industry standard modeling language for object-oriented softwae engineering projects.

![ER diagram](./imgs/ER-diagram.png)

# Entity Types
> **Entity type:**\
A group of "objects" in the "real world" with the same properties, which are identified as having an independent existence.\
<u>Can be objects with a physical (real) existence or objects with a conceptual (abstract) existence</u>.

> **Entity occurence:**\
A uniquely identifiable object of an entity type.

Primary key attributes uniquely identify each entity occurence.

> Diagramtic representation of entity types

Each entity type is shown as **a rectangle**, labeled wth the name of the entity, which is normally a singular noun writen in `CamelCase`.

# Relationship Types
> **Relationship type:**\
A set of meaningful associations among one or more participating entity types.\
Each relationship type is given <u>a name that describes its function</u>.

> **Relationship occurence:**\
A uniquely identifiable association that includes one occurence from each participating entity type.

Consider a relationship type called <u>`Has`</u>, which represents an association between `Branch` and `Staff` entities, tha is `Branch` <u>*`Has`*</u> `Staff`. Each occurence of the <u>*`Has`*</u> relationship associates one `Branch` entity occurence with one `Staff` entity occurence.

> Diagrammatic representation of relationship types

Each relationship type is shown as <u>**a line connecting** the associated entity types and **labeled with** the **name of the relationship**</u>.
- A relationship is <u>only labeled in one direction</u>, which normally *means that the name of the relationship only makes sense in one direction*.

Usually, a relationship is <u>***named*** using **a verb** (e.g. *`Supervises`* or *`Manages`*) or **a short phrase including a  verb**, *`LeasedBy`*</u>. 

Whenever possible, a **relationship name** should be <u>unique for a given ER model</u>.

## Degree of Relationship Type
> **Degree of a relationship type**\
The number of participating entity types in a relationship.

A relationship of degree two is called binary, degree three is called ternary, degree four is called quaternary.

The term **"complex relationship**" is used to describe <u>relationships with degrees higher than binary</u>.

> Diagrammatic representation of complex relationships

The UML notation uses **a diamond** to represent relationships with degrees higher than binary. The name of the relationship is rather displayed inside the diamond.

## Recursive Relationship
> **Recursive relationship**\
A relationship type in which **the same entity type participates more than once <u>in different roles</u>**.

Consider a recursive relationship called <u>*`Supervises`*</u>, which represents <u>an association of staff with a Supervisor where the Supervisor is also a member of staff</u>. The `Staff` entity type participates twice in the <u>*`Supervises`*</u> relationship,  first as a **Supervisor**, and the second as a member of staff who is supervised (**Supervisee**).

They are sometimes called ***unary* relationships**.

Relationships may be given **role names** <u>to indicate the purpose that each participating entity type plays in a relationship</u>.
- They are <u>important for recursive relationships</u>.
- Role names may also be used <u>when two entities are associated through more than one relationship</u>. For example, `Staff` (Role: Manager) <u>*`Manages`*</u> `Branch` and `Branch` <u>*`Has`*</u> `Staff` (Role: Member of staff). *It clarifies the purpose of each relationship*.
- Role names are usually not required if the function of the participating entities in a relationsip is unambiguos.

# Attributes
> **Attribute**\
A property(ies) of an entity or a relationship type.

For `Staff` entity type. `staffNo`, `name`, `position`, and `salary` could be attributes.

The attributes <u>hold values that describe each entity occurence</u> and <u>represent the main part of the data stored in the database</u>.

> **Attribute domain**\
The set of allowable values for one or more attributes.

The **domain** defines <u>the potential values that an attribute may hold</u> and is similar to the domain concept in the relational model

## Simple and Composite Attributes
> **Simple attribute**\
An attribute <u>composed of a single component</u> with an independent existence. e.g. `position` and `salary`.

> **Simple attribute**\
An attribute <u>composed of multiple components</u>, each with an independent existence. e.g. `address` can be subdivided into `street`, `city` and `postcode` attributes.

## Single-valued and Multi-valued Attributes
> **Single-valued attribute**\
An attribute that <u>holds a single value for each occurence</u> of an entity type.

This is the most common. A user's ID for example.

> **Multi-valued attribute**\
An attribute that <u>holds multiple values for each occurence</u> of an entity type.

For example, we may want a user to submit multiple phone numbers.

## Derived Attributes
> **Derived attribute**\
An attribute that represents <u>a value that is derivable from the value of a related attribtue or set of attributes</u>, not necessarily in the same entity type.

## Keys
> **Candidate key**\
The minimal set of attributes that uniquely identifies each occurence of an entity type.

The candidate key **must hold values that are unique for every occurence** of an entity type. This implies that <u>a candidate key cannot contain a null</u>.

> **Primary key**\
The <u>candidate key that is **selected**</u> to uniquely identify each occurence of an entity type.

A relation can have more than one candidate keys, thus, **other candidate keys apart from the one selected** are referred to as <u>alternate keys</u>.

> **Composite key**\
A candidate key that consists of two or more attributes.

The **values of the attributes together** are <u>***unique***</u> for each entity occurence but <del>not separately</del>.

> Diagrammatic representation of attributes

An entity type's rectangle is divided into two. The **upper part** of the rectangle <u>displays the name of the entity</u>, and the **lower part** <u>lists the names of the attributes</u>.

The first attribute(s) to be listed is the primary key for the entity type, if known. The name(s) of primary key attribute(s) can be labeled with the tag `{PK}` (if other attributes follow, if not (only primary key is listed), it can be ommited).

The name of an attribute is written in `camelCase` (first-letter in lowercase).

For multi-valued attributes, we label the attribute name with an indication of the range of values available for the attribute. For example, `attr[1...*]` indicates one or more values for the attribute `attr`. If the exact maximum value is known, you can use `attr[1...3]`, where `3` is the max value.

For composite attributes, indent the child attibute list under the parent attribute.

# Strong and Weak Entity