# Intro
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