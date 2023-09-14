# Exceptional Control Flow
- **Control flow** is the flow of execution of instructions as directed by the program counter.

- Changes occur in _system state_ (which may or may not be caused by the program in execution), and systems react to this changes by making abrupt changes in the control flow. We refer to this abrupt change as _exceptional control flow (ECF)_.

- An _exception_ is an abrupt change in the control flow in response to an _event_ in the system, received by the processor.

- *When this event occurs, the operating system transfers control from the current executing program to an exeception(event) handler. When the handler returns, it transfers control back to the interrupted program.
  - The program either restarts the execution of the current instruction just before it was suspended, 
  - proceeds to the instruction next to the current instruction, or 
  - aborts the program.

> Exception Handling
- Each exception that occurs in a system has a unique _exception number_. Software exceptions (traps or system calls) have their exception numbers assigned by the designers of the operating system. While other types of exceptions have theirs assigned by the designers of the processor.

- An _exception table_ whose entries are indexed by exception numbers, each contains a memory address that points to the corresponding exception handler in memory.
  - So, index 5 of the exeception table for exception number 5 contains the address that points to the exception handler for exception number 5.

- When the processor detects that an event has occured, it determines its exception number, and uses it to lookup the exception table for the corresponding address to its exception handler.
  - The processor pushes a return address on the stack before branching to the handler, the return address could be that of the current instruction or the one next to it, depending on the class of the exception.
  - It also pushes some additional processor state that will be necessary to restart the interrupted program when the handler returns.
  - When control is being transferred from a user program to the kernel, all of these items are pushed onto the kernel's stack rather than onto the user's stack. (Exception handlers run in kernel mode.)
  - After the handler returns, it pops the appropriate state back into the processor's control and data registers, restores the state to user mode, and then returns control to the interrupted program.

## Classes of Exceptions
