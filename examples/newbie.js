const bamboo = require('../')

let client = new bamboo.BambooClient('mqtt://127.0.0.1', 'parham_home', 'Newbie')
client.on('ready', () => {
  console.log(client.hash)
})
const t1 = client.addThing('7:1', 'temperature')
setInterval(() => {
  t1.log({
    temperature: 10
  })
  console.log('log temperature')
}, 10000)
