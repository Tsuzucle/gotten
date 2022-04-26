import { makeVar } from "@apollo/client";
import { Contract, ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants";
export type FormValues = {
  name: string;
  lat: string;
  lon: string;
  value: string;
  password: string;
};

const contractVar = makeVar<Contract | null>(null);

export const initContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contractVar(new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
};

initContract();

export const registerTreasure = async (formValues: FormValues) => {
  const { name, lat, lon, password, value } = formValues;
  const random = Math.floor(Math.random() * 1000000);
  const key = `${random}${password}`;
  const parsedValue = ethers.utils.parseEther(value);
  const hash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(key));
  const contract = contractVar()!;
  const transaction = await contract.registerTreasure(
    name,
    lat,
    lon,
    parsedValue,
    hash
  );
  const baseUrl = "https://gotten.netlify.app/";
  return `${baseUrl}?r=${random}&p=${password}`;
};
