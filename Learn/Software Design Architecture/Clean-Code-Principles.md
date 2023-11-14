> Don't do a <del>comprehensive jotting</del>, rather, **study**, **understand**, and **create a checklist of rules** to abide with. If possible, support rules with usage examples.

## Meaningful Names
- **Use intention-revealing names:**
  - telling, why it exists, what it does, what it represents, how it is used etc.
  - Don't expect readers to know the essence of a certain constant value or an abbreviated variable name you use, tell the what or the why of the value with a meaningful variable name.
  ```js
  // what do these even mean???
  var a, b;
  getThem();
  ```

- **Avoid Disinformation:**
  - your variable name must not be mistaken for another thing.
  - avoid words whose entrenched meanings vary from our intended meaning
  - beware of using names which vary in small ways
  ```js
  var hp; // do you mean the laptop model?
  var accountList; // do you mean the list data structure?
  var XYZControllerForEfficientHandlingOfStrings
  var XYZControllerForEfficientStorageOfStrings
  ```

- **Make meaningful distinctions:**
  - If names must be different, then they should also mean something different. It is not sufficient to add number series or noise words, even though the compiler is satisfied
  - number series (`a1`, `a2`, ...) and noise words (`nameString` instead of `name`) added to make variable names distinct, result in meaningless distinctions.
  - Distinguish names in such a way that the reader knows what the differences offer.
  ```js
  var variable;

  var v1, v2 v3;

  class Customer {}
  class CustomerObject {}

  class Product {}
  class ProductInfo {}

  getAccount()
  getAccounts()
  getAccountInfo()
  ```

- Use pronunceable names
- Use searchable names
- **Avoid encodings:** Encoding type of scope information into names simply adds an extra burden of deciphering.
