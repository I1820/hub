const i1820 = require('../')

let client = new i1820.I1820Client('mqtt://127.0.0.1', 'parham_home', 'key')

client.on('ready', () => {
  console.log('We are all set')
})

client.on('log', () => {
  console.log('Send data into I1820 Platform')
})

setInterval(() => {
  client.log({
    temperature: 10
  })
  console.log('log temperature')
}, 10000)
