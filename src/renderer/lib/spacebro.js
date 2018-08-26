const { SpacebroClient } = require('spacebro-client')

let client = new SpacebroClient({
  host: 'spacebro.space',
  port: 3333,
  client: {
    name: 'aio',
    description: 'realtime audio analysis tool'
  }
})

export function connect (host, port) {
  client.connected && client.disconnect()
  client.connect(host, port)
}

export function disconnect () {
  client.disconnect()
}

export function send (datas) {
  client.connected && client.emit('aio-datas', datas)
}
