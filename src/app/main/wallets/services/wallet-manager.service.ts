import { Injectable } from '@angular/core';
import { WalletStorage } from 'app/main/wallets/services/wallet-storage';
import { IKeyPair, IDetailedWallet, ITransaction } from 'app/main/wallets/services/wallet.interfaces';
import { WalletDataProvider } from '@app/main/wallets/services/wallet-data-provider';

@Injectable()
export class WalletManagerService {
  constructor(private walletStorage: WalletStorage,
              private walletDataProvider: WalletDataProvider) {
  }

  async generateNew(): Promise<IDetailedWallet> {
    const keyPair: IKeyPair = await this.walletDataProvider.generateWallet();

    return {
      name: 'New wallet',
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
      balance: 0,
      transactions: []
    }
  }

  async getAll(): Promise<IDetailedWallet[]> {
    const genesisWallet: IDetailedWallet = await this.getGenesis();
    return [genesisWallet];
  }

  private async getGenesis(): Promise<IDetailedWallet> {
    const genesisKeyPair: IKeyPair = await this.walletDataProvider.getGenesisWallet();
    const balance: number = await this.walletDataProvider.getBalance(genesisKeyPair);
    const transactions: ITransaction[] = await this.walletDataProvider.getTransactions(genesisKeyPair);

    return {
      name: 'Genesis wallet',
      publicKey: genesisKeyPair.publicKey,
      privateKey: genesisKeyPair.privateKey,
      balance,
      transactions
    }
  }
}
