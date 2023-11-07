import net from 'net'

const server = new net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString('utf-8'))
    // socket.write("Kenny is a boy")
    socket.end()
  })
})

server.listen(5000, () => {
  console.log('http://localhost:5000')
})