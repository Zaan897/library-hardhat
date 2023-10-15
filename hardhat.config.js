require("@nomicfoundation/hardhat-toolbox");
require('@nomicfoundation/hardhat-ethers');
// require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
// const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  mumbai_testnet: {
    url: "https://rpc-mumbai.maticvigil.com",
    accounts: ["0xBebcE9bd142FB21d191fACd1452CC0d4fD3dE7eB"]
  },
  hardhat: {
    url: "http://127.0.0.1:8545/",
    accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]
  },
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
