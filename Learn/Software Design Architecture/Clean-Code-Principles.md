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
  ❌❌❌
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
### Functions should be very <u>small</u>.
  - Enclosed `if`, `else`, `while` statements should be one line long. Probably that line should be a functional call.
  - Functions should not be large enough to hold to hold nested structures. The indent level of a function should not be greater than one or two.  

### Do only one thing:
- This **one thing** may involve <u>more than one step</u>, where *each step is one level of abstraction below the stated name of the function*.
- If a function does only <u>those steps that are one level below the stated name of the function</u>, then the function is doing one thing.
```js
function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
  if (isTestPage(pageData))
    includeSetupAndTeardown(pageData, isSuite)
  return pageData.getHtml()
}
```
  - A way to know that **a function is doing more than one thing** is <u>if you can extract another function from it with *a name that is not merely a restatement of its implementation*</u>.
  - To proof that the above code does one thing using the previous point. Suppose we extract the condition into a function named `includeSetupAndTeardownIfTestPage`. Notice that this function name is merely a restatement of the above condition.
- Functions that do one thing cannot be reasonably divided into sections.

### One Level of Abstraction per function
We have **high**, **intermediate** and **low** level abstractions/operations. Mixing levels of abstraction within a function is always confusing.

#### Reading Code from Top to Bottom: The Stepdown Rule
We want the code to read like a top-down narrative. We want every function to be followed by those at the next level of abstraction so that we can read the program, descending one level of abstraction at a time as we read down the list of functons.
```js
function includeSetupAndTeardowns() {
  includeSetups()
  includeTestpageContent()
  includeTeardowns()
}

function includeSetups() {
  if (isSuite) includeSuiteSetup()
  includeRegularSetup()
}

function includeSuiteSetup() {
  searchParentHierarchy()
  addIncludeStatement()
}

// you get the gist of it
```
### Switch Statements

---
---

# Summary of Principles
### Be consistent
Maintain a consistent pattern of naming conventions, data structures, and interfaces throughout the system.

### Have a consistent Indentation and Code Style
Use whitespace to visually group related lines of code together. Code style refers to the naming conventions, commenting, and use of whitespace; these should be consistent.

### Keep it small
Design and implement small, focused components that serve a specific purpose. Methodds, classes, files, functions.

### Pure Functions
- Cause no side effects, such as modifying the state of the system or interacting with external resources.
- Given the same input, it will always return the same output
- It does not depend on any state or variables that are outside of its scope

### Minimize cyclomatic complexity
Cyclomatic complexity is a measure of the structural complexity of a program, which is determined by the number of linearly independent paths through a program's control flow (i.e. complex `if-else` branches).

Ways to minimize:
- Break down complex functions into smaller, simpler functions that perform specific tasks.
- Use control structures, such as if-else statements and loops, in a consistent and predictable way. Safeguard with inverted `if`s.
- Use functional programming concepts and techniques, such as immutablility and pure functions, to reduce the need for complex control folw.
- Use design patterns, such as the state pattern, to simplify complex control flow.
- Regularly review the code and refactor it to simplify the control flow.
- Use static code analysis tools that can detect and report high cyclomatic complexity in the code.

### Avoid passing nulls or booleans
Passing nulls or Booleans can lead to unexpected behaviour and difficult-to-debug errors in a program.

**Ways to avoid this:**
- Use Optionals or Maybe types instead of nulls to indicate the absence of a value.
- Use a default value for function arguments instead of allowing them to be null or Boolean
- Use the Null Object pattern to replace null values with a special object that has a defined behaviour.
- Use the ternary operator (`?:`) instead of if-else statements when working with booleans.
- Use the assert function to check the validity of function arguments and throw an exceptions if they are invalid.

### Keep Framework Code Distant
This refers to separating the application's code from the framework's code.

It makes it easier to maintain, test, and upgrade the application's codebase and the framework independently.

### Use correct constructs
This refers to using appropriate programming constructs, such as loops, conditionals, and functions, <u>in a way that makes the code easy to understand, maintain, and modify</u>.

The code should be organized in a logical and intuitive way, <u>making use of appropriate control flow statements and data structures to accomplish the task at hand</u>. This also means that the code should <u>avoid using unnecessary or overly complex constructs that make the code harder to understand or reason about</u>.

Use the <u>right constructs for the right problem</u>, for example, if you want <u>to iterate over an array, use a for loop instead of recursion</u> and also, you should <u>avoid using global variables and instead use function arguments and return values to pass data between different parts of the code</u>.

### Keep Tests Independent
When tests are independent, a change in one test will not affect the results of other tests.
- Use dependency injection to decouple the test code from the application code.
- Use mocks or stubs to isolate the test from external dependencies such as databases, APIs, or other services.
- Use test data that is self-contained and does not rely on external data or state.
- Use a test framework that supports running tests in parallel, so that the tests can be run independently of each other.
- Use TDD, which involves writing tests before writing the application code. This ensures that the tests are independent and that the code is written with testability in mind
- Avoid global state and shared mutable state as it may cause unexepected results.

### Code by Actor
This is a software development technique that encourages developers to <u>**organize code around the actors or entities that interact with it**</u>. Actors can be users, systems, or processes that perform a specific role or function within the application.

### CQRS
Command-Query Separation is a software design principle that separates the responsibilities of a method or function into two categories: commands and queries.

Commands are methods that change the state of the system, while queries are methods that return information but to do not change the state of the system.

### Avoid Hasty Abstractions
Creating too many abstractions or creating them too early can lead to unnecessary complexity and make the code harder to understand and maintain.
- Understand the problem that needs to be solved before creating an abstraction.
- Start with a simple solution and only create abstraction when it becomes clear that the solution is becoming too compelex.
- Use code refactoring techniques to simplify the code before creating an abstraction.
- Avoid creating abstractions for the sake of creating them.
- Use established design patterns and practices when creating abstractions, but to not force them into the code
- Use automated testing to ensure that the abstraction does not introduce new bugs or break existing functionality.
- Create abstractions in a way that it's easy to test, debug, and reason about.

If you abstract early though, you'll think the function or component is perfecct for your use case and so you just bend the code to fit your new use case. This goes on several times until the abstraction is basically your whole application in `if` statements and loops.

We should be mindful of the fact that we don't really know what requirements will be placed upon our code in the future.

> I think I've been in this problem before. I wanted to reuse a `Header` component, but here comes more headers each with subtle differences, this led to the use of several `if` statements in the component, testing if certain arguments are present or not and making adjustments based on them.

Don't be dogmatic about when you start writing abstractions but instead write the abstractions when it feels right and don't be afraid to duplicate code until you get there.
