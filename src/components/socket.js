import openSocket from 'socket.io-client'
const  socket = openSocket('http://localhost:8081');

const subscribeToEncoder = (cb) => {
    socket.on('encoder', cb)
}

const subscribeToQueue = (cb) => {
    socket.on('queue', cb)
}

export {
    subscribeToEncoder,
    subscribeToQueue
} 