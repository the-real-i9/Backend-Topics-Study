# Net
Class `net.Server`, 
- to create a server.
- Initialized with `new net.Server()` - or - `net.createServer()`
- `server` properties, methods and events. `server.on('event', handler)`
- Events: `'close', 'connection', 'error', 'listening', 'drop'`

---

Class `net.Socket`, 
- to create a client.
- Initialized with `new net.Socket()` - or - `net.createConnection()`
  - The latter is like the former, except that it automatically calls `socket.connect()` on its socket instance.
- `socket` properties and methods. `socket.on('event', handler)`

---

Class `net.BlockList`, 
- can be used with some network APIs to specify rules for disabling inbound or outbound access to specific IP address, IP ranges, or IP subnets.
- Initialized with `new net.BlockList()`
- `blockList` properties and methods.
