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
  constructor (url, tenant, name) {
    super()

    this.client = mqtt.connect(url, {
      clientId: `I1820/${tenant}/agent/${name}`
    })

    this.client.subscribe([
      `I1820/${tenant}/agent/${name}`
    ])

    this.client.on('message', (topic, message, packet) => {
      if (topic === `I1820/${tenant}/agent/${name}`) {
        this._id = message.toString()
        this.emit('ready')
        this._start()
      } else if (topic === `I1820/${tenant}/configuration`) {
      }
    })

    this.tenant = tenant
    this.name = name
    this.things = []
  }

  _start () {
    setInterval(() => {
      this.client.publish(`I1820/${this.tenant}/agent/ping`)
    }, 10000)
  }

  addThing (id, type) {
    const t = new I1820Thing(this.client, id, null, type)
    this.things.push(t)
    return t
  }
}

module.exports = I1820Client
