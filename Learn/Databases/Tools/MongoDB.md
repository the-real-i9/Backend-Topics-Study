> Combination of Array Elements that satisfies the criteria
```js
db.collection('coll').find({
  // array of documents
  'arr_field.doc_field': { $gt: 10, $lte: 20 }
});

// array of elements
db.collection('coll').find({
  arr_field: { $gt: 10, $lte: 20 },
});

db.collection('coll').find({
  'arr_field.doc_field_1': 5,
  'arr_field.doc_field_2': 'A'
});
```
The way this works is that, <u>each of these conditions just wants to be satisfied</u>, **by any of the elements**.

**If a condition is not satisfied by one element, another must satisfy it**. <u>One element can even satisfy all, while others satisfy some or none</u>. As long as they're all satisfied.

**Intuitively,**
- It picks the first element and tries to use it to satisfy all conditions.
- If some conditions are unsatisfied, it picks the next element and tries to use it to satisfy the rest, and so on, till all are satisfied.
- If any condition is left unsatisfied, and they are no more elements left to pick, the document will not be enlisted.
---
> Single Array Element satisfies all criteria
```js
// array of documents
db.collection('coll').find({
  arr_field: { $elemMatch: { doc_field: { $gt: 10, $lte: 20 } } }
});

db.collection('coll').find({
  arr_field: { $elemMatch: { doc_field_1: 5, doc_field_2: 'A' } }
});
```
At least one element must satisfy all the conditions. This is done with the `$elemMatch` operator.