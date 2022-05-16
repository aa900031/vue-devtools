import http from 'http'
import sirv from 'sirv'
import { render } from 'eta'
import { Server } from 'socket.io'
import { createApp, defineHandler } from 'h3'
import clientContent from './html'

export const createServer = (
  serverUrl: string,
  assetsDir: string,
): http.Server => {
  const app = createApp()
  const server = http.createServer(app)

  app.use(sirv(assetsDir))

  app.use('/', defineHandler(async () => {
    const url = new URL(serverUrl)

    return await render(clientContent, {
      devtoolsHost: `${url.protocol}//${url.hostname}`,
      devtoolsPort: url.port,
    })
  }))

  const io = new Server(server, {
    cors: {
      origin: true,
    },
  })

  let currHook: string | null = null
  io.on('connection', (socket) => {
    switch (socket.handshake.query.type) {
      case 'client':
        if (currHook !== null) {
          socket.emit('vue-devtools-init')
        }
        break
      case 'hook':
        currHook = socket.id
        socket.broadcast.emit('vue-devtools-disconnect-backend')
        break
    }

    socket.on('vue-devtools-init', () => {
      socket.broadcast.emit('vue-devtools-init')
    })

    socket.on('disconnect', (reason) => {
      if (!reason.indexOf('client')) return

      if (currHook === socket.id) {
        currHook = null
      }

      socket.broadcast.emit('vue-devtools-disconnect-devtools')
    })

    socket.on('vue-message', data => {
      socket.broadcast.emit('vue-message', data)
    })
  })

  return server
}
