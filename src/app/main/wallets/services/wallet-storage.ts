import { Injectable } from '@angular/core';
import { LocalStorageService } from 'app/core/index';
import { IStoredWalletData } from 'app/main/wallets/services/wallet.interfaces';

@Injectable()
export class WalletStorage {
  private WALLETS_STORAGE_KEY = 'storedWallets';

  constructor(private localStorage: LocalStorageService) {
  }

  public async set(wallets: IStoredWalletData[]): Promise<void> {
    this.localStorage.setItem(this.WALLETS_STORAGE_KEY, wallets);
  }

  public async get(): Promise<IStoredWalletData[]> {
    let result = this.localStorage.getItem(this.WALLETS_STORAGE_KEY);

    if (!result) {
      result = [];
    }

    return result;
  }
}
