const { SpacebroClient } = require('spacebro-client')

let client = null

export function connect (host, port) {
  client = new SpacebroClient({
    host,
    port,
    client: {
      name: 'aio',
      description: 'realtime audio analysis tool'
    }
  })
}

export function send (datas) {
  client.emit('aio-datas', datas)
}
