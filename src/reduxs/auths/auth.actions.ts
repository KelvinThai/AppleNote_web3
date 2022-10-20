import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { IWalletInfo } from "../../_types_";

export const logoutAction = createAction("auth/logoutAction");

export const getWalletInfo = createAsyncThunk<
  IWalletInfo,
  ethers.providers.Web3Provider
>("auth/getWalletInfo", async (provider) => {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const balance = await signer.getBalance();
  const bnb = Number.parseFloat(ethers.utils.formatEther(balance));
  return { address, bnbBalance: bnb };
});