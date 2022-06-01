// https://eth-rinkeby.alchemyapi.io/v2/vo-Vi8oNYTPoRxb32ZCqUM1PU4cvRaW8

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/vo-Vi8oNYTPoRxb32ZCqUM1PU4cvRaW8',
      accounts: ['224a6da658ffc99d9aa7c88a8c79ee7f487289cd30cf06050b48fe98ff8d15f9']
    }
  }
}
