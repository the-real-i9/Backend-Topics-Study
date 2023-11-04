# Net
## Class `net.Server`

To create a TCP or IPC server.

> Initializer(s)
- `new net.Server(options, (socket) => {})`
- `net.createServer(options, (socket) => {})`

> Methods
- `listen(handle[, backlog][, callback])`
- `listen(options[, callback])`
- `listen(path[, backlog][, callback])` - for IPC servers
- `listen([port[, host[, backlog]]][, callback])` - for TCP servers

> Common Events
- `'connection': (socket) => {}`
- `'error': (error) => {}`
- `'drop': (data) => {}`

## Class `net.Socket`

It is returned by `net.createConnection()`, so <u>the **client** can use it to talk **to the server**</u>.

> It is also passed to the listeners of a `'connection'` event emitted on a `net.Server`, so <u>the server can use it to interact with the client</u>.

It is a duplex stream, one end writes, the other end reads.

> Initializer(s)
- `new net.Socket() + socket.connect()` 
  - `socket.connect()`
    > Use the `socket.connect()` only for reconnecting a socket after `'close'` has been emitted or otherwise it may lead to undefined behaviour.
  - `socket.connect(options[, connectListener])`
    > If you only plan to initiate a connection on the socket after creating it, use the `net.createConnection()` instead. <u>Use this only when implementing a custom Socket</u>.
  - `socket.connect(path[, connectListener])` - for IPC clients
  - `socket.connect(port[, host][, connectListener])` - for TCP clients
- `net.createConnection()` - automatically calls `socket.connect()`
  - `net.createConnection(options[, connectListener])`
  - `net.createConnection(path[, connectListener])` - for IPC clients
  - `net.createConnection(port[, host][, connectListener])` - for TCP clients


> Common Methods
- `write(data[, encoding][, callback])`
- `destroy([error])`, `destroySoon()`, `resetAndDestroy()`
- `end([data[, encoding]][, callback])`


> Common Events
- `'data': (data) => {}`
- `'close': (hadError) => {}`
- `'error': (error) => {}`
- `'connect'`
- `'end'`

---

Class `net.BlockList`, 
- can be used with some network APIs to specify rules for disabling inbound or outbound access to specific IP address, IP ranges, or IP subnets.
- Initialized with `new net.BlockList()`
- `blockList` properties and methods.
