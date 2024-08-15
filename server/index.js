import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'

// Server
const PORT = 3001
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {cors: {origin: 'http://localhost:5173'}})

// Others
const __dirname = path.resolve()


// Functions
    // Servers
    function listenServer() {
        httpServer.listen(PORT, () => console.log('server running'))
    }

    // Sockets
    function listenSocket() {
        io.on('connection', socket => {
            console.log('user connected =>', socket.id)

            socket.on('disconnect', reason => {
                console.log('user desconnected =>', socket.id)
            })

            socket.on('set_username', username => {
                socket.data.username = username
            })

            socket.on('message', text => {
                io.emit('receive_message', {
                    text,
                    authorId: socket.id,
                    author: socket.data.username
                })
            })
        })
    }


// Calls
listenSocket()
listenServer()