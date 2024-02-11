# Intro
Applications that use application-level concurrency are known concurrent programs.

Modern operating systems provide <u>three basic approaches for building concurrent programs</u>:
- **<u>Processes</u>** With this approach, each logical control flow is a process that is scheduled and maintained by the kernel. Since processes have separate virtual address spaces, flows that want to communicate with each other must use some kind of explicit *interprocess communication (IPC)* mechanism.
- **<u>I/O multiplexing</u>** This is a form of concurrent programming where <u>applications explicitly schedule their own logical flows in the context of a single process</u>.
  - Logical flows are modeled as state machines that <u>the main program explicitly transitions from state to state *as a result of data arriving on file descriptors*</u>.
  - Since the program is a single process, all flows share the same address space.
  - The program implements its own scheduling mechanism and states and queues (ready, wait).
- **<u>Threads</u>** Threads are logical flows that run in the context of a single process and are scheduled by the kernel. You can think of threads as a hybrid of the other two approaches, scheduled by the kernel like process flows and sharing the same virtual address space like I/O multiplexing flows.

# Concurrent Programming with Processes