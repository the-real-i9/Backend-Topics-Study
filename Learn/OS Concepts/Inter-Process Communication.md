# Intro
IPC is **the mechanism that allows processes to exchange data**.

There are two fundamental models of IPC: 
- **shared memory**: <u>a region of memory that is shared</u> by the communicating processes is established.
- and **message passing**: communicating processes <u>exchange messsages</u> between them.

![IPC Models](./imgs/IPC-models.png)

# IPC in shared memory systems
Using this technique, requires communicating processes to establish a region of shared memory. A shared memory segment is created by one of the communicating processes in its address space. Other processes that wishes to communicate must attach it to their address space.

Communicating procecesses must agree to remove the restriction that the operating system places on one process accessing the memory of another process.

The processes communicate by writing and reading data in the shared memory, which is visible to communicating processes.

An example of this technique, is the producer-consumer problem, where the producer process writes (produces data) to the shared memory, and the cosumer process read (consumes data) from the shared memory.

To allow the producer and consumer processes to run concurrently, a buffer resides in this region of shared memory. The producer fills the buffer with data items, and the consumer empties the buffer of data items.

The producer and consumer must be synchronized, so that 
- the producer must wait when the buffer is full (bounded buffer),
- the consumer must wait when the buffer is empty, 
- and most especially <u>the processes must not access the shared memory while one is still at work, one must wait for the other to finish performing its *producing* or *consuming* operation</u>.
  - Normally, only one process can be "running" at one time, let's say this time it's the producer process, but if the operating system context-switches to the consumer process while the producer process has not yet finished producing, the consumer process will be trying to access no data. We don't want this. Hence, the need for a synchronization mechanism between these processes.

Two types of buffer can be used:
- Bounded buffer: This type of buffer has a size limit, the producer must wait if the buffer is full, and the consumer must wait if the buffer is empty.
- Unbouded buffer: This type of buffer has no size limit, the producer can keep putting data items into the buffer, but the consumer must still wait if the buffer is empty.

The buffer management, process synchronization and all other operations involved in shared memory communication, is handled by the application programmer.

# IPC in message passing systems
In this technique, the operating system provides the means for cooperating processes to communicate via message-passing.

**Message passing provides a mechanism to allow processes to communicate and to synchronize their actions without sharing the same address space**. It is particularly useful in a distributed environment, where the communicating proceses may reside on different computers connected by a network.

If two processes `P` and `Q` must *send messages to and receive messages from* each other, <u>a **communication link** must exist</u> between them.

> Methods for implementing the communication link:
- Direct or Indirect communication
- Synchronous or asynchronous communication
- Automatic or explicit buffering

## Naming : Direct or Indirect
### Direct Communication
Each process that wants to communicate must explicitly **name the recipient or sender of the communication**.

Direct communication can take two approaches,
- Symmetrical addressing: in which the sender and the receiver refer to each other by name.
  - `send(P, message)`
  - `receive(Q, message)`
- Asymmetrical addressing: in which only the sender refer to the receiver by name. While the receiver wants to receive from any process.
  - `send(P, message)`
  - `receive(id, message)` - where `id` is set to that of the sender process it receives from.

This direct communication is **less desirable**.

### Indirect Communication
**The messages are sent to and received from mailboxes, or ports**. <u>A sender process places the message in this mailbox, while a receiver process removes the message from the mailbox</u>.  

Each mailbox has a unique identification. Two processes can communicate via a number of different mailboxes, only if they share that mailbox.

- `send(A, message)` - Send `message` to mailbox `A`
- `receive(A, message)` - Receive `message` from mailbox `A`


## Syncronization: Synchronous or Asynchronous
Depending on the implementation of the `send()` and `receive()` primitives, message passing can be either **blocking** or **non-blocking**.
- Blocking send: The sending process is blocked until the messag is received by the receiving process or by the mailbox.
- Non-blocking send: The sending proces sends the message and resumes operation.
- Blocking receive: The receiver blocks until a message is available.
- Non-blocking receive: The receiver retrieves either a valid message or a null.

## Buffering
The temporary message queue used by the communicating processes can be implemented in three ways:
- Zero capacity: Queue has a maximum length of zero; the link cannot have messages waiting in it. The sender must block until the recipient receives the message. This is also known as *a message system with no buffering*.
- Bounded capacity: The queue can only take $n$ items at most. The sender can keep sending messages if the queue isn't full, else, it waits and blocks, until there's available space in the queue.
- Unbounded capacity: The queue can take an infinite number of items. The sender keeps sending without waiting/blocking. The receiver keeps receiving unless the queue is empty in which case it waits and blocks, until message is available in the queue.