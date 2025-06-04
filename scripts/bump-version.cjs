const fs = require('fs')
const path = require('path')
const versionFile = path.join(__dirname, '../src/version.json')
const data = JSON.parse(fs.readFileSync(versionFile, 'utf8'))
let [major, minor, patch] = data.version.split('.').map(Number)
patch += 1
data.version = [major, minor, patch].join('.')
fs.writeFileSync(versionFile, JSON.stringify(data, null, 2))
console.log('Version bumped to', data.version)
