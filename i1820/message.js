/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 28-06-2017
 * |
 * | File Name:     message.js
 * +===============================================
 */

class Message {
  static get version () {
    return '2.1'
  }

  constructor (hash, thingId, name, data) {
    this.hash = hash
    this.name = name
    this.data = data
  }

  toJSON () {
    console.log(this)
    console.log(JSON.stringify({
      version: this.version,
      hash: this.hash,
      name: this.name,
      data: this.data
    }))
    return "{}"
  }

  static fromJSON (payload) {
    let p = JSON.parse(payload)
    if (p.version !== Message.version) {
      return null
    }
    return new Message(p.hash, p.name, p.data)
  }
}

module.exports = Message
