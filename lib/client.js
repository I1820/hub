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

/**
 * I1820Client represents a thing in I1820 platform
 * it must have a key and an identification from I1820
 * that are provided by user in constructor.
 */
class I1820Client extends EventEmitter {
  constructor (url, id, key) {
    super()

    // device access key
    this.key = key
    // device identification
    this.id = id

    // connects to mqtt broker
    this.client = mqtt.connect(url, {
      username: this.key
    })

    // emit ready message when we are connected to broker
    this.client.on('connect', () => {
      this.emit('ready')
    })
  }

  /**
   * Log stores given states into in-memory storage.
   * states must have following structure:
   * { temperature: 10 }
   */
  log (states) {
    var message = {}
    for (var state in states) {
      message[state] = {
        at: new Date(),
        value: states[state]
      }
    }
    this.client.publish(`things/${this.id}/state`, JSON.stringify(message))
  }
}

module.exports = I1820Client
