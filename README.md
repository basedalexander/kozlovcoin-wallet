# Kozlovcoin Wallet

### Kozlovcoin browser client. Blockchain node is here: [kozlovcoin](https://github.com/thohoh/kozlovcoin)

[![Build Status](https://travis-ci.org/thohoh/kozlovcoin-wallet.svg?branch=master)](https://travis-ci.org/thohoh/kozlovcoin-wallet)

### Instructions:

#### 1) Install and run blockchain node from this [repository](https://github.com/thohoh/kozlovcoin)

#### 2) Install and run client:
```bash
git clone https://github.com/thohoh/kozlovcoin-wallet
cd kozlovcoin-wallet
npm i 
npm start
```

#### Or with docker
```
docker run -d -p 8080:8080 --name kozlovcoin-wallet thohoh/kozlovcoin-wallet
```

#### Open in your browser: 
[http://127.0.0.1:8080/](http://127.0.0.1:8080/)

1. Blocks are mined every 10 seconds.
2. No backend for client, key pairs are stored in local storage.
3. Client expects Node API to be available on port 3008.
