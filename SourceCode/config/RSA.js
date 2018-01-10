let fs = require('fs')
let path = require('path')

let pubFile = path.resolve(__dirname, './openssl/rsa_public_key.pem')
let privFile = path.resolve(__dirname, './openssl/rsa_privite_key.pem')

let pubCrypt
let privCrypt
if (fs.readFileSync(pubFile)) {
  pubCrypt = fs.readFileSync(pubFile)
}

if (fs.readFileSync(privFile)) {
  privCrypt = fs.readFileSync(privFile)
}

pubCrypt = '"' + pubCrypt.toString('base64') + '"'
privCrypt = '"' + privCrypt.toString('base64') + '"'

module.exports = {
  PUBKER: pubCrypt,
  PRIVKEY: privCrypt
}
