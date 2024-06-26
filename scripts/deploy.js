// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// const { ethers } = require("ethers");


async function main() {
  const Library = await hre.ethers.getContractFactory("Library");
  const library = await Library.deploy();


  await library.waitForDeployment();

  console.log("contract deployed to: ", library.target);

  await library.addBook("1234", "sample book", 2016, "Sammy");
  console.log(
    await library.getBookData("1234")
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
