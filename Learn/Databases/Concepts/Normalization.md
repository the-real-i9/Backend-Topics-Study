# My thoughts on Normalization
> My tips for determining where to decompose a relation
1. Intuitively look-out for redundancies that may cause Insertion, Deletion or Modification anomalies.
2. If attribute `B` is functionally dependent on attribute `A`, and attribute `B` functionally determines attribute `C` in the relation, ***decompose `B` and `C` into a separate relation***.
3. If an attribute's value is from *a set of all possible values* for that attribute, the attribute must either be a foreign key or it doesn't dermine another attribute in the relation, else; ***decompose it into its own relation***.

4. If attribute `B` has a `one-to-many` relationship to attribute `A`, it must either be a foreign key or it doesn't functionally determine another attribute `C`, else; ***decompose it into its own relation***.