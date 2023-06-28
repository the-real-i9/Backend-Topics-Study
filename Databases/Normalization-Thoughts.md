# Thoughts on Normalization
> My tips for determining where to decompose a relation
1. Intuitively look-out for redundancies that may cause Insertion, Deletion or Modification anomalies.
2. If an attribute is functionally dependent on another attribute `&&` this attribute functionally determines another attribute in the relation `&&` this attribute is not a foreign key; ***decompose it into its own relation, together with the attributes it determines***.
3. If an attribute's value is from *a set of all possible values* for that attribute, the attribute must either be a foreign key or it doesn't dermine another attribute in the relation, else; ***decompose it into its own relation***.