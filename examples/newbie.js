const i1820 = require('../')

let client = new i1820.I1820Client('mqtt://127.0.0.1', 'parham_home', 'Newbie')
client.on('ready', () => {
  console.log(client.hash)
})
