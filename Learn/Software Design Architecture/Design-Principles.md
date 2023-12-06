### Encapsulate what varies
This principle suggests that you should isolate the parts of your code that are likely to change in the future.

By encapsulating the varying elements, you make it easier to modify or extend the system without affecting the rest of the codebase.

**Example Use case:**\
In a system that interacts with different types of databases (MySQL and MongoDB), to store and retrieve data. It no doubt that how to achieve the same task, say create connection or retrieve data, varies in both database types.

In a situation like this one, it's easy to quickly conclude on `if-else` statements. But it creates a hassle: you'll have to repeat the conditional flow for every database operations, the program has to test every condition it ecounters until it finds the one that returns true. This makes the code harder to maintain and extend.

Solution is to "encapsulate what varies". But what varies? Of course, it's the differences in how to achive the same task.
- So we can have different databases as separate objects, each implementing these common tasks in its own way.
- Now when, you want to achieve a task, just pass in the database object you choose to use, and invoke the task.
```js
class Database {
  constructor(database) {
    this.database = database
  }

  connect() {
    // we didn't have to use if statements to test for matches
    this.database.connect()
  }
}

class MySQL {
  connect() {
    // MySQL connection algorithm
  }
}
class MongoDB {
  connect() {
    // MongoDB connection algorithm
  }
}

new Database(new MongoDB()).connect()
new Database(new MySQL()).connect()
```
This implementation follows the <u>dependency injection principle</u> and <u>strategy pattern</u>

---

### Program to an interface, not an implementation
This principle emphasizes the use of interfaces (or abstract classes in some programming langues) to define contracts between components.

> **Interface:** A data structure that only defines expected behaviours for the classes that implements it, and leaves implementation details of each behaviours to those classes to implemen, each in its own way.

**Without the principle**
```js
class NotificationService {
  sendByEmail(user, message) {}
  sendBySMS(user, message) {}
  sendByPush(user, message) {}
}
```
This can be problematic if you want to add new notification channels or change the implementation of existing ones.

***With the principle**
```js
// interface
class NotificationChannel {
  sendNotification(user, message) {
    throw new Error('sendNotification method must be implemented')
  }
}

// implementations
class EmailNotificationChannel extends NotificationChannel {
  sendNotification(user, message) {
    // email notification algorithm
  }
}

class SMSNotificationChannel extends NotificationChannel {
  sendNotification(user, message) {
    // sms notification algorithm
  }
}

class NotificationService {
  constructor(notificationChannel) {
    this.notificationChannel = notificationChannel
  }

  sendNotification(user, message) {
    this.notificationChannel.sendNotification(user, message)
  }
}

new NotificationService(new EmailNotification()).sendNotification(user, message)
```
This allows you to easily extend the system by adding new notification channels without modifying the existing code. The code is more modular, and you can subsitute different implementations of the interface without affecting the service.


### Favor composition over inheritance
This principles encourages developers to prefer building systems by composing objects and behaviours through composition rather than relying heavily on inheritance.

This approach provides greater flexibility, maintainability, and avoids some of the issues associated with deep and rigid class hierarchies.

Suppose you have a system that handles authentication for different types of users, such as regular users and administrators. Initially, you might be tempted to use inheritance to model the different user types:
```js
class User {
  constructor(username, passwore {
    this.username = username;
    this.password = password;
  }

  authenticate() {
    // Logic to authenticate a regular user
  }
}

class AdminUser extends User {
  constructor(username, password, adminCode) {
    super (username, password)
    this.adminCode = adminCode
  }

  authenticate() {
    // Logic to authenticate an admin user
  }
}
```
This code can lead to issues in the long run. If there are changes in the authentication logic or if you want to introduce new roles, the class hierarchy can become complex and hard to maintain.

**Better implementation**
```js
class User {
  constructor(username, password, authenticationStrategy) {
    this.username = username;
    this.password = password;
    this.authenticationStrategy = authenticationStrategy;
  }

  authenticate() {
    return this.authenticationStrategy.authenticate(this);
  }
}

class RegularUserAuthentication {
  authenticate(user) {
    // Logic to authenticate a regular user
  }
}

class AdminUserAuthentication {
  authenticate(user) {
    // Logic to authenticate an admin user
  }
}

// Usage
const regularUser = new User('regularUser', 'password', new RegularUserAuthentication());
const adminUser = new User('adminUser', 'adminPassword', new AdminUserAuthentication());
```

### Strive for loosely coupled designs between objects that interact


### Classes should be open for extension but closed for modification

### Depend on abstractions. Do not depend on concrete classes

### Hollywood principle

---

### S - Single Responsibility Principle (SRP)
### O - Open/Closed Principle (OCP)
### L - Liskov Substitution Principle (LSP)
### I - Interface Segregation Principle (ISP)
### D - Dependency Inverson Principle (DIP)

---
### DRY

### YAGNI