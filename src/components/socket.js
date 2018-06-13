import openSocket from 'socket.io-client'
const  socket = openSocket('http://localhost:8081');

const subscribeToVideoSelected = (cb) => {
    socket.on('videoSelected', cb)
}

const subscribeToFiles = (cb) => {
    socket.on('files', cb)
}

const subscribeToEncoder = (cb) => {
    socket.on('encoder', cb)
}

const subscribeToQueue = (cb) => {
    socket.on('queue', cb)
}

export {
    subscribeToFiles,
    subscribeToVideoSelected,
    subscribeToEncoder,
    subscribeToQueue
} 