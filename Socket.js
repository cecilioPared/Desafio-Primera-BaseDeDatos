const { Server } = require('socket.io')

const { Mensajes } = require("./db/mensajes")
const { Productos } = require("./db/productos")


let io


function initSocket(httpServer) {
  io = new Server(httpServer)
  setEvents(io)
}

async function setEvents(io) {

  const mensajeDB = new Mensajes('mensajes');
  await mensajeDB.createTable();

  const productoDB = new Productos('productos');
  await productoDB.createTable();

  io.on('connection', async (socketClient) => {
    console.log('Se conecto un nuevo cliente con el id', socketClient.id)
    socketClient.emit('historial', await mensajeDB.getData())
    socketClient.emit('load-productos',await productoDB.getData())

    socketClient.on('nuevo-mensaje', async (data) => {              
      await mensajeDB.insertData(data);
      io.emit('historial', await mensajeDB.getData());
    })

    socketClient.on('nuevo-producto', async (data) => {      
     await productoDB.insertData(data);
    io.emit('load-productos',await productoDB.getData())
  })

    socketClient.on('disconection', () => {
      console.log('Se desconecto el cliente con el id', socketClient.id)
    })
  })
}


module.exports = {
  initSocket
}