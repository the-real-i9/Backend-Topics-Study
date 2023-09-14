# Intro

Main memory is a repository of quickly accessible data **shared by the CPU and I/O devices**. The CPU reads instructions from main memory, and reads/writes data from/to the it.

_It is the only data storage the CPU is able to address and access directly_. If the CPU needs data from any other place, it must first be transferred to main memory by CPU generated I/O calls.

For a program to be executed, it must be mapped to absolute address and loaded into memory. As the program, executes, it access program instructions and data from memory by generating these absolute addresses.

# Memory Management
This is how programs and operating systems, control the allocation and deallocation of memory space for efficient memory use.

Your main focus is to 
- know about how your programming language handles memory management, 
- how to write memory efficient programs in the language, 
- know about the automatic memory management technique it uses.
