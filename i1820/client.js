/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 26-06-2017
 * |
 * | File Name:     client.js
 * +===============================================
 */
const mqtt = require('mqtt')
const EventEmitter = require('events')

const I1820Thing = require('./thing')

class I1820Client extends EventEmitter {
  constructor (url, name, tenantId) {
    super()

    this.client = mqtt.connect(url, {
      clientId: `I1820/${tenantId}/agent/${name}`
    })

    this.client.on('message', (topic, message, packet) => {
      if (topic === `I1820/${tenantId}/agent/${name}`) {
        this._id = message
        this.emit('ready')
      } else if (topic === `I1820/${tenantId}/configuration`) {
      }
    })

    this.tenantId = tenantId
    this.name = name
    this.things = []

    setInterval(() => {
      this.client.publish(`I1820/${this.tenantId}/agent/ping`)
    }, 10)
  }

  addThing (id, type) {
    const t = new I1820Thing(this.client, id, null, type)
    this.things.push(t)
    return t
  }
}

module.exports = I1820Client
