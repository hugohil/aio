'use strict'

import settings from '@/lib/settings'
import { SpacebroClient } from 'spacebro-client'

let client = null

export function setup ({ host, port }) {
  client = new SpacebroClient({
    host,
    port,
    channelName: settings.service.spacebro.channelName,
    client: settings.service.spacebro.client
  })
}

export function unset () {
  client = null
}

export function send (datas) {
  client && client.emit('aiodatas', datas)
}
