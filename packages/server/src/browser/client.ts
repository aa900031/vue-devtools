import { initDevTools } from '@front'
import { Bridge } from '@vue-devtools/shared-utils'
import { createSocket } from './utils'

const socket = createSocket('client')
const $ = document.querySelector.bind(document)
const $intro = $('#intro')

let reload = null
let introTimer

socket.on('vue-devtools-disconnect-devtools', () => {
  introTimer = setTimeout(() => {
    $intro.classList.remove('hidden')
  }, 2000)
})

socket.on('vue-devtools-init', () => {
  clearTimeout(introTimer)
  $intro.classList.add('hidden')

  // Reset attached listeners
  socket.off('vue-message')

  // If new page is opened reload devtools
  if (reload) return reload()

  initDevTools({
    connect (callback) {
      const wall = {
        listen (fn) {
          socket.on('vue-message', data => fn(data))
        },
        send (data) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.log('%cdevtools -> backend', 'color:#888;', data)
          }
          socket.emit('vue-message', data)
        },
      }
      const bridge = new Bridge(wall)

      callback(bridge)
    },
    onReload (fn) {
      reload = fn
    },
  })
})
