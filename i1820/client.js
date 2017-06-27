/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 26-06-2017
 * |
 * | File Name:     client.js
 * +===============================================
 */
const mqtt = require('mqtt');

const I1820Thing = require('./thing');

class I1820Client {
  constructor(url, tenantId) {
    this.client  = mqtt.connect(url);
    this.tenantId = tenantId;
    this.things = [];
  }

  start() {
    setInterval(() => {
      this.client.publish(`I1820/${this.tenantId}/agent/ping`,);
    }, 10);
  }

  addThing(id, type) {
    const t = new I1820Thing(this.client, id, null, type);
    this.things.push(t);
    return t;
  }
}

module.exports = I1820Client;
