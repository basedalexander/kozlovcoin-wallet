import { Injectable } from '@angular/core';

import { WalletStorage } from 'app/main/wallets/services/wallet-storage';
import {
  IKeyPair,
  IWalletDetailsObject,
  ITransaction,
  IStoredWalletData
} from 'app/main/wallets/services/wallet.interfaces';
import { WalletApi } from '@app/main/wallets/services/wallet-data-provider';
import { StoredWallet } from '@app/main/wallets/stored-wallet';
import { WalletDetailsObject } from '@app/main/wallets/wallet-details';
import { TransactionSendDetails } from '@app/main/wallets/services/send-transaction-details';
import { ITransactionReport } from '@app/main/wallets/services/transaction-report';

@Injectable()
export class WalletManagerService {
  constructor(private walletStorage: WalletStorage,
              private walletApi: WalletApi) {
  }

  public async sendTransaction(transactionDetails: TransactionSendDetails): Promise<void> {
    await this.walletApi.sendTransaction(transactionDetails);
  }

  public async generateNew(): Promise<IWalletDetailsObject> {
    const keyPair: IKeyPair = await this.walletApi.generateWallet();

    return new WalletDetailsObject(
      'Generated wallet',
      keyPair.publicKey,
      keyPair.privateKey,
      0,
      []
    );
  }

  public async storeWallets(wallets: IWalletDetailsObject[]): Promise<void> {
    const walletsToStore: IWalletDetailsObject[] = wallets.slice(1);
    const storageFormats: IStoredWalletData[] = walletsToStore.map(w => new StoredWallet(w.name, w.publicKey, w.privateKey));
    await this.walletStorage.set(storageFormats);
  }

  public async getWallets(): Promise<IWalletDetailsObject[]> {
    const genesisWallet: IWalletDetailsObject = await this.getGenesisWallet();
    const storedWallets: IWalletDetailsObject[] = await this.getStored();
    return [genesisWallet, ...storedWallets];
  }

  public async getTransactionsForWallets(wallets: IWalletDetailsObject[]): Promise<ITransactionReport[]> {
    return await this.walletApi.getTransactionsForWallets(wallets);
  }

  private async getGenesisWallet(): Promise<IWalletDetailsObject> {
    const keyPair: IKeyPair = await this.walletApi.getGenesisWallet();
    const balance: number = await this.walletApi.getBalance(keyPair);
    const transactions: ITransaction[] = await this.walletApi.getTransactions(keyPair);

    return new WalletDetailsObject('Genesis wallet', keyPair.publicKey, keyPair.privateKey, balance, transactions);
  }

  private async getStored(): Promise<IWalletDetailsObject[]> {
    const storedWallets: IStoredWalletData[] = await this.walletStorage.get();
    const promises = storedWallets.map(async wallet => this.storedWalletToWalletDetailsObject(wallet));
    const detailedWallets: IWalletDetailsObject[] = await Promise.all(promises);

    return detailedWallets;
  }

  private async storedWalletToWalletDetailsObject(storedWallet: IStoredWalletData): Promise<IWalletDetailsObject> {
    const balance: number = await this.walletApi.getBalance(storedWallet);
    const transactions: ITransaction[] = await this.walletApi.getTransactions(storedWallet);

    return new WalletDetailsObject(
      storedWallet.name,
      storedWallet.publicKey,
      storedWallet.privateKey,
      balance,
      transactions
    );
  }

  private convertDetailedWalletsToStored(wallets: IWalletDetailsObject[]): IStoredWalletData[] {
    return wallets.map(w => new StoredWallet(w.name, w.publicKey, w.privateKey));
  }
}
