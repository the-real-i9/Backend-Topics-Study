# Intro
#### The <u>goals of design principles</u> are
- to promote extensibility, flexibility and maintainability
- to extend the functionality of your application by introducing new implementations without requiring changes in existing code.
- to make your code become more flexible and adaptable to changes.
- to promote a design where changes in one part of the system have minimal impact on other parts.
- to make it easier to replace components in your system without causing a ripple effect throughout the codebase
- to promote modularity and testability

#### In practice, more than one of this principles would apply in a single design.
- Consider all these principles all at the same time when designing any sub-part of your system.
- In fact, trying to enforce one almost ensures you implement the other.

# The principles

### Encapsulate what varies
This principle suggests that you should isolate the parts of your code that are likely to change in the future, from what stays the same.

In a situation whereby, a user needs to achieve several tasks (one or more), and he may choose from several services that all allows these tasks to be achieved in their own way. What stays the same is "the task(s)", what varies is "how to get them (it) done", hence the need to choose one from the many services that works.
- One way to solve this is to write the task logic for each service the user might choose in each task function; and if another option is available, we extend the condition block in each task function.
- The better way is to isolate each service, along with the tasks they're are capable of, including their logic. Now then the user selects a service, we just give him the service along with all its tasks.

> Note here that, a user needs one service for all the tasks he wants to achieve, even if it is one; as long as how to achieve a task varies, encapsulate/isolate it.

> It doesn't only have to be in the context of a user, a product and a service. Any problem that models itself in this way.\
**Basically,** an entity wants to achieve one or more tasks, but there are several solutions, each providing how to get them done in their own way.\
**A real life model:** You want to create your backend API, but there are several languages or frameworks to get it done, each allowing the features you want to implement in its own way.

### Program to an interface, not an implementation
This principle emphasizes the use of interfaces (or abstract classes in some programming langues) to <u>define contracts between components</u>.

> **Interface:** A data structure that enforces behaviours for the concrete classes that implement it, and leaves the implementation details of each behaviour to those concrete classes that implements each behaviour in their own way.

This is closely related to encapsulation, where each encapsulated component implements a common interface that enforces the behaviours each component must implement, in its own way. Chances are, you'll think of applying this principle when you need to apply the encapsulation priciple.

A concrete class may extend itself with specifics, but it has to implement the behaviours defined by the interface it implements.

### Favor composition over inheritance
This principles encourages developers to prefer building systems by composing objects and behaviours through composition (separate classes) rather than relying heavily on inheritance.

This approach avoids some of the issues associated with deep and rigid class hierarchies.

This is also closely related to the first two principles above. The encapsulated objects are composed. If you find yourself encapslating what varies, you would be using compositon.

### Strive for loosely coupled designs between objects that interact
This principle is advocating for a design where the dependencies between objects are minimized.

Achieving loose coupling often involves reducing the direct dependencies between classes and promoting abstraction and decoupling through interfaces or abstractions.

This makes easier for your system to adapt to changes and replace components without causing a ripple effect throughout the codebase.

Again, applying the above principles makes for loose coupling.

### Classes should be open for extension but closed for modification
This principle encourages developers to design classes in a way that allows for extention without modifying their source code.

Imagine that you want to extend a payment system to support different payment methods. Instead of modifying the existing class, you can follow this principle by creating an interface or abstract class and allowing for extensions.

Again notice that, applying this principle consequently applies the ones already discussed

### Depend on abstractions. Do not depend on concrete classes
This is closely associated with the Dependency Inversion Principle (DIP).

This principle encourages high-level modules (e.g., concrete classes or components) to depend on abstractions (interfaces or abstract classes) rather than on concrete implementations.

Again, this principle allows you apply the above, and vice-versa. Most especially, _"program against interface, not an implementation"_ and _"encapsulate what varies"_

### Inversion of Control (Hollywood principle) | Dependency inversion | Dependency injection
This principle refers to the reversal of control flow compared to traditional procedural programming. In the context of IoC, control is inverted as <u>higher-level components delegate control to lower-level ones **through abstraction** (rather creating or implementing the low-level components in themselves)</u>.

One common way to implement IoC is through the use of dependency injection. Dependency injection involves providing a component with its dependencies from the outside, rather than having the component create its dependencies.

**With IoC:**
- **Decoupling:** Components are **decoupled** from their dependencies. They don't directly create or manaeg their dependencies but receive them from external sources.
- **Flexibility:** Dependicies are injected from the outside, allowing for easy substitution or modification without altering the core logic of the component.
- **Testability:** Components become more testable because you can inject mock or test-specific dependencies for unit testing.

Again, all the principles above use dependency injection, which results in inversion of control. The "encapsulate what varies" principle is, in fact, implemented by this principle, and many other ones.

> This is the same principle discussed in the previous one. They're grouped because they're basically the same thing.

### Separation of concerns

---

### S - Single Responsibility Principle (SRP)
### O - Open/Closed Principle (OCP)
### L - Liskov Substitution Principle (LSP)
### I - Interface Segregation Principle (ISP)
### D - Dependency Inverson Principle (DIP)

---
### DRY

### YAGNI