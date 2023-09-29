> Combination of Array Elements that satisfies the criteria
```js
  // array of elements
  db.collection('coll').find({
    arr_field: { $gt: 10, $lte: 20 },
  });

  // array of documents
db.collection('coll').find({
  'arr_field.doc_field': { $gt: 10, $lte: 20 }
});

db.collection('coll').find({
  'arr_field.doc_field_1': 5,
  'arr_field.doc_field_2': 'A'
});

db.collection('coll').find({
  'arr_field.doc_field_1': { $gt: 10, $lte: 20 },
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
// array of elements
db.collecion('coll').find({
  arr_field: { $elemMatch: { $gt: 10, $lte: 20 } }
})

// array of documents
db.collection('coll').find({
  arr_field: { $elemMatch: { doc_field: { $gt: 10, $lte: 20 } } }
});

db.collection('coll').find({
  arr_field: { $elemMatch: { doc_field_1: 5, doc_field_2: 'A' } }
});

db.collection('coll').find({
  arr_field: { $elemMatch: { 
    doc_field_1: 5, doc_field_2: { $gt: 10, $lte: 20 } 
  } }
});
```
At least <u>**one element must satisfy all the conditions** (to the deepest nesting)</u>. This is done with the `$elemMatch` operator.

