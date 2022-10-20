declare var window: any;
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import store from "../reduxs/store";
import { getWalletInfo } from "../reduxs/auths/auth.actions";
import { setProvider, setWeb3Modal } from "../reduxs/auths/auth.reducers";
import WalletConnectProvider from "@walletconnect/web3-provider";

const BINANCE_TESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const walletConnectProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        97: BINANCE_TESTNET,
        56: "https://bsc-dataseed.binance.org/",
      },
    },
  },
};

export const connectToWallet = async () => {
  try {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: walletConnectProviderOptions,
    });
    const provider = await web3Modal.connect();  
    const web3Provider = new ethers.providers.Web3Provider(provider);
    store.dispatch(setProvider(web3Provider));
    store.dispatch(setWeb3Modal(web3Modal));  
    await store.dispatch(getWalletInfo(web3Provider));
  } catch(ex) {}
};

export const disconnectMetaMask = async () => {
  await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [{ eth_accounts: {} }],
  });
};
