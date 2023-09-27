# Preface
Ok. I've known so much about sequlize already. So, I'm just gonna document new things.

# Attribute/Column options

## Adding foreign keys to table
```js
const Post = sequelize.model('Post', {
  ...
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      // This is a reference to the User model
      model: User,

      // This is the column name of the reference model
      key: 'user_id',
    }
  },
  comment_ids: [{
    
  }]
  ...
})
```