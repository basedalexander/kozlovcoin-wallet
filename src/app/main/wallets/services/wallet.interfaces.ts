export interface IWalletDetailsObject {
  name: string;
  publicKey: string;
  privateKey: string;
  balance: number;
  transactions: ITransaction[];
}

export interface IKeyPair {
  publicKey: string;
  privateKey: string;
}

export interface ITransaction {
  id: string;
  timeStamp: number;
  from: string;
  to: string;
  amount: number;
}

export interface IStoredWalletData {
  name: string;
  publicKey: string;
  privateKey: string;
}
