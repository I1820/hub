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


class I1820Client {
  constructor(url, tenantId) {
    this.client  = mqtt.connect(url);
    this.tenantId = tenantId;
  }

  start() {
    setInterval(() => {
      this.client.publish(`I1820/${this.tenantId}/agent/ping`,);
    }, 10);
  }
}
