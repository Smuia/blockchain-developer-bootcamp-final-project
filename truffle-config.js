const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonicPhrase = ""; // Add your wallet mnemonic phrase here.



module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    //Rinkeby network
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonicPhrase, 
         `https://rinkeby.infura.io/v3/0c8f2b8fbfa74e9bb9b3d945d8d8f089`
        )
      },
      network_id: 4, //rinkeby's network id
      gas: 4500000, //block limit 
      gasPrice: 10000000000,
      timeoutBlocks: 200, // Number of blocks before a deployment times out
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
