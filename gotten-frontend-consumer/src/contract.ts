import { makeVar } from "@apollo/client";
import { Contract, ethers } from "ethers";
import {
  CHAIN_ID,
  CHAIN_NAME,
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  EXPLORER_URL,
  RPC_URL,
} from "./constants";

const contractVar = makeVar<Contract | null>(null);

export const initContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contractVar(new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
};

initContract();

export const getChainId = async () => {
  return await window.ethereum.request({ method: "eth_chainId" });
};

export const addNetwork = async () => {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        rpcUrls: [RPC_URL],
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: [EXPLORER_URL],
      },
    ],
  });
};

export async function onWalletConnect() {
  const chainId = await getChainId();
  if (chainId !== CHAIN_ID) {
    await changeNetwork().catch(async (error) => {
      await addNetwork();
      await changeNetwork();
    });
  }
  await initContract();
  updateTokenBalance();
}

async function changeNetwork() {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: CHAIN_ID }],
  });
}

initContract();
