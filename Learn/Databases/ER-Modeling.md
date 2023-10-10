# Intro
ER modeling is a top-down approach to database design that <u>begins by identifying</u> the important data called ***entities*** and ***relationships*** between the data **that must be represented in the model**</u>. We than add more details, such as the information we want to hold about the entities and relationships called ***attributes*** and any ***constraints*** on the entities, relationshipts, and attributes.

**<u>ER modeling is an important technique for any database designer to master.</u>**

UML is currently recognized as the de facto industry standard modeling language for object-oriented softwae engineering projects.

# Entity Types
> **Entity type:**\
A group of "objects" in the "real world" with the same properties, which are identified as having an independent existence.\
<u>Can be objects with a physical (real) existence or objects with a conceptual (abstract) existence</u>.

> **Entity occurence:**\
A uniquely identifiable object of an entity type.

### Diagramtic representation of entity types
Each entity type is shown as **a rectangle**, labeled wth the name of the entity, which is normally a singular noun writen in CamelCase.

![ER diagram](./imgs/ER-diagram.png)

# Relationship Types
> **Relationship type:**\
A set of meaningful **associations** among one or more participating entity types.\
Each relationship type is given a name that describes its function.

> **Relationship occurence:**\
A uniquely identifiable association that includes one occurence from each participating entity type.

Consider a relationship type 