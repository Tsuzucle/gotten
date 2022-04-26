import { makeVar } from "@apollo/client";
const ethereum = window.ethereum;

const accountVar = makeVar<string | null>(null);

const connectWeb3 = async () => {
  if (typeof ethereum === "undefined") {
    if (window.confirm("Open in the MetaMask app?")) {
      openMetaMaskApp();
      return;
    }
  }

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

export function openMetaMaskApp() {
  const location = window.location;
  const url = `https://metamask.app.link/dapp/${location.hostname}${location.pathname}${location.search}`;
  location.href = url;
}

export { accountVar, connectWeb3 };
