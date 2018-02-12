import { Injectable } from '@angular/core';

import { WalletStorage } from 'app/main/wallets/services/wallet-storage';
import { IKeyPair, IWalletDetailsObject, ITransaction, IStoredWalletData } from 'app/main/wallets/services/wallet.interfaces';
import { WalletDataProvider } from '@app/main/wallets/services/wallet-data-provider';
import { StoredWallet } from '@app/main/wallets/stored-wallet';
import { WalletDetailsObject } from '@app/main/wallets/wallet-details';

@Injectable()
export class WalletManagerService {
  constructor(private walletStorage: WalletStorage,
              private walletDataProvider: WalletDataProvider) {
  }

  async generateNew(): Promise<IWalletDetailsObject> {
    const keyPair: IKeyPair = await this.walletDataProvider.generateWallet();

    return new WalletDetailsObject(
      'Generated wallet',
      keyPair.publicKey,
      keyPair.privateKey,
      0,
      []
    );
  }

  async store(wallets: IWalletDetailsObject[]): Promise<void> {
    const walletsToStore: IWalletDetailsObject[] = wallets.slice(1);
    const storageFormats: IStoredWalletData[] = walletsToStore.map(w => new StoredWallet(w.name, w.publicKey, w.privateKey));
    await this.walletStorage.set(storageFormats);
  }

  async getAll(): Promise<IWalletDetailsObject[]> {
    const genesisWallet: IWalletDetailsObject = await this.getGenesisWallet();
    const storedWallets: IWalletDetailsObject[] = await this.getStored();
    return [genesisWallet, ...storedWallets];
  }

  private async getGenesisWallet(): Promise<IWalletDetailsObject> {
    const keyPair: IKeyPair = await this.walletDataProvider.getGenesisWallet();
    const balance: number = await this.walletDataProvider.getBalance(keyPair);
    const transactions: ITransaction[] = await this.walletDataProvider.getTransactions(keyPair);

    return new WalletDetailsObject('Genesis wallet', keyPair.publicKey, keyPair.privateKey, balance, transactions);
  }

  private async getStored(): Promise<IWalletDetailsObject[]> {
    const storedWallets: IStoredWalletData[] = await this.walletStorage.get();
    const promises = storedWallets.map(async wallet => this.storedWalletToWalletDetailsObject(wallet));
    const detailedWallets: IWalletDetailsObject[] = await Promise.all(promises);

    return detailedWallets;
  }

  private async storedWalletToWalletDetailsObject(storedWallet: IStoredWalletData): Promise<IWalletDetailsObject> {
    const balance: number = await this.walletDataProvider.getBalance(storedWallet);
    const transactions: ITransaction[] = await this.walletDataProvider.getTransactions(storedWallet);

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
