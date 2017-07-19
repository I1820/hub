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
const Loki = require('lokijs')
const EventEmitter = require('events')

const I1820Thing = require('./thing')
const Message = require('./message')

class I1820Client extends EventEmitter {
  constructor (url, tenant, name) {
    super()

    this.db = new Loki('I1820')
    this.logs = this.db.addCollection('logs')

    this.client = mqtt.connect(url, {
      clientId: `I1820/${tenant}/agent/${name}`
    })

    this.client.subscribe([
      `I1820/${tenant}/agent/${name}`,
      `I1820/${tenant}/agent/configuration`
    ])

    this.client.on('message', (topic, message, packet) => {
      if (topic === `I1820/${tenant}/agent/${name}`) {
        this.hash = message.toString()
        this.emit('ready')
        this._start()
      }
    })

    this.tenant = tenant
    this.name = name
    this.things = []
  }

  _start () {
    setInterval(() => {
      /* ping */
      this.client.publish(`I1820/${this.tenant}/agent/ping`,
        JSON.stringify(new Message(this.hash, this.name, null)))
    }, 10000)
    setInterval(() => {
      /* log */
      this.client.publish(`I1820/${this.tenant}/agent/log`,
        JSON.stringify(new Message(this.hash, this.name)))
    }, 50000)
  }

  addThing (id, type) {
    const t = new I1820Thing(id, type, this.logs)
    this.things.push(t)
    return t
  }
}

module.exports = I1820Client
