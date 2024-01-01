# Linked List
A linked list is a linear data structure in which elements are stored in nodes, and each node points to the next node in the sequence. They do not have a fixed size, and their elements can be dynamically allocated.

## Variations
- Singly Linked List
- Doubly Linked List
- Circular Linked List

## Operations
- Insertion - `O(1)`
- Deletion - `O(1)`
- Traversal - `O(n)`

## Advantages
- Dynamically resizable.
- Efficient insertion and deletion at the beginning (for singly linked lists) and at the end (for doubly linked lists).

## Disadvantages
- Random access is inefficient.
- Additional memory is required for pointers, making it less memory-efficient than arrays.

## Real-world Application
- Dynamic Memory Allocation
- Music and Video Playlists
- Undo functionality in software
- Symbol tables in Compilers
- Task scheduling in Operating systems
- Managing file systems
- Browser history
- Network routing tables
- **Dynamic data structures:** Used in the implememtation of more complex dynamic data structures such as stacks, queues, and hash tables.
- AI and Machine Learning

In these applications, the dynamic nature of linked lists makes them well-suited for scenarios where the size of the data is not fixed, and efficient insertion and deletion is priority.

## Comparison with Arrays
- **Linked lists** provide a more flexible and efficient solution for dynamic data structures that require frequent modifications.
- While **Arrays**, excel at random access and are efficient for read operations.

# Stack
A stack is a fundamental data structure that follows the LIFO principle.

## Operations
- **Push** - Add to the top of the Stack
- **Pop** - Remove and return from the top of the Stack
- **Peek** - Access the top of the Stack

## Applications
- **Function call stack** Functions are pushed to the Call Stack when they are invoked, and popped when they return.

- **Undo & Redo mechanism in Editors `(Ctrl + Z)`** Series of actions are pushed to the top of the Undo Stack. Actions are undone by popping from the top of the Undo Stack to the top of the Redo stack. Actions are redone, by popping from the Redo stack, and pushing it to the Undo stack again.
- **Expression evaluation** In converting infix expressions to postfix or prefix form. This helps to maintain the order of operations.
- **Syntax parsing** During compilation in programming languages, they help track the opening and closing symbols to ensure correct syntax.
  - Opening symbols are first pushed to the stack, then for each closing symbol found, one is popped from the stack, until there are no opening symbols left, if there are opening symbols left, then there is a syntax error.
- **Backtracking algorithms** The state of the search is pused onto the stack, and if the search reaches a dead end, the stack is popped to backtrack.
- Managing recursive algorithms
- **Browser history** To implement the back and forward buttons in web browsers.
- Network routing algorithms
- Tower of Hanoi

The time complexity of stack operations depends on the spceific implementation and the underlying data structure. It is usually implemented with linked lists, an efficient data structure for modification operations.

# Queues
A queue is another fundamental data structure that follows the FIFO principle. The first element added is the first one to be removed.

## Operations
- **Enqueue** Add an element to the back of the queue
- **Dequeue** Remove and return the element from the front of the queue.
- **Front** Return (peek at) the element at the front of the queue
- **Rear** Return (peek at) the element at the back of the queue

## Real-World Applications
- **Breadth-First Search** Queues are used in BFS algorithms to explore nodes level by level.

- **Task Scheduling** Queues can be used for managing tasks in a scheduling system. New tasks are added to the end of the queue, and the scheduler processes tasks from the front.
- **Print queue** In a print spooler, documents to be printed are stored in a queue, and the printer processes them in the order they were received.
- **Order processing** Queues are used in order processing systems where orders are processed int the order they are received.
- **Call center systems** Queues are employed in call centers to manage incoming calls. Calls are taken in the order they arrive.
- **Web server request handling** In web servers, incoming requests are often placed in a queue. e.g. NodeJS
- **Buffering in newtorking** Incoming data packets are stored in a queue before being processed to manage the flow of data between devices.
- **Background task processing** In applications that involve background processing or asynchronous tasks, a queue can be used to manage and execute tasks in the order they are submitted. For example, the NodeJS event queue.
- Message queues in distributed systems
- Bank customer service
- **Synchronization in multithreading** Queues are often used for communication and synchronization between threads. One thread can enqueue data, and another thread can dequeue and process it.
- Order fulfillment in warehouses
- Event handling in GUI applications

