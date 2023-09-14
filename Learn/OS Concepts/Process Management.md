# Intro: Process
A process is an instance of a program in execution located in memory. It makes the program feel it has exclusive use of the systems resources.

Each time a user runs a program, the OS creates a new process and runs this program in the context of that process.

Each process have **an independent logical control flow** (_independent program counters_) that provides the illusion that its program has exclusive use of the processor.

> Logical flow

If we were to step through the execution of our program, we would observe a series of program counter values that corresponded exclusively to instructions contained in our program's executale object file or in shared objects linked into our program dynamically at run time. This sequence of PC values is known as the *logical control flow*.
- It'd seem as if the program counter has only been addressing this process instructions, whereas it done for other processes instructions too.
- Processes takes turns using the processor. Each process executes a portion of its flow for a certain amount of time (this time period is called a _time slice_) and is temporarily suspended while others take their turns.
- When one process suspends the, current values of its program counter is saved into its state (along with other values) before another process takes its turn, when this process resumes, the current value of its program counter is restored into the program counter in the processor, and execution continues.

## Concurrent Flows
The general phenomenon of multiple flows executing concurrently is known as _concurrency_. The notion of a process taking turns with other processes is also known as _multitasking_. Each time period that a process executes a portion of its flow is called a _time slice_. Thus, multitasking is also referred to as _time slicing_.

If two flows overlap in time, then they are concurrent, even if they are running on the same processor.

If two flows are _running concurrently on different processor cores_ or computers, then **they are running in parallel**, and have **parallel execution**.

---

Each process also have **a private address space** that provides the illusion that its program has exclusive use of the main memory.

> Private Address Space

A process provides each program with its own *private address space*. Not to be addressed by any other process.

Each address space has the same general organization.
- The bottom portion is reserved for the user program.
- The top portion is reserved for the kernel.
- An address space contains:
  - Code segment and Data segment, loaded from the executable file
  - The runtime heap, created by `malloc`
  - User stack created at runtime, used by function calls.
  
  ![Process address space](./imgs/process-address-space.png)

## User and kernel modes
A mechanism that restricts the instructions that a program can execute, as well as the portions of the address space that it can access.

A process running in kernel mode can execute any instruction in the instruction set and access any memory location in the system.

A process running in user mode is not allowed to execute priviledged instructions which only the OS is allowed to access. It is also not allowed to directly reference code or data in the kernel area of its address space, any such attempt throws a protection fault. **User programs must instead access kernel code and data indirectly via the system call interface**.

The only way for a process to change from user mode to kernel mode is to trigger an exception.
- When exception occurs and control is passed to the exception handler, the processor changes the mode from user mode to kernel mode. This is because exception handlers run only in kernel mode.
- When it returns to the application code, the processor changes the mode from kernel mode back to user mode.

Note: Modes are associated with processes, not with the CPU.

## !Context Switches!
The *OS kernel implements multitasking* using a form of exceptional control flow known as a _context switch_.

The kernel maintains a <u>*context*</u> for each process.
- The context is **the state that the kernel needs to restart a preempted process**.
- <u>*It consists of*</u> ***the values of objects*** such as
  - general-purpose registers, 
  - the floating-point registers, 
  - the program counter, 
  - user's stack, 
  - status registers, 
  - kernel's stack, 
  
  and *various kernel data structues* such as 
  - a page table that characterizes the address space, 
  - a process table that contains information about the current process, and 
  - a file table that containis information about the files that the process has opened.

At certain points during the execution of a process, the *kernel can decide to preempt the current process and restart a previously preempted process*. This decision is known as **process scheduling**, and is handled by code in the kernel, called the **scheduler**.
- When the kernel selects a new process to run, we say that the kernel has **scheduled** that process.
- After this, it preempts the current process and transfers control to the new process using a mechanism called a **context switch**, 
- *Context switching* goes thus,
  - save the context of the current process,
  - restore the saved context of some previously preempted process, and
  - pass control to this newly restored process.

A context switch can occur while the kernel is executing a system call on behalf of the user. If the system call blocks because it is waiting for some event to occur, then the kernel can suspend the current process and switch to another process.
- For example, if a process is waiting for response data to arrive on the network adapter. Instead of the CPU staying idle, the OS schedules another process to run and context switches to that process.
- This also happens if a process delibrately suspends itself.
- Even if a system call does not block, the kernel can decide to perform a context switch rather than return control to the calling process.

Interrupt handlers are executed in kernel mode by the device controller that triggers the interrupt. The device controller is like a processor specific to a device that executes the driver code. At this point the CPU can stay idle or the OS schedules another process, pass control to it and it continues execution by the CPU.

A context switch can also occur as a result of an interrupt. For example, when a timer interrupt occurs, the kernel can decide that the current process has run long enough and switch to a new process.

