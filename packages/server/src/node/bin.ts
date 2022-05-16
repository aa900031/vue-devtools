#!/usr/bin/env node

import path from 'path'
import minimist, { ParsedArgs } from 'minimist'
import { createServer } from './server'

const run = async (
  port: string,
  url: string,
  assetsDir: string,
) => {
  const server = createServer(url, assetsDir)
  server.listen(+port, '0.0.0.0', () => {
    console.log(`Vue Devtools Server running at :${port}`)
  })
}

const parse = (
  argv: ParsedArgs,
): Parameters<typeof run> => {
  let { port, url } = argv

  if (!port) {
    port = '8098'
  }

  if (!url) {
    url = `http://localhost:${port}`
  }

  const assetsDir = path.resolve(__dirname, '../assets')

  return [port, url, assetsDir]
}

;(async () => {
  const argv = minimist(process.argv.slice(2), {
    string: ['port', 'url'],
    alias: {
      port: 'p',
      url: 'u',
    },
  })
  const args = parse(argv)
  await run(...args)
})()
