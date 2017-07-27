/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 27-06-2017
 * |
 * | File Name:     thing.js
 * +===============================================
 */
const EventEmitter = require('events')

class BambooThing extends EventEmitter {
  constructor (id, type, logs) {
    super()

    this.id = id
    this.type = type
    this.logs = logs
  }

  log (state) {
    this.logs.insert({
      id: this.id,
      type: this.type,
      timestamp: Date.now(),
      state
    })
  }
}

module.exports = BambooThing
