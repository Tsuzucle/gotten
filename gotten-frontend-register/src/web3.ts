import Web3 from "web3";
import { makeVar } from "@apollo/client";

const ethereum = window.ethereum;
if (!ethereum) {
  window.alert("Please install to MetaMask.");
  throw Error("Please install to MetaMask.");
}

const web3Var = makeVar<Web3 | null>(null);
const accountVar = makeVar<string | null>(null);

const connectWeb3 = async () => {
  await ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(ethereum);
  const accounts = await web3.eth.getAccounts();
  if (accounts.length !== 0) {
    web3Var(web3);
    accountVar(accounts[0]);
  }
};

// 初期化時も発火
connectWeb3();

ethereum.on("accountsChanged", async () => {
  connectWeb3();
});

export { accountVar, web3Var, connectWeb3 };
