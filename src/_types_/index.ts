export interface IWalletInfo {
  bnbBalance: number;
  address: string;
}

export interface INoteItem {
  content: string;
  created_at: Date;
  id: number;
  isdeleted: boolean;
  title: string;
  updated_at?: Date;
  wallet_address: string;
}
