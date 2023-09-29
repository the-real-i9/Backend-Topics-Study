# Preface
Ok. I've known so much about sequlize already. So, I'm just gonna document new things.

Basically, contained here are the things I'll implement with sequelize only, and not <del>pure SQL</del>.

# Indexing Option Parameters
```js
{
  indexes: [
    {
      name: "test_index", // Index name

      using: "BTREE", // BTREE | HASH | GIN | GIST

      operator: , // specifiy index operator

      unique: true, // should be unique?

      /* Postgres will build without taking any write locks. */
      concurrently: false,

      /* either a column_name string or an object literal for additional parameters */
      // Note: multiple columns implies a composite index
      fields: ['column_1_index', ..., { 
        name: 'column_2_index', // column name

        length: 5, // create a prefix index of length chars
        /* indexed column sort order. You can also specify )(NULLS FIRST | NULLS LAST) to oreder the position of nulls, default is NULLS LAST*/

        /* ['DESC'|'ASC']['NULLS LAST'|'NULLS FIRST'] */
        order: 'DESC',
        
        collate: 'en_US', // locale of alphabet ordering
      }],

      where: { // creates a partial index
        field: value, 
      }
    }
  ]
}
```