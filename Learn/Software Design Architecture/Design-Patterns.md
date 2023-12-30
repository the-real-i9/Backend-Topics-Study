# Behavioural Patterns
### Strategy pattern

### Observer pattern

### Command pattern

### Iterator pattern
The Iterator Pattern is a behavioral design pattern that provides a systematic way to traverse a collection of objects without exposing the underlying details of the collection.

This pattern can be applied when dealing with paginated responses or iterating over a large set of resources fetched from an API.

It helps in decoupling the iteration logic from the specifics of the API response structure.

### State pattern
Allows an object to alter its behavior when its internal state changes.

It can be applied to represent different states of an API client and manage transition between these states.

### Template Method
Defines the <u>skeleton of an algorithm</u> in the **superclass** but lets **subclasses** <u>implement specific steps of the algorithm in their own way</u> without changing the structure of the algorithm.

A scenario where you have a common set of steps for making API requests, but the details of authentication, request building, and response handling may vary between different API implementations.

Imagine, performing a task involves 5 steps and everyone is required to perform it, think about how everyone will excute these steps in their own different ways.

# Structural Patterns
### Decorator pattern

### Adapter pattern
When you have incompatible API versions, due to their differences in interface, and you want to provide a standard communication interface to your API.

Create an adapter for each of those incompatible API versions, that implements this standard interface and internally translates the message to what each legacy API version understands, using their respective interfaces.

The effort of knowing the inferface of different legacy APIs, has been delegated to the API implementation.

### Facade pattern
You want to perform execute one task in your system, but it involves different external subsystems to get this done.

It allows you to hide the details of communication with the different external services, and just presents you with a single interface to get the job done.

### Composite pattern
Lets you compose objects into tree structures to represent part-whole hierarchies.

Consider a scenario where you have a backend API that provides access to various resources, and you want to represent the API endpoints as a composite structure. This can be useful for constructing complex API requests by <u>combining multiple endpoints or handling groups of related resources</u>.

This pattern is beneficial when you want to treat individual objects and compositions (groups) of objects uniformly.

In a backend API scenario, it can be used to represent complex API request structures where endpoints are composed hierarchically, allowing clients to work with both individual endpoints and composite structures seamlessly. This can be particularly <u>useful when dealing with APIs that support batch operations, where a single request can include multiple sub-requests or resource groups</u>.

---

Consider a hierarchy of project(s) involving tasks, allowing clients to perform actions on both individual tasks or entire project.

The Composite Pattern allows for a flexible representation of projects and tasks, enabling clients to perform actions on different levels of the hierarchy. This can be particularly useful <u>in project management systems where a project may consist of tasks and subprojects, and you want to interact with both individual tasks and the entire project seamlessly</u>.

For example, a feature that allows you to execute save on individual files, and, alternatively, execute save on a folder which saves all the files in it.

### Proxy pattern

# Creational Patterns
### Abstract Factory pattern

### Factory Method pattern

### Singleton pattern

### Builder pattern
Separates the construction of a complex object from its representation, <u>allowing the same construction process to create different representations</u>.

A scenario where you need to construct API requests with different HTTP methods, endpoints, headers, and payload formats. The Builder Pattern can help you create a builder class that allows clients to specify the details of an API request step by step, resulting in a well-constructed request object.