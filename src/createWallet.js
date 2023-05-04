const bip32 = require('bip32') 
const bip39 = require('bip39') 
const bitcoin = require('bitcoinjs-lib') 

// difinindo a rede 
// bitcoin - rede principal - mainnet
// testnet - rede de teste - testnet
const network = bitcoin.networks.testnet 

// entrada de dados 
// derivação de carteiras HD - HD wallet - BIP32 
// derivação de carteiras legacy - legacy wallet - BIP44 
// derivação de carteiras segwit - segwit wallet - BIP49 
// derivação de carteiras segwit p2sh - segwit p2sh wallet - BIP84 

// BIP32 - derivação de carteiras HD 
// BIP44 - derivação de carteiras legacy 
// BIP49 - derivação de carteiras segwit 
// BIP84 - derivação de carteiras segwit p2sh 

// path - caminho para acessar uma determinada carteira 
const path = `m/49'/1'/0'/0` 

// mnemonic - palavra-chave para acessar uma determinada carteira 
const mnemonic = bip39.generateMnemonic() // ex: 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat' 
let seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz da cateira HD
let root = bip32.fromSeed(seed, network) 

// Criando uma conta - par pvt-pub keys
let account = root.derivePath(path) 
let node = account.derive(0).derive(0) 

let btcAddress = bitcoin.payments.p2pkh({ 
    pubkey: node.publicKey, 
    network: network 
}).address

console.log("Cateira gerada!")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)