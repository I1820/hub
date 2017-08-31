/*
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 24-08-2017
 * |
 * | File Name:     src/logger.js
 * +===============================================
 */
const winston = require('winston')

class BambooLogger extends winston.Logger {
  constructor (host, port) {
    super({
      rewriters: [function (level, msg, meta) {
        if (meta) {
          meta.component = 'bamboo-rpi'
        } else {
          meta = {
            component: 'bamboo-rpi'
          }
        }
        return meta
      }],

      transports: [new winston.transports.Http({
        port,
        host
      })]
    })
  }
}

module.exports = BambooLogger
