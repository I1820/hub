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

const BambooThing = require('./thing')
const Message = require('./message')

class BambooClient extends EventEmitter {
  constructor (url, tenant, name) {
    super()

    this.db = new Loki('Bamboo')
    this.logs = this.db.addCollection('logs')
    this.tenant = tenant
    this.hash = null
    this.name = name
    this.things = []

    this.client = mqtt.connect(url, {
      clientId: `Bamboo/${tenant}/agent/${name}`
    })

    this.client.subscribe([
      `Bamboo/${tenant}/agent/${name}`,
      `Bamboo/${tenant}/agent/configuration`
    ])

    this.client.on('message', (topic, message, packet) => {
      if (topic === `Bamboo/${tenant}/agent/${name}` && !this.hash) {
        this.hash = message.toString()
        this.emit('ready')
        this._start()
      }
    })
  }

  _start () {
    setInterval(() => {
      /* log */
      this.logs.where((log) => {
        this.client.publish(`Bamboo/${this.tenant}/agent/log`,
          JSON.stringify(new Message(this.hash, this.name, log)))
        this.logs.remove(log)
      })
    }, 50000)

    /* discovery */
    let things = []
    this.things.forEach((thing) => {
      things.push({
        id: thing.id,
        type: thing.type
      })
    })
    this.client.publish(`Bamboo/${this.tenant}/agent/discovery`,
      JSON.stringify(new Message(this.hash, this.name, {things})))
  }

  addThing (id, type) {
    const t = new BambooThing(id, type, this.logs)
    this.things.push(t)

    if (this.hash) {
      /* Publishes things change when we are connected */
      let things = []
      this.things.forEach((thing) => {
        things.push({
          id: thing.id,
          type: thing.type
        })
      })
      this.client.publish(`Bamboo/${this.tenant}/agent/discovery`,
        JSON.stringify(new Message(this.hash, this.name, {things})))
    }

    return t
  }
}

module.exports = BambooClient
