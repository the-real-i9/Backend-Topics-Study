# What is Normalization?
Normalization is the technique of **breaking a single relation (table) into multiple relations (tables) and *connecting them via relationships***, to *mizimize redundancy and avoid Insertion, Deletion and Modificaition anomalies*.

# My thoughts
> My tips for determining where to decompose a relation
- Intuitively look-out for redundancies that may cause Insertion, Deletion or Modification anomalies.
- If attribute `B` is functionally dependent on attribute `A`, and attribute `B` functionally determines attribute `C` in the relation, ***decompose `B` with `C` into a separate relation***.
- If an attribute's value is from *a set of all possible values* for that attribute, the attribute must either be a foreign key or it doesn't dermine another attribute in the relation, else; ***decompose it into its own relation***.
- If attribute `B` has a `one-to-many` relationship to attribute `A`, it must either be a foreign key or it doesn't functionally determine another attribute `C`, else; ***decompose it into its own relation***.