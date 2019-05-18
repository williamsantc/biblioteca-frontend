import os from 'os'
const ifaces = os.networkInterfaces()

let ip = ''
let multiIp = ''

for (let ifname of Object.keys(ifaces)) {
  let alias = 0
  for (let iface of ifaces[ifname]) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      continue
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      multiIp = ifname + ':' + alias
    } else {
      multiIp = ifname
    }
    ip = iface.address
      ++alias
  }
}

export const m = multiIp

export default ip || 'localhost'
