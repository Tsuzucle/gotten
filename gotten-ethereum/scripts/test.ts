import {GottenToken__factory} from "../src/types";
import {ethers} from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const contract = GottenToken__factory.connect(process.env.ADDRESS!, owner);
  const balance = await contract.balanceOf(owner.address);
  console.log(balance);
}

main().then(r => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
