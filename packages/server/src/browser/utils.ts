import io from 'socket.io-client'
import { target } from '@vue-devtools/shared-utils'

const getServerUrl = () => {
  const host = target.__VUE_DEVTOOLS_HOST__ ?? 'http://localhost'
  const port = target.__VUE_DEVTOOLS_PORT__ ?? 8098
  return port ? `${host}:${port}` : host
}

export const createSocket = (type: string) => {
  const createFn = target.__VUE_DEVTOOLS_SOCKET__ ?? io
  const url = getServerUrl()
  return createFn(url, {
    query: {
      type,
    },
  })
}

export const execToast = (msg: string, type: string) => {
  return target.__VUE_DEVTOOLS_TOAST__?.(msg, type)
}