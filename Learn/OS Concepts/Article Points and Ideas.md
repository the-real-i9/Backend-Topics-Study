# Operating Systems - Intro
The idea of the Operating System, from your own understanding. The what and why?

Why is it necessary to understand for the backend developer? If possible, paint real-world backend scenarios that requires this understanding in the different points you touch.

> Don't go deep into the discussion for now. Until you address each concepts separately.

Operating System operations/functions:
- Multiprogramming and Multitasking
- Dual mode and Multi-mode operation
- Resource management: Memory, Processor, Device, I/O, Network
- Security

Discuss Resource Management. Overview of the different resource management.

# Draft
Me: *Do you know what an Operating System is?*

Normal user: *Yes, it is that system software that's packaged with my computer when I buy it. I see its logo when I boot my computer. I know of Windows and Mac.*

Me: *But do you know any computer is a full function computer, even without an Operating System?*

Normal user: _Wait what??? **Why Operating Systems then?**_

Me: As with several products, a core part of the what an Operating System is, is the problem it addresses, the need it meets.

Before the advent of Operating Systems, the components involved in computing are, 
- **The User**: who gives a program to the computer to achieve a task.
- **The program**: the set of instructions the user gives to the computer to achieve its task.

followed by the hardware resources that work together to achieve this task
- **The Main Memory**: that stores the program instructions to be executed by the processor
- **The Processor**: that takes instructions from the main memory and executes it. 
- **I/O devices**: that allows the computer take input from the user and output results to the user.

This is fine, the user achieve its task. But, there is *a limitation to this model*, which is the fact that *it only allows the user achieve a single task at a time*. Until the user completes a single task can it work on another one. No matter how fast the processor is or how large the RAM is, this model will only run one program at a time even if the size of the program is just 10kb.

Normal user: Ok that's not good... Wait, now I'm starting to get it. The reason why I'm able to run multiple apps at the same time is because of Operating Systems.

Me: Yes, you're right!

Normal user: But how does it do it?

Me: I like you, you're curious.

The Operating System sits in between the user (with the programs containing her instructions), and the computer hardware resources that work together to achieve the task. Until now, you give your program to the computer hardware resources to work on. Now the OS tells the you, *"keep giving me all the programs you want to run anytime"*. The Operating System does its work by *managing the computer hardware resources in front of it, to **fairly** serve the needs of those programs*. Thereby making you feel like all your programs are running at the same time - no program feels time-cheated.

The user is happy to see that it can achieve multiple tasks at the same time. The computer hardware resources don't know that, they still feel they're doing what they've always been doing, working on the instructions of a program. The only thing they notice is that, now they are doing more work compared to time before Operating System came. And of course, they're happy to see that no part of them is lying dormant, they're not bored unlike before when they felt under-utilized.

Normal User: Ok, I'd like to know more. Let's start from how the OS handles the multiple tasks, apps or programs I give it simultaneosly.

Me: Whenever you start a program or open an app. The Operating System creates something called **a Process**, loads your program in the context of that Process, and keeps that Process in a portion of the memory, ready to begin execution. A Process is as a result said to be *an instance of a program in execution*.

When you open another app, the OS creates another process for it and keeps it in a portion of the memory different from the previous one, ready to begin execution.

Once a process is ready to begin execution, the Operating System passes the processor control (you could call it, the runner, executor, driver) to that process, who then begins to enjoy the hardware resources.

Normal user: How then does the OS switches to another process, you said it is *fair* in serving the needs of those tasks?

Me: I was just about to talk about that as I discuss **Multitasking**

A process can be in one of three states, 
- ready (1) - after it's been loaded into memory or when it is leaves its waiting state.
- running (2) - when its currently undergoing execution. In this state, it has the control on it. It's the one currently enjoying the hardware resources.
- waiting (3) - when the process is waiting to get the data it needs to continue running from an input device. After it gets the data, it goes back to its ready state, expecting to have processor control passed to it.

This _"switching to another process"_ happens when a process is in its waiting state. Before Operating Systems, when a situation like this occurs, the CPU is idle, it does nothing, becuase the process says "wait". But with the Operating System now in operation, instead of CPU staying idle, it the Operating System passes control to another process in its ready state, to either begin execution (if it's a newly loaded process) or resume execution (after leaving its waiting state). The act of deciding which process to switch to is known as **CPU scheduling**, the process of switching to that process is known as **context switching**.

Normal user: What if the process doesn't need data from an input device for a long period of time. What then is the point of multitasking?

Me: Ok. There's more. A process does not only go into its ready state after leaving its waiting state, a process can also go into ready state from running state after a certain period of time, triggered by a timer, so it can attend to another process in its ready state.

This switch is so often and fast that, before the user notices the OS has suspended a program's execution, the OS has resumed its execution. Within the time it suspends and resume execution of a process, the OS would have served the needs of one or more processes.

Normal user: Schwaaaaay! Now I understand better when you said, both the user and hardware resources are now happy.

Me: Yeah! The user is happy seeing it can achieve more task simultaneously without having to wait for one to finish. Hardware resources are also happy that they're not under-utilized, they don't lie idle at certain times. I mean, how would you acknowledge the speed of a CPU if all it gets to execute is a 20kb program until it completes. *Remember how a weak opponent bores Lord Beerus. He hates it. Powerful people feel good when they use more of their power. The respect. The prestige.* 

But as you'd agree, the hardware resources technically only executes one process at a time, which is that process in its running state. Few processes can be in their waiting state, a lot more processes can be in their ready state, but just one process can be in its running state at any point in time.

