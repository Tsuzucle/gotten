import {HardhatUserConfig} from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: process.env.INFURA_API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 1e9,
    },
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
}

export default config;
