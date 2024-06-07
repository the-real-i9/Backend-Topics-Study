# Protocols and Layers

## Layers

Data communication networks rely on *layered* protocols.

<u>Processes running on a system</u> and the communication ports that send and receive network bits <u>are logically connected by a series of layers</u>, <u>each performing one major function of the networking task.</u>

Each layer in the protocol stack has a distinct purpose and function. Each protocol layer handles part of the overall task.

### Protocol Layers

Each layer has a separate function in the overall task of moving bits between processes.

As long as the boundary functions between adjacent layers are respected, **(due to the decoupled nature)** 👉 layers can be changed or even completely rewritten without having to change the whole application. <u></u>Layers can be combined for efficiency, "mixed-and-matched" from different vendors, or customized for different circumstances, all without having to rework the entire stack from top to bottom.

## The TCP/IP Protocol Suite

The protocol stack used on the Internet is the Internet Protocol Suite. <u>It is usually called TCP/IP after two of its most prominent protocols, but there are other protocols as well</u>.

The TCP/IP model <u>is based on a five-layer model for networking</u>. From bottom (the link) to top (the user application), these are

- the physical,
- data link,
- network,
- transport, and
- application layers.

Not all layers are completely defined by the model, so these layers are “filled in” by external standards and protocols.

Two compatible end-system applications can communicate regardless of their underlying architectures, although the connections between layers are not defined.

The TCP/IP layers contain relatively independent protocols that can be used <u>depending on the needs of the system to provide whatever function is desired</u>. For example, there are different application layer protocols each providing the system with specific functionality and/or behaviour.

### The TCP/IP Layers

The Internet protocol suite assumes that a layer is there and available, so TCP/IP does not define the layers themselves. *The stack consist of protocols, not implementations, so describing a layer or protocols says almost nothing about how these things should actually be built*.

<u>Not all systems on a network need to implement all five layers of TCP/IP.</u> **Devices using the TCP/IP protocol stack fall into two general categories**: *a host* or *end system* (ES) and an *intermediate node* (often a router) or an *intermediate system* (IS).
<u>The intermediate nodes usually only involve the first three layers of TCP/IP.</u>

Each implemented layer has an *interface* with the layers above and below it (except for the application and physical layers, of course) and provides its defined service to the layer above and obtains services from the layer below. In other words, <u>there is a *service interface* between each layer,</u> *but these are not standardized and vary widely by operating
system.*

Individual layers can be combined for implementation purposes, *as long as the service interfaces to the layers remain intact*. <u>Layers can even be split when necessary, and new service interfaces defined.</u> Services are provided to the layer above after the higher layer provides the lower layer with the command, data, and necessary parameters for the lower layer to carry out the task.

Layers on the same system provide and obtain services to and from adjacent layers. However, <u>a *peer-to-peer protocol process* allows the same layers on different systems to communicate</u>. The term peer means every implementation of some layer is essentially equal to all others. Communications between peer layers on different systems use the defined protocols appropriate to the given layer.

In other words, ***services*** refer to <u>communications between layers within the same process,</u> and ***protocols*** refer to <u>communications between processes.</u>

### Protocols and Interfaces

It is important to note that <u>when the layers of TCP/IP are on different systems, they are only connected at the physical layer.</u> *Direct peer-to-peer communication between all other layers is impossible.* This means that <u>all data from an application have to flow “down” through all five layers at the sender, and “up” all five layers at the receiver to reach the correct process on the other system.</u> These data are sometimes called a *service data unit* (SDU).

Each layer on the sending system adds information to the data it receives from the layer above and passes it all to the layer below (except for the physical layer, which has no lower layers to rely on in the model and actually has to send the bits in a form appropriate for the communications link used).

Likewise, each layer on the receiving system unwraps the received message, often called a *protocol data unit* (PDU), with each layer examining, using, and stripping off the information it needs to complete its task, and passing the remainder up to the next layer (except for the application layer, which passes what’s left off to the application program itself).

![Protocols and Interfaces](./imgs/protocols-and-interfaces.png)

As shown in the figure,

