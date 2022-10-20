import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupabaseClient } from "@supabase/supabase-js";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import { INoteItem, IWalletInfo } from "../../_types_";

import { getWalletInfo, logoutAction } from "./auth.actions";

export const DEFAULT_MES = "Something error!";

export interface AuthState {
  supabaseClient?: SupabaseClient;
  web3Modal?: Web3Modal;
  web3Provider?: ethers.providers.Web3Provider;
  info?: IWalletInfo;
  notes: INoteItem[];
  note?: INoteItem;
}

const initialState: AuthState = {
  notes: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setWeb3Modal: (state,{ payload }: PayloadAction<Web3Modal>) => {
      state.web3Modal = payload;
    },
    setProvider: (state, { payload }: PayloadAction<ethers.providers.Web3Provider>) => {
      state.web3Provider = payload;
    },
    setMyNotes: (state, { payload }: PayloadAction<INoteItem[]>) => {
      state.notes = payload;
    },
    selectedNote: (state,  { payload }: PayloadAction<INoteItem | undefined>  ) => {
      state.note = payload;
    },
    setSupabaseClient: (
      state,
      { payload }: PayloadAction<SupabaseClient | undefined>
    ) => {
      state.supabaseClient = payload;
    },
    onInsertNoteSuccess: (state, { payload }: PayloadAction<INoteItem>) => {
      const notes = [...state.notes];
      const index = notes.findIndex((p) => p.id === payload.id);
      if (index < 0) {
        notes.unshift(payload);
        state.notes = notes;
        state.note = payload;
      }
    },
    onUpdateNoteSuccess: (state, { payload }: PayloadAction<INoteItem>) => {
      const notes = [...state.notes];
      const index = notes.findIndex((p) => p.id === payload.id);
      if (index > -1) {
        notes[index] = payload;
        state.notes = notes;
      }
    },
    onDeleteNoteSuccess: (state, { payload }: PayloadAction<number>) => {
      const notes = [...state.notes];
      const index = notes.findIndex((p) => p.id === payload);
      if (index > -1) {
        notes.splice(index, 1);
        state.notes = notes;
        state.note = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWalletInfo.fulfilled, (state, { payload }) => {
      state.info = payload;
    });
    builder.addCase(logoutAction, (state) => {
      const {web3Modal } = state;
      web3Modal?.clearCachedProvider();
      state.info = undefined;
      state.web3Provider = undefined;
    });
  },

});

export const {
  setWeb3Modal,
  setProvider,
  setMyNotes,
  selectedNote,
  setSupabaseClient,
  onInsertNoteSuccess,
  onUpdateNoteSuccess,
  onDeleteNoteSuccess,
} = authSlice.actions;
export default authSlice.reducer;
