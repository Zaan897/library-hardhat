require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  mumbai_testnet: {
    url: "https://rpc-mumbai.maticvigil.com",
    accounts: PRIVATE_KEY
  },
  hardhat: {},
  solidity: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  paths: {
    sources: "contracts",
    tests: "test",
    cache: "cache",
    artifacts: "artifacts",
  },
};
