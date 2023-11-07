import net from 'net'

process.argv[2]

const socket = new net.createConnection({ port: 5000 }, () => {
  socket.write(process.argv[2])
})

socket.on('data', (data) => {
  console.log(data.toString('utf-8'))
  socket.end()
})

