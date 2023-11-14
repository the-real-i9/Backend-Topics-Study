> Don't do a <del>comprehensive jotting</del>, rather, **study**, **understand**, and **create a checklist of rules** to abide with. If possible, support rules with usage examples.

# Meaningful Names
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
- **Avoid encodings:** Encoding type or scope information into names simply adds an extra burden of deciphering.
  ```js
  function getUserFunc() {}
  class StudentClass {}
  ```
- **Avoid mental mapping:** Readers shouldn't have to mentally translate your names into other names they already know.

- *Classes and objects* should have <u>noun</u> or <u>noun phrase</u> names.
  ```js
  // good
  class Customer
  class Account

  // bad
  class Manager
  class Processor
  ```

- *Methods and function* should have <u>verb</u> or <u>verb phrase</u> names
  ```js
  function postPayment() {}
  function deletePage() {}
  ```

- Don't be cute:
  - Avoid using colloquialisms or slang as function names.
  - Choose clarity over entertainment value

- Pick one word per concept:
  - it's confusing to have `fetch`, `retrieve`, and `get` as equivalent methods of different classes.
  - it's confusing to have a `controller`, and a `managet` and a `driver` in the same codebase.
  - A consistent lexicon is a great boon to the programmers who must use your code.

- Don't pun:
  - Avoid using the same word for two different purposes. <u>Using the same term for two different ideas</u> is essentially a pun.
  - Imagine two functions that adds to a collection in different ways, one insterts into the collection, the other appends to the collection. It is wrong to use the name `add()` for both. Names `append()` and `insert()` are better options.

- Use solution domain names:
  - If the readers of your code will be programmers alike, go ahead and use CS terms, algorithm names, pattern names, math terms, etc.

- Use problem domain names
  - If what you're doing is not *"programmer-ish"*, use the name from the problem domain.

- Add meaningful context
  - There are a few names which are meaningful in and of themselves - *most are not*. 
  - Instead, you need to place names in context for your reader by <u>enclosing them in well-named classes, functions, or namespaces</u>.
  - *When all else fails*, then <u>prefixing the name</u> may be necessary as *a last resort*.

- Don't add gratuitous context
  - Add no more context to a name than is necessary. Shorter names are generally better than longer ones.
  ```js
  class accountAddress {} // wrong
  class customerAddress {} // wrong

  // correct
  class Address {}
  const accountAddress = new Address({})
  const customerAddress = new Address({})
  ```

# Functions
- Functions should be very <u>small</u>.
  - Enclosed `if`, `else`, `while` statements should be one line long. Probably that line should be a functional call.
  - Functions should not be large enough to hold to hold nested structures. The indent level of a function should not be greater than one or two.  

- Do one thing:
  - 