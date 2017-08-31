const bamboo = require('../')

let logger = new bamboo.BambooLogger('parham_home', 'Newbie', '127.0.0.1', 9003)

let client = new bamboo.BambooClient('mqtt://127.0.0.1', 'parham_home', 'Newbie')
client.on('ready', () => {
  console.log(client.hash)
})
const t1 = client.addThing('7:1', '.standard.temperature')
setInterval(() => {
  t1.log({
    temperature: 10
  })
  logger.log('info', 'log temperature')
  console.log('log temperature')
}, 10000)
