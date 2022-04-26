import {ethers} from "hardhat";
import {GottenToken} from "../src/types";

async function main() {
  const GottenToken = await ethers.getContractFactory("GottenToken");

  const deployment = await GottenToken.deploy() as GottenToken;
  await deployment.deployed();
  console.log("Contract deployed to address:", deployment.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
