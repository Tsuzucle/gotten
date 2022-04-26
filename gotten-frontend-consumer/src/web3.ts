import { makeVar } from "@apollo/client";
import { ethers } from "ethers";
const ethereum = window.ethereum;
if (!ethereum) {
  window.alert("Please install to MetaMask.");
  throw Error("Please install to MetaMask.");
}

const accountVar = makeVar<string | null>(null);

const connectWeb3 = async () => {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  if (accounts.length !== 0) {
    accountVar(accounts[0]);
  }
};

// 初期化時も発火
connectWeb3();

ethereum.on("accountsChanged", async () => {
  connectWeb3();
});

export { accountVar, connectWeb3 };
