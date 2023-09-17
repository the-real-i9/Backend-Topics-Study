# Exceptional Control Flow
- **Control flow** is the flow of execution of instructions as directed by the program counter.

- Changes occur in _system state_ (which may or may not be caused by the program in execution), and systems react to this changes by making abrupt changes in the control flow. We refer to this abrupt change as _exceptional control flow (ECF)_.

- An _exception_ is an abrupt change in the control flow in response to an _event_ in the system, received by the processor.

- *When this event occurs, the operating system transfers control from the current executing program to an exeception(event) handler. When the handler returns, it transfers control back to the interrupted program.
  - The program either restarts the execution of the current instruction just before it was suspended, 
  - proceeds to the instruction next to the current instruction, or 
  - aborts the program.

## Exception Handling
- Each exception that occurs in a system has a unique _exception number_. Software exceptions (traps or system calls) have their exception numbers assigned by the designers of the operating system. While other types of exceptions have theirs assigned by the designers of the processor.

- An _exception vector table_ whose entries are indexed by exception numbers, each contains a memory address that points to the corresponding exception handler in memory. This table is managed by the Operating System
  - So, index 5 of the exeception table for exception number 5 contains the address that points to the exception handler for exception number 5.

- When the processor detects that an event has occured, it determines its exception number, and uses it to lookup the exception table for the corresponding address to its exception handler.
  - The processor pushes a return address on the stack before branching to the handler, the return address could be that of the current instruction or the one next to it, depending on the class of the exception.
  - It also pushes some additional processor state that will be necessary to restart the interrupted program when the handler returns.
  - When control is being transferred from a user program to the kernel, all of these items are pushed onto the kernel's stack rather than onto the user's stack. (Exception handlers run in kernel mode.)
  - After the handler returns, it pops the appropriate state back into the processor's control and data registers, restores the state to user mode, and then returns control to the interrupted program.

## Classes of Exceptions

Only concern yourelf with interrupts (I/O exceptions) and traps (system call software exceptions)

> Interrupts or I/O exceptions
- Exceptions caused by signals from I/O devices fall in this category and they occur asynchronously _i.e. they are not by any program instruction_. Some examples are, packets arriving at the network adapter, keyboard input, mouse click etc.
- You can also call them _hardware interrupts_ as they are the only class of exceptions triggered by hardware. Which in fact, establishes the fact that they're asynchronous, otherwise they'd have been triggered by the current executing instruction, in which case they'd be synchronous.
- When this kind of exception occurs, the I/O adapter/controller signals a pin on the processor chip (_via the interrupt request line_) and places on the system bus the exception number that identifies the device that caused the interrupt.
- After each instruction execution, the processor checks its interrupt pin if it has gone high. If so, reads the exception number from  the system bus, and then looks up the appropriate interrupt handler or _interrupt service routine_ (ISR) in an interrupt vector table, transferring control to it.
- The interrupt handler communicates with the relevant device driver to handle the interrupt.

- When the handler returns, it returns control to the next instruction.

> Traps and System Calls
- These are software exceptions triggered as a result of an executing instruction requesting kernel services from the operating system via a set of _system calls_ provided to user programs by the OS itself.
- Executing a `syscall` instruction causes a trap to an excepton handler that decodes the argument and calls the appropriate kernel routine.
- Each system call has a unique integer number that corresponds to an offset in a jump table in the kernel. _This jump table is not the same as the exception table_.
- All arguments to Linux system calls are passed through general-purpose registers rather than the stack.

---
---

# Operating Systems
The Operating System is a system software that manages and control computer hardware resources to serve the needs of the user and multiple programs efficiently and fairly.

> Concepts fundamental to Operating Systems

## Multiprogramming and Multitasking
Whenever the user starts a program, the OS creates a process (an instance of a program in execution), and loads this program in the context of that process.

The operating system keeps multiple processes at separate sections in memory.

The OS achieves *multiprogramming* by making sure the CPU is running some process at all times. When the current running process needs to wait for data from an I/O event. e.g. waiting for data to arrive on the network card. Instead of the CPU staying idle, the Operating System transfers control to another process to either start it (if new) or resume it (if previously preempted).
The operating system achieves *multitasking* by switching control among processes after a certain amount of time. This is known as time-slicing.

---
---

## Resource Management: Summary
> Process Management

Activities involved in process management.
- Creating and terminating both user and system processes
- Scheduling processes and threads on the CPUs
- Suspending and resuming processes
- Providing mechanisms for process synchronization
- Providing mechanisms for inter-process communication

> Memory Management

To utilize computer resources, computers must keep several processes in memory, this creates a need for memory management.

A major activity involed is **Allocating and deallocating memory space**. Dynamic memory allocation.


> I/O System Management
- Handling I/O exceptions or Interrupts
- Kernel I/O Subsystem