window.account = null;

async function addNetwork() {
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
}

async function changeNetwork() {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: CHAIN_ID }],
  });
}

async function onWalletConnect() {
  $("#button-wallet-connect").hide();
  $("#info-wallet").show();
  $("#info-wallet").text(window.account.slice(0, 8) + "...");
  $("#container-main").show();

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

async function updateTokenBalance() {
  const balance = await window.contract.balanceOf(window.account);
  $("#input-token-balance").val(ethers.utils.formatEther(balance));
}

function onWalletDisconnect() {
  $("#button-wallet-connect").show();
  $("#info-wallet").hide();
  $("#container-main").hide();
}

function initWeb3() {
  if (typeof window.ethereum === "undefined") {
    if (window.confirm("Open in the MetaMask app?")) {
      openMetaMaskApp();
      return;
    }
    alert("MetaMask should be installed");
    return;
  }

  ethereum.on("accountsChanged", function (accounts) {
    window.account = accounts[0];
    if (window.account) {
      onWalletConnect();
    } else {
      onWalletDisconnect();
    }
  });

  if (ethereum.selectedAddress) {
    window.account = ethereum.selectedAddress;
    onWalletConnect();
  }
}

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    if (window.confirm("Open in the MetaMask app?")) {
      openMetaMaskApp();
      return;
    }
    alert("MetaMask should be installed");
    return;
  }

  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  window.account = accounts[0];

  if (account) {
    onWalletConnect();
  }
}

async function registerTreasure() {
  const name = $("#input-treasure-name").val();
  const lat = $("#input-treasure-lat").val();
  const lon = $("#input-treasure-lon").val();
  const value = $("#input-treasure-value").val();
  const password = $("#input-treasure-password").val();
  const random = $("#input-treasure-random").val();
  if (!name || !lat || !lon || !value || !password || !random) {
    alert("input all fields!");
    return;
  }

  const key = `${random}${password}`;
  const parsedValue = ethers.utils.parseEther(value);
  const hash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(key));
  console.log(hash);

  window.contract
    .registerTreasure(name, lat, lon, parsedValue, hash)
    .then((tx) => {
      console.log(tx);
      alert(`transaction sent: ${tx.hash}`);
    })
    .catch((e) => {
      console.log(e);
      alert(`error: ${e.message}`);
    });
}

async function gotcha() {
  const key = $("#input-gotcha-key").val();
  if (!key) {
    alert("input all fields!");
    return;
  }
  window.contract
    .gotcha(key)
    .then((tx) => {
      console.log(tx);
      alert(`transaction sent: ${tx.hash}`);
    })
    .catch((e) => {
      console.log(e);
      alert(`error: ${e.message}`);
    });
}

function openMetaMaskApp() {
  const url = `https://metamask.app.link/dapp/${location.hostname}${location.pathname}${location.search}`;
  location.href = url;
}

$(() => {
  initWeb3();

  const r = getUrlParam("r");
  const p = getUrlParam("p");
  if (r && p) {
    const key = `${r}${p}`;
    $("#input-gotcha-key").val(key);
  }

  $("#input-treasure-password").on("change", () => {
    const password = $("#input-treasure-password").val();
    const random = Math.random().toString(32).slice(-8);
    $("#input-treasure-random").val(random);
    const baseUrl = `${window.location}`.split("?")[0];
    const url = `${baseUrl}?r=${random}&p=${password}`;
    $("#input-treasure-url").val(encodeURI(url));
  });
});
