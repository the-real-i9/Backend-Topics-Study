# Threads and Concurrency

## Introduction

Applications that use application-level concurrency are known concurrent programs.

Modern operating systems provide <u>three basic approaches for building concurrent programs</u>:

- **<u>Processes</u>** With this approach, each logical control flow is a process that is scheduled and maintained by the kernel. Since processes have separate virtual address spaces, flows that want to communicate with each other must use some kind of explicit *interprocess communication (IPC)* mechanism.
- **<u>I/O multiplexing</u>** This is a form of concurrent programming where <u>applications explicitly schedule their own logical flows in the context of a single process</u>.
  - Logical flows are modeled as state machines that <u>the main program explicitly transitions from state to state *as a result of data arriving on file descriptors*</u>.
  - Since the program is a single process, all flows share the same address space.
  - The program implements its own scheduling mechanism and states and queues (ready, wait).
- **<u>Threads</u>** Threads are logical flows that run in the context of a single process and are scheduled by the kernel. You can think of threads as a hybrid of the other two approaches, scheduled by the kernel like process flows and sharing the same virtual address space like I/O multiplexing flows.

## Concurrent Programming with Processes

A natural approach for building a concurrent server is to accept client connection requests in the parent and then create a new child process to service each new client.

After accepting the connection request,

- the server forks a child, which gets a complete copy of the server's descriptor table.
- Each closes its copy of unused descriptor. The parent closes its `connfd(n)` and the child closes its `listenfd(n)`. This must be done since each copy of `fd` points to the same file table entry, the unused resource must be released for future use.
- The child process handles the `connfd(n)` and while the parent process waits for the next connection request.

---
The parent process accepts another client request and repeats the steps. Each child process `fork()`ed is handling each client's connection concurrently, since processes execute concurrently.

**Cons of processes**: IPC mechanisms must be established for processes to share state information. They tend to be slower because the overhead for process control and IPC is high.

## Concurrent Programming with I/O Multiplexing

Suppose you are asked to write an echo sever that can also respond to interactive commands that the user types to standard input. In this case, the server must respond to two independent I/O events:\
**<u>(1)** A network client making a connection request</u>.\
**<u>(2)** A user typing a command line a the keyboard</u>.\
*Which event do we wait for first?*\
**One solution** to this dilemma is a technique called **I/O multiplexing**. The idea is to use the `select` function to ask the kernel to <u>suspend the process, returning control to the application only after one or more I/O events have occured</u>.
