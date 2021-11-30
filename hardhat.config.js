require("@nomiclabs/hardhat-waffle");
const fs = require('fs');

const privateKey = fs.readFileSync(".secret").toString().trim();
const appId = fs.readFileSync(".appId").toString().trim();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      // Infura mainnet
      url: `https://rpc-mumbai.maticvigil.com/v1/${appId}`,
      accounts: [privateKey]
    },
    matic: {
      // Infura ropsten
      url: `https://rpc-mainnet.maticvigil.com/v1/${appId}`,
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};