- there is a natural grouping of the five-layer protocol stack at the network layer and the transport layer.
- <u>The lower three layers of TCP/
IP, sometimes called the *network support layers*, must be present and functional on all systems, regardless of the end system or intermediate node role.</u>
- The transport layer links the upper and lower layers together. This layer can be used to make sure that what was sent was received, and what was sent is useful to the receiver.

The process of encapsulation makes the whole architecture workable. <u>**Encapsulation of one layer’s information inside another layer is a key part of how TCP/IP works.**</u>

### Encapsulation

Each layer uses encapsulation to add the information its peer needs on the receiving system.

- The network layer adds a header to the information it receives from the transport at the sender and passes the whole unit down to the data link layer.
- At the receiver, the network layer looks at the control information, usually in a *header*, in the data it receives from the data link layer and passes the remainder up to the transport layer for further processing.
- This is called encapsulation because one layer has no idea what the structure or meaning of the PDU is at other layers. *The PDU has several more or less official names for the structure at each layer.*


![TCP/IP encapsulation headers](./imgs/tcpip-encapsulation-headers.png)

The exception to this general rule is the data link layer, which adds both a *header* and a *trailer* to the data it receives from the network layer. The general flow of encapsulation in TCP/IP is shown above.

- Note that on the transmission media itself (or communications link), there are only bits, and that some
“extra” bits are added by the communication link for its own purposes.
- Each PDU at the other layers is labeled as data for its layer, and the headers are abbreviated by layer name.
- The exception is the second layer, the data link layer, which shows a header and trailer added at that level of encapsulation.

## The layers of TCP/IP

### The Physical Layer

The actual physical connection between two network devices.

The physical layer contains all the functions needed to carry the bit stream over a physical medium to another system. The transmission medium forms a pure “bit pipe” and should not change the bits sent in any way.

Now, <u>transmission “on the wire” might send bits through an extremely complex transform, but the goal is to enable the receiver to reconstruct the bit stream exactly as sent</u>. *Some information in the form of transmission framing can be added to the data link layer data, but this is only used by the physical layer and the transmission medium itself.*

**Physical layer specifications have four parts**: mechanical, electrical or optical, functional, and procedural.

- The **mechanical part** <u>specifies the physical size and shape of the connector itself</u> so that components will plug into each other easily.
- The **electrical/optical specification** <u>determines what value of voltage or line condition determines whether a pin is active or what exactly represents a 0 or 1 bit</u>.
- The **functional specification** <u>specifies the function of each pin or lead on the connector</u> (first lead is send, second is receive, and so on).
- The **procedural specification** <u>details the sequence of actions that must take place to send or receive bits on the interface</u>. (For Ethernet, the send pair is activated, then a “preamble” is sent, and so forth.)

There are **other things that the physical layer must determine:**

- Data rate
- Bit synchronization
- **Configuration:** So far we’ve assumed simple **point-to-point** links, but this is not the only <u>way that systems are connected</u>. In a **multipoint** configuration, a link connects more than two devices, and in a multisystem bus/broadcast topology such as a LAN, the number of systems can be very high.
- **Topology:** <u>The devices can be *arranged* in a number of ways</u>. In a **full mesh** topology, all devices are directly connected and one hop away, but this requires a staggering amount of links for even a modest network. Systems can also be arranged as a **star** topology, with all systems reachable through a central system. There is also the **bus** (all devices are on a common link) and the **ring** (devices are chained together, and the last is linked to the first, forming a ring).
- **Mode:** So far, we’ve only talked about one of the systems as the sender and the other as the receiver. This is operation in **simplex** mode, <u>where a device can only send or receive</u>, such as with weather sensors reporting to a remote weather station. More realistic devices use **duplex** mode, <u>where all systems can send or receive</u> with equal facility. This is often further distinguished as **half-duplex** (<u>the system can send and receive, but not at the same time</u>) and **full-duplex** (<u>simultaneous sending and receiving</u>)

### The Data Link Layer

Bits are just bits. <u>With only a physical layer, System A has no way to tell System B, “Get ready some bits,” “Here are the bits,” and “Did you get those bits okay?”</u> The data link layer solves this problem by organizing the bit stream into a data unit (PDU) called a frame.